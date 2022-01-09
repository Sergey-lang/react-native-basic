import { Alert, StyleSheet, View } from 'react-native';
import { Navbar } from './src/components/Navbar';
import { useState } from 'react';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

const mock = [
  { id: '1', title: 'My first todo' },
  { id: '2', title: 'My second todo' },
];

export default function App() {
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([]);
  // Actions
  const addTodo = (title) => setTodos((prev) => [...prev, { id: Date.now().toString(), title }]);
  const removeTodo = (id) => {
    const todo = todos.find((el) => el.id === id);

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
          onPress: () => {
            setTodoId(null); // go back
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
          },
        },
      ],
      { cancelable: false }
    );
  };
  const updateTodo = (id, title) => {
    setTodos((prev) => prev.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    }));
  };

  const goBack = () => setTodoId(null);

  let content = (
    <MainScreen addTodo={addTodo}
                todos={todos}
                removeTodo={removeTodo}
                openTodo={setTodoId}
    />
  );

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

  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>
        {content}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
});
