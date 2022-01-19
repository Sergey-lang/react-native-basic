import React from 'react';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types';

const handlers = {
  [ADD_TODO]: (state, {title}) => ({ ...state, todos: [...state.todos, { id: Date.now(), title }] }),
  [REMOVE_TODO]: (state, {id}) => ({ ...state, todos: state.todos.filter((t) => t.id !== id) }),
  [UPDATE_TODO]: (state, {id, title}) => ({
    ...state,
    todos: state.todos.map((t) => {
      if (t.id === id) {t.title = title;}
      return t;
    })
  }),
  DEFAULT: state => state
}

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
};
