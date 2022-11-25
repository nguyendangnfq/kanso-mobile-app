import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './utils';
import MainNavigator from './Main';
import { Login, Register, Task } from '../containers';
import { ProjectForm } from '../components';
import BoardNavigation from './Board.Navigation';
import { NativeBaseProvider } from 'native-base';

const Stack = createStackNavigator();

const ApplicationNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <StatusBar />
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                animationEnabled: false,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                animationEnabled: false,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Main"
              component={MainNavigator}
              options={{
                animationEnabled: false,
                headerShown: false,
              }}
            />
            <Stack.Screen name="ProjectForm" component={ProjectForm} />
            <Stack.Screen
              name="BoardNavigator"
              component={BoardNavigation}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Task" component={Task} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
