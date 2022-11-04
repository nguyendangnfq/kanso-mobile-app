import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../containers';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator>
      <Tab.Screen name={t('home')} component={Home} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
