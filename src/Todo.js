import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const Todo = ({ todo, onRemove }) => {
  const removeTodo = () => onRemove(todo.id);

  return (
    <TouchableOpacity onPress={() => {
    }} onLongPress={removeTodo}>
      <View style={styles.todo}>
        <Text style={styles.text}>{todo.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffc600',
    fontSize: 24
  },
});
