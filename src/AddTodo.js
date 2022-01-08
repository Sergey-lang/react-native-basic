import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue('');
    } else {
      Alert.alert('Field can\'t be empty');
    }
  };

  return (
    <View style={styles.block}>
      <TextInput style={styles.input}
                 placeholder="Write your todo..."
                 onChangeText={setValue}
                 value={value}
                 autoCorrect={false}
                 autoCapitalize="none"
      />
      <Button style={styles.bottom} title="Add" onPress={pressHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    width: '70%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab',
  },
  bottom: {}
});
