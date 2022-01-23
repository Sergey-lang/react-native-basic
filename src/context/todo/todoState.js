import React, { useContext, useReducer } from 'react';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO
} from '../types';
import { ScreenContext } from '../screen/screenContext';
import { Alert } from 'react-native';
import { Http } from '../../http';

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async (title) => {
    clearError();
    try {
      const data = await Http.post('https://rn-todo-ee4da-default-rtdb.firebaseio.com/todos.json', { title });
      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (e) {
      showError('Something went wrong...');
    }
  };

  const removeTodo = (id) => {
    const todo = state.todos.find((el) => el.id === id);

    Alert.alert(
      'Deleting',
      `Are you sure? ${todo.title} will delete.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            changeScreen(null);
            clearError();
            try {
              await Http.delete(`https://rn-todo-ee4da-default-rtdb.firebaseio.com/todos/${id}.json`, { id });
              dispatch({ type: REMOVE_TODO, id });
            } catch (e) {
              showError('Something went wrong...');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get('https://rn-todo-ee4da-default-rtdb.firebaseio.com/todos.json');
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError('Something went wrong...');
      console.log(e);
    } finally {
      hideLoader();
    }
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await fetch(`https://rn-todo-ee4da-default-rtdb.firebaseio.com/todos/${id}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (e) {
      showError('Something went wrong...');
      console.log(e);
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return <TodoContext.Provider value={{
    todos: state.todos,
    loading: state.loading,
    error: state.error,
    addTodo,
    removeTodo,
    updateTodo,
    fetchTodos,
  }}>
    {children}
  </TodoContext.Provider>;
};
