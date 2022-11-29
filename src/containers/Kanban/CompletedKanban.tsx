import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import KanbanCard from '../../components/KanbanCard';
import { fetchAllBoard } from '../../store/board/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PokeLoader from './../../components/PokeLoader';

const CompletedKanban = (props: any) => {
  const { route, navigation } = props;
  const data = route.params;

  const dispatch = useAppDispatch();

  const token = useAppSelector(state => state.login.token);
  const vice_token = useAppSelector(state => state.register.token);
  const boardData = useAppSelector(state => state.board.listJobs);
  const loading = useAppSelector(state => state.board.loading);

  useEffect(() => {
    dispatch(
      fetchAllBoard({
        projectowner: data?.idProject,
        owner: token || vice_token,
      }),
    );
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.outer}>
      {!loading ? (
        <Pressable
          style={styles.container}
          onPress={() => navigation.navigate('Task')}
        >
          {boardData.length !== 0 &&
            boardData.map(item => {
              if (item.is_completed) {
                return <KanbanCard key={item?.id_job} item={item} />;
              }
            })}
        </Pressable>
      ) : (
        <PokeLoader />
      )}
    </ScrollView>
  );
};

export default CompletedKanban;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
});
