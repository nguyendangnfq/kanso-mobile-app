import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { PokeLoader, TaskCard } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTask } from '../../store/task/taskSlice';

const InProgress = (props: any) => {
  const { route, navigation } = props;
  const dispatch = useAppDispatch();
  const columns = useAppSelector(state => state.task.listTask);
  const loading = useAppSelector(state => state.task.loading);

  const data = route.params;

  const idBoard = data.id_job;

  // useEffect(() => {
  //   dispatch(fetchTask({ jobowner: idBoard }));
  // }, []);

  return (
    <>
      {!loading ? (
        <ScrollView style={styles.outer}>
          {columns.map((column: any) =>
            column?.eachColumnTask?.map((task: any, index: any) => {
              if (column.id_column === 1) {
                return (
                  <View style={styles.container}>
                    <TaskCard
                      keyColumn={column.id_column}
                      task={task}
                      key={task.id}
                      index={index}
                      columnId={column.id_column}
                    />
                  </View>
                );
              }
            }),
          )}
        </ScrollView>
      ) : (
        <PokeLoader />
      )}
    </>
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
    justifyContent: 'space-between',
  },
});
