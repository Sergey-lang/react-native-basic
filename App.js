import { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { MainLayout } from './src/MainLayout';
import { TodoState } from './src/context/todo/todoState';

const mock = [
  { id: '1', title: 'My first todo' },
  { id: '2', title: 'My second todo' },
];

async function loadApp() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading startAsync={loadApp}
                  onError={(err) => console.log(err)}
                  onFinish={() => setIsReady(true)}
      />
    );
  }

  return (
    <TodoState>
      <MainLayout />
    </TodoState>
  );
}
