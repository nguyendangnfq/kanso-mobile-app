import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Board, BoardSetting } from '../containers';
import { useAppSelector } from '../store/hooks';

const Drawer = createDrawerNavigator();

const BoardNavigation = (props: any) => {
  const { route } = props;
  const data = route.params;

  const role = useAppSelector(state => state.project.role);

  return (
    <>
      <Drawer.Navigator initialRouteName="Board">
        <Drawer.Screen
          name="Board"
          component={Board}
          initialParams={data}
          key={data.id}
        />
        {(role === 'Project Manager' || role === 'Leader') && [
          <Drawer.Screen
            name="Project Setting"
            component={BoardSetting}
            initialParams={data}
            key={data.id}
          />,
        ]}
      </Drawer.Navigator>
    </>
  );
};

export default BoardNavigation;
