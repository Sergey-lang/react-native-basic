import React, { useState } from 'react';
import { Alert, Button, Modal, StyleSheet, TextInput, View } from 'react-native';
import { THEME } from '../theme';

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert('Error', `Min length 3 symbols. Now ${title.trim().length} symbols.`);
    } else {
      onSave(title);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.wrap}>
        <TextInput style={styles.input}
                   value={title}
                   onChangeText={setTitle}
                   placeholder="Write name..."
                   autoCapitalize="none"
                   autoCorrect={false}
                   maxLength={64}
        />
        <View style={styles.buttons}>
          <Button title="Cancel"
                  onPress={onCancel}
                  color={THEME.DANGER_COLOR} />
          <Button title="Save"
                  onPress={saveHandler} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%',
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
