import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from './ui/AppText';

export const Todo = ({ todo, onRemove, onOpen }) => {
  return (
    <TouchableOpacity onPress={() => onOpen(todo.id)} onLongPress={onRemove.bind(null, todo.id)}>
      <View style={styles.todo}>
        <AppText>{todo.title}</AppText>
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
