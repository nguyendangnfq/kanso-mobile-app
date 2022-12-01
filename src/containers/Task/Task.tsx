import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Backlogs from './Backlogs';
import InProgress from './InProgress';
import InReview from './InReview';
import Completed from './Completed';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTask } from '../../store/task/taskSlice';

const Tab = createMaterialTopTabNavigator();

type Props = {
  route: any;
};

const Task = (props: Props) => {
  const { route } = props;

  const data = route.params;

  const dispatch = useAppDispatch();
  const columns = useAppSelector(state => state.task.listTask);

  const idTask = data.id_job;

  useEffect(() => {
    dispatch(
      fetchTask({
        jobowner: idTask,
      }),
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen
          name="Backlogs"
          component={Backlogs}
          initialParams={route.params}
        />
        <Tab.Screen
          name="Doing"
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
