import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import KanbanCard from '../../components/KanbanCard';
import { fetchAllBoard } from '../../store/board/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const CompletedKanban = (props: any) => {
  const { route } = props;
  const data = route.params;

  const dispatch = useAppDispatch();

  const token = useAppSelector(state => state.login.token);
  const vice_token = useAppSelector(state => state.register.token);
  const boardData = useAppSelector(state => state.board.listJobs);

  useEffect(() => {
    dispatch(
      fetchAllBoard({
        projectowner: data?.idProject,
        owner: token || vice_token,
      }),
    );
  }, []);

  return (
    <View style={styles.container}>
      {boardData.length !== 0 &&
        boardData.map(item => {
          if (item.is_completed) {
            return <KanbanCard key={item?.id_job} item={item} />;
          }
        })}
    </View>
  );
};

export default CompletedKanban;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
