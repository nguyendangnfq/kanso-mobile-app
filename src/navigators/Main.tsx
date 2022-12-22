import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, UserSetting } from '../containers';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 15,
        },
        tabBarIconStyle: { display: 'none' },
      }}
    >
      <Tab.Screen name={'Home'} component={Home} />
      <Tab.Screen name={'User Setting'} component={UserSetting} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
