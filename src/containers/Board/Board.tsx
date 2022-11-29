import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import CompletedKanban from '../Kanban/CompletedKanban';
import Kanban from '../Kanban/Kanban';

const Tab = createMaterialTopTabNavigator();

type Props = {
  route: any;
};

const Board = (props: Props) => {
  const { route } = props;

  return (
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
  );
};

export default Board;
