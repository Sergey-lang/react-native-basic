import React, { useContext, useState } from 'react';
import { Navbar } from './components/Navbar';
import { StyleSheet, View } from 'react-native';
import { THEME } from './theme';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { TodoContext } from './context/todo/todoContext';

export const MainLayout = () => {
  const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext);
  const [todoId, setTodoId] = useState(null);

  let content = (
    <MainScreen addTodo={addTodo}
                todos={todos}
                removeTodo={removeTodo}
                openTodo={setTodoId}
    />
  );

  const goBack = () => setTodoId(null);

  if (todoId) {
    const selectedTodo = todos.find((todo) => todo.id === todoId);
    content = (
      <TodoScreen goBack={goBack}
                  onRemove={removeTodo}
                  onSave={updateTodo}
                  todo={selectedTodo}
      />
    );
  }

  return <View>
    <Navbar title="Todo App" />
    <View style={styles.container}>
      {content}
    </View>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 30,
  },
});
