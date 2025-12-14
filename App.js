import React from 'react';
import RootNavigator from './src/navigation/index';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <RootNavigator />
      <Toast />
</>
);
}