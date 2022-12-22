import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { FAB, Modal, Portal, Provider, Snackbar } from 'react-native-paper';
import { AddTaskForm, EditTaskForm, TaskCard } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  createTask,
  deleteTask,
  editTask,
  fetchTask,
} from '../../store/task/taskSlice';
import PokeLoader from '../../components/PokeLoader';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

const Backlogs = (props: any) => {
  const { route, navigation } = props;

  const [visible, setVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false);
  const [idTask, setIdTask] = useState('');
  const [idEditTask, setIdEditTask] = useState('');
  const [editData, setEditData] = useState({});
  const [columnId, setColumnId] = useState(null);

  const columns = useAppSelector(state => state.task.listTask);
  const loading = useAppSelector(state => state.task.loading);
  const taskInfo = useAppSelector(state => state.task.jobInfo);
  const token = useAppSelector(state => state.login.token);
  const vice_token = useAppSelector(state => state.register.token);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const data = route.params.item;
  const kanbanData = route.params.data;

  const idBoard = data.id_job;

  const showModal = () => {
    setVisible(true);
  };
  const showEditModal = () => {
    setEditFormVisible(true);
  };
  const hideModal = () => setVisible(false);
  const hideEditModal = () => setEditFormVisible(false);

  const onDismissSnackBar = () => setSnackVisible(false);
  const onToggleSnackBar = (value: any) => {
    setSnackVisible(!snackVisible);
    setIdTask(value);
  };

  const onToggleEditModal = (value: any, idOfColumn: any) => {
    showEditModal();
    setColumnId(idOfColumn);
    setIdEditTask(value);
    columns.map((column: any) =>
      column.eachColumnTask.map((task: any) => {
        if (column.id_column !== 0) {
          return;
        } else {
          setEditData(task);
        }
      }),
    );
  };

  const handleEditTask = (value: any) => {
    const editedValue = {
      columnId: columnId,
      idBoard: idBoard,
      editTask: {
        ...value,
        start_time: moment(value.start_time).format('YYYY-MM-DD'),
        end_time: moment(value.end_time).format('YYYY-MM-DD'),
        taskId: idEditTask,
      },
    };
    console.log(editedValue);

    dispatch(editTask(editedValue));
    hideEditModal();
  };

  useEffect(() => {
    dispatch(fetchTask({ jobowner: idBoard }));
  }, []);

  useEffect(() => {
    if (isFocused === true) {
      dispatch(fetchTask({ jobowner: idBoard }));
    }
  }, [isFocused]);

  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 10 };

  const handleCreateTask = (value: any) => {
    let tempTasker = value.taskers.map((item: any) => {
      return {
        name: item,
      };
    });
    const newValue = {
      ...value,
      idBoard: idBoard,
      progress: 0,
      owner: token || vice_token,
      projectowner: kanbanData.idProject,
      taskers: tempTasker,
    };
    dispatch(createTask(newValue));
    setVisible(false);
  };

  const handleDeleteTask = (value: any) => {
    const deleteValue = {
      taskId: value,
      jobowner: idBoard,
    };
    console.log(deleteValue);
    dispatch(deleteTask(deleteValue));
  };

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.outer}>
        {!loading ? (
          <View style={styles.container}>
            {columns.map((column: any) =>
              column?.eachColumnTask?.map((task: any, index: any) => {
                if (column.id_column === 0) {
                  return (
                    <>
                      <Portal>
                        <Modal
                          visible={visible}
                          dismissable={true}
                          onDismiss={hideModal}
                          contentContainerStyle={containerStyle}
                        >
                          <AddTaskForm
                            startDate={taskInfo.start_time}
                            endDate={taskInfo.end_time}
                            task={task}
                            onSubmit={handleCreateTask}
                          />
                        </Modal>
                        <Modal
                          visible={editFormVisible}
                          dismissable={true}
                          onDismiss={hideEditModal}
                          contentContainerStyle={containerStyle}
                        >
                          <EditTaskForm
                            task={editData}
                            onSubmit={handleEditTask}
                            startDate={taskInfo.start_time}
                            endDate={taskInfo.end_time}
                          />
                        </Modal>
                      </Portal>
                      <Pressable
                        onPress={() =>
                          navigation.navigate('Detail Task', {
                            task,
                            idBoard,
                            kanbanData,
                          })
                        }
                      >
                        <TaskCard
                          onToggleEditModal={onToggleEditModal}
                          onToggleSnackBar={onToggleSnackBar}
                          keyColumn={column.id_column}
                          task={task}
                          key={task.id}
                          index={index}
                          columnId={column.id_column}
                        />
                      </Pressable>
                    </>
                  );
                } else {
                  return (
                    <View style={styles.noDataContainer}>
                      <Portal>
                        <Modal
                          visible={visible}
                          dismissable={true}
                          onDismiss={hideModal}
                          contentContainerStyle={containerStyle}
                        >
                          <AddTaskForm
                            startDate={taskInfo.start_time}
                            endDate={taskInfo.end_time}
                            task={task}
                            onSubmit={handleCreateTask}
                          />
                        </Modal>
                      </Portal>
                    </View>
                  );
                }
              }),
            )}
            <FAB
              icon={require('../../assets/plus.png')}
              style={styles.fab}
              onPress={showModal}
            />
          </View>
        ) : (
          <PokeLoader />
        )}
        <Snackbar
          visible={snackVisible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Sure',
            onPress: () => {
              handleDeleteTask(idTask);
            },
          }}
        >
          Are you sure to delete this board ?
        </Snackbar>
      </ScrollView>
    </Provider>
  );
};

export default Backlogs;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
