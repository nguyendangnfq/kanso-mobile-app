import 'react-native-gesture-handler';
import React from 'react';
import ApplicationNavigator from './navigators/Application';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './store';
import './translations';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ApplicationNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
}
