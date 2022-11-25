import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View } from 'react-native';
import CompletedKanban from './CompletedKanban';
import Kanban from './Kanban';

const Tab = createMaterialTopTabNavigator();

type Props = {
  route: any;
};

const Board = (props: Props) => {
  const { route } = props;

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen
          name="In Progress"
          component={Kanban}
          initialParams={route.params}
        />
        <Tab.Screen
          name="Completed"
          component={CompletedKanban}
          initialParams={route.params}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Board;
