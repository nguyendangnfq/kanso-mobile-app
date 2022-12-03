import { Avatar } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import * as Progress from 'react-native-progress';
import { automaticallyUpdateColumn } from '../store/task/taskSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import moment from 'moment';

type TaskCardProps = {
  task: any;
  key: any;
  index: any;
  columnId: any;
  keyColumn: any;
  onToggleSnackBar: (value: any) => void;
  onToggleEditModal: (value: any, idOfColumn: any) => void;
};

const TaskCard = (props: TaskCardProps) => {
  const { task, index, columnId, onToggleSnackBar, onToggleEditModal } = props;

  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.task.loading);

  useEffect(() => {
    if (!loading) {
      dispatch(automaticallyUpdateColumn({ columnId, task, index }));
    }
  }, [loading]);

  return (
    <>
      <View style={[styles[task.priority], styles.container]}>
        <View style={styles.action}>
          <Text style={[styles.titleText, styles.text]}>{task?.title}</Text>
          <View style={styles.progress}>
            <Pressable onPress={() => onToggleEditModal(task?.id, columnId)}>
              <Image
                source={require('../assets/edit.png')}
                tintColor="white"
                style={styles.imageEdit}
              />
            </Pressable>
            <Pressable onPress={() => onToggleSnackBar(task?.id)}>
              <Image
                source={require('../assets/delete.png')}
                tintColor="white"
                style={styles.imageDelete}
              />
            </Pressable>
          </View>
        </View>
        <View>
          <Text style={[styles.descriptionText, styles.text]}>
            {task?.description}
          </Text>
        </View>

        <View style={{ padding: 10 }}>
          <Avatar.Group
            _avatar={{
              size: '10',
            }}
            max={3}
          >
            {task?.taskers?.map((val: any) => (
              <Avatar
                key={val.avatar}
                bg="cyan.500"
                source={{ uri: val.avatar }}
              />
            ))}
          </Avatar.Group>
        </View>

        <View style={styles.status}>
          <Text style={[styles.priorityText, styles.text]}>
            {task?.priority}
          </Text>

          <Text style={[styles.dateText, styles.text]}>
            {moment().isBetween(moment(task.start_time), moment(task.end_time))
              ? 'Due in ' +
                moment(moment(task.end_time).format('YYYY-MM-DD')).toNow(true)
              : 'Start after ' +
                moment(moment(task.start_time).format('YYYY-MM-DD')).toNow(
                  true,
                )}
          </Text>
        </View>

        <Progress.Bar
          style={styles.progressBar}
          progress={task?.progress / 100}
          width={330}
          color={
            task?.progress <= 30
              ? 'red'
              : task?.progress <= 50
              ? 'orange'
              : task?.progress <= 70
              ? 'yellow'
              : task?.progress <= 90
              ? 'dodgerblue'
              : 'lawngreen'
          }
          borderWidth={0}
          animated={true}
          unfilledColor={'#ccc'}
        />
      </View>
    </>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    color: '#fff',
  },
  titleText: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  action: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  progress: {
    flexDirection: 'row',
  },
  progressBar: {
    marginBottom: 5,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  priorityText: {
    marginBottom: 8,
    fontSize: 16,
  },
  dateText: {
    marginBottom: 8,
    fontSize: 16,
  },
  progressStatus: {
    fontSize: 13,
    color: 'lightgray',
  },
  imageEdit: {
    width: 25,
    height: 25,
  },
  imageDelete: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  High: {
    backgroundColor: '#c34048',
  },
  Medium: {
    backgroundColor: '#f8d030',
  },
  Low: {
    backgroundColor: '#78c850',
  },
});
