import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';
import { THEME } from '../theme';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';
import { AppLoader } from '../components/AppLoader';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';

export const MainScreen = () => {
  const [devWidth, setDevWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);

  const { addTodo, removeTodo, todos, fetchTodos, loading, error } = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
      setDevWidth(width);
    };
    Dimensions.addEventListener('change', update);

    return () => {
      Dimensions.removeEventListener('change', update);
    };
  });

  let content = (
    <View style={{ devWidth }}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={todos}
        renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />}
      />
    </View>
  );

  if (loading) return <AppLoader />;
  if (error) return <View style={styles.center}>
    <AppText style={styles.error}>{error}</AppText>
    <AppButton onPress={loadTodos}>Try again</AppButton>
  </View>;

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
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
  }
});

