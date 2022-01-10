import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, View, Keyboard } from 'react-native';
import { THEME } from '../theme';
import { AntDesign } from '@expo/vector-icons';

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue('');
      Keyboard.dismiss();
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
      <AntDesign.Button onPress={pressHandler} name="pluscircleo">Add</AntDesign.Button>
      {/*<Button style={styles.bottom} title="Add" onPress={pressHandler} />*/}
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
    width: '60%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  },
  bottom: {}
});
