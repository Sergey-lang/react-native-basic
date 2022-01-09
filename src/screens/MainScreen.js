import React from 'react';
import { FlatList, StyleSheet, View, Image } from 'react-native';
import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';

export const MainScreen = ({ addTodo, removeTodo, todos, openTodo }) => {
  let content = (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      data={todos}
      renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />}
    />
  );

  if (todos.length === 0) {
    content = (
      <View style={styles.imageWrap}>
        <Image style={styles.image} source={require('../../assets/no-results.png')} />
        {/*<Image style={styles.image} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOSuWCBiKo9T78FuDnobpleO_TKyE0Kdxf5g&usqp=CAU'}} />*/}
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }
});

