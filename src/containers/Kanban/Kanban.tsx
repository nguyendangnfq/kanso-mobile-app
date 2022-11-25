import React, { useEffect } from 'react';
import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Button } from '../../components';
import KanbanCard from '../../components/KanbanCard';
import { fetchAllBoard } from '../../store/board/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const Kanban = (props: any) => {
  const { route, navigation } = props;
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
    <ScrollView>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate('Task')}>
          {boardData.length !== 0 &&
            boardData.map(item => {
              if (!item.is_completed) {
                return <KanbanCard key={item?.id_job} item={item} />;
              }
            })}
        </Pressable>
        <Button mode="contained">New</Button>
      </View>
    </ScrollView>
  );
};

export default Kanban;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
});
