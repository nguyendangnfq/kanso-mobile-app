import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import { Snackbar, Provider, Portal, Modal } from 'react-native-paper';
import { EditTaskForm, PokeLoader, TaskCard } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteTask, editTask, fetchTask } from '../../store/task/taskSlice';

const InProgress = (props: any) => {
  const { route, navigation } = props;

  const [snackvisible, setSnackVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [idTask, setIdTask] = useState('');
  const [idEditTask, setIdEditTask] = useState('');
  const [editData, setEditData] = useState({});
  const [columnId, setColumnId] = useState(null);
  const dispatch = useAppDispatch();
  const columns = useAppSelector(state => state.task.listTask);
  const loading = useAppSelector(state => state.task.loading);
  const taskInfo = useAppSelector(state => state.task.jobInfo);
  const isFocused = useIsFocused();

  const data = route.params.item;
  const kanbanData = route.params.data;

  const idBoard = data.id_job;

  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 10 };

  useEffect(() => {
    if (isFocused === true) {
      dispatch(fetchTask({ jobowner: idBoard }));
    }
  }, [isFocused]);

  const showEditModal = () => setEditFormVisible(true);
  const hideEditModal = () => setEditFormVisible(false);

  const onToggleEditModal = (value: any, idOfColumn: any) => {
    showEditModal();
    setColumnId(idOfColumn);
    setIdEditTask(value);
    columns.map((column: any) =>
      column.eachColumnTask.map((task: any) => {
        if (column.id_column !== 1) {
          return;
        } else {
          setEditData(task);
        }
      }),
    );
  };

  const onDismissSnackBar = () => setSnackVisible(false);
  const onToggleSnackBar = (value: any) => {
    setSnackVisible(!snackvisible);
    setIdTask(value);
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

  const handleDeleteTask = (value: any) => {
    const deleteValue = {
      taskId: value,
      jobowner: idBoard,
    };
    dispatch(deleteTask(deleteValue));
  };

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.outer}>
        {!loading ? (
          <View style={styles.container}>
            {columns.map((column: any) =>
              column?.eachColumnTask?.map((task: any, index: any) => {
                if (column.id_column === 1) {
                  return (
                    <>
                      <Portal>
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
                  return null;
                }
              }),
            )}
          </View>
        ) : (
          <PokeLoader />
        )}
        <Snackbar
          visible={snackvisible}
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

export default InProgress;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  container: {
    padding: 20,
    flex: 1,
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
