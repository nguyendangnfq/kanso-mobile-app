import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View } from 'react-native';
import Backlogs from './Backlogs';
import InProgress from './InProgress';
import InReview from './InReview';
import Completed from './Completed';

const Tab = createMaterialTopTabNavigator();

type Props = {
  route: any;
};

const Task = (props: Props) => {
  const { route } = props;

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen
          name="Backlogs"
          component={Backlogs}
          initialParams={route.params}
        />
        <Tab.Screen
          name="Inprogress"
          component={InProgress}
          initialParams={route.params}
        />
        <Tab.Screen
          name="In Review"
          component={InReview}
          initialParams={route.params}
        />
        <Tab.Screen
          name="Done"
          component={Completed}
          initialParams={route.params}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Task;
