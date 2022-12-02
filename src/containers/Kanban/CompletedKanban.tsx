import { Alert } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Pressable, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import KanbanCard from '../../components/KanbanCard';
import { deleteBoard, fetchAllBoard } from '../../store/board/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PokeLoader from './../../components/PokeLoader';

const CompletedKanban = (props: any) => {
  const [snackvisible, setSnackVisible] = React.useState(false);
  const [idJob, setIdJob] = React.useState('');

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

  const onDismissSnackBar = () => setSnackVisible(false);

  const onToggleSnackBar = (value: any) => {
    setSnackVisible(!snackvisible);
    setIdJob(value);
  };

  const handleDeleteKanban = (value: any) => {
    const deleteValue = {
      owner: token || vice_token,
      projectowner: data?.idProject,
      kanban_id: value,
    };
    dispatch(deleteBoard(deleteValue));
    setSnackVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.outer}>
      {!loading ? (
        <View style={styles.container}>
          {boardData.length !== 0 &&
            boardData.map(item => {
              if (item.is_completed) {
                return (
                  <Pressable
                    onPress={() => navigation.navigate('Task', { item, data })}
                  >
                    <KanbanCard
                      key={item?.id_job}
                      item={item}
                      onToggleSnackBar={onToggleSnackBar}
                    />
                  </Pressable>
                );
              }
            })}
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
            handleDeleteKanban(idJob);
          },
        }}
      >
        Are you sure to delete this board ?
      </Snackbar>
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
