import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Button } from '../components';
import { Board, BoardSetting } from '../containers';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const BoardNavigation = (props: any) => {
  const { route } = props;
  const data = route.params;
  const navigation = useNavigation();
  return (
    <>
      <Drawer.Navigator initialRouteName="Board">
        <Drawer.Screen name="Board" component={Board} initialParams={data} />
        <Drawer.Screen name="Setting" component={BoardSetting} />
      </Drawer.Navigator>
      {/* <Button mode="outlined" onPress={() => navigation.goBack()}>
        Back
      </Button> */}
    </>
  );
};

export default BoardNavigation;
