import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const Todo = ({ todo, onRemove, onOpen }) => {
  return (
    <TouchableOpacity onPress={() => onOpen(todo.id)} onLongPress={onRemove.bind(null, todo.id)}>
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
