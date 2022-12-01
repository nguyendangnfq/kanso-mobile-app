import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { FAB, Provider, Text, Portal, Modal } from 'react-native-paper';
import { AddTaskForm, TaskCard } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTask } from '../../store/task/taskSlice';
import PokeLoader from '../../components/PokeLoader';

const Backlogs = (props: any) => {
  const { route, navigation } = props;

  const [visible, setVisible] = useState(false);

  const columns = useAppSelector(state => state.task.listTask);
  const loading = useAppSelector(state => state.task.loading);
  const dispatch = useAppDispatch();

  const data = route.params;

  const idBoard = data.id_job;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    dispatch(fetchTask({ jobowner: idBoard }));
  }, []);

  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 10 };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          dismissable={true}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <AddTaskForm />
        </Modal>
      </Portal>
      <ScrollView contentContainerStyle={styles.outer}>
        {!loading ? (
          <View style={styles.container}>
            {columns.map((column: any) =>
              column?.eachColumnTask?.map((task: any, index: any) => {
                if (column.id_column === 0) {
                  return (
                    <Pressable
                      onPress={() => navigation.navigate('Detail Task', task)}
                    >
                      <TaskCard
                        keyColumn={column.id_column}
                        task={task}
                        key={task.id}
                        index={index}
                        columnId={column.id_column}
                      />
                    </Pressable>
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
    padding: 20,
    justifyContent: 'space-between',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
