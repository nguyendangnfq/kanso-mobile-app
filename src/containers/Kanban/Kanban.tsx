import React, { useEffect } from 'react';
import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import {
  FAB,
  Modal,
  Portal,
  Provider,
  Snackbar,
  Text,
} from 'react-native-paper';
import { AddKanbanForm, EditKanbanForm } from '../../components';
import KanbanCard from '../../components/KanbanCard';
import {
  createBoard,
  deleteBoard,
  editBoard,
  fetchAllBoard,
} from '../../store/board/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PokeLoader from './../../components/PokeLoader';

const Kanban = (props: any) => {
  const { route, navigation } = props;
  const [visible, setVisible] = React.useState(false);
  const [editKanbanVisible, setEditKanbanVisible] = React.useState(false);
  const [snackvisible, setSnackVisible] = React.useState(false);
  const [idJob, setIdJob] = React.useState('');
  const [idJobEdit, setIdJobEdit] = React.useState('');
  const [editData, setEditData] = React.useState('');

  const data = route.params;

  const dispatch = useAppDispatch();

  const token = useAppSelector(state => state.login.token);
  const vice_token = useAppSelector(state => state.register.token);
  const boardData = useAppSelector(state => state.board.listJobs);
  const member = useAppSelector(state => state.board.membersInProject);
  const loading = useAppSelector(state => state.board.loading);

  useEffect(() => {
    dispatch(
      fetchAllBoard({
        projectowner: data?.idProject,
        owner: token || vice_token,
      }),
    );
  }, []);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showEditModal = () => setEditKanbanVisible(true);
  const hideEditModal = () => setEditKanbanVisible(false);

  const onToggleSnackBar = (value: any) => {
    setSnackVisible(!snackvisible);
    setIdJob(value);
  };
  const onDismissSnackBar = () => setSnackVisible(false);

  const onToggleEditModal = (value: any) => {
    showEditModal();
    setIdJobEdit(value);
    const newData = boardData.find(item => item.id_job === value);
    setEditData(newData);
  };

  const handleCreateKanban = (value: any) => {
    const createValue = {
      ...value,
      projectowner: data?.idProject,
      owner: token || vice_token,
    };
    dispatch(createBoard(createValue));
    setVisible(false);
  };

  const handleEditKanban = (value: any) => {
    const editedValue = {
      ...value,
      kanban_id: idJobEdit,
      members: member.map(item => item.name),
      owner: token || vice_token,
      projectowner: data?.idProject,
    };
    dispatch(editBoard(editedValue));
    setEditKanbanVisible(false);
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
          <AddKanbanForm
            onSubmit={handleCreateKanban}
            member={member}
            boardData={boardData}
          />
        </Modal>
        <Modal
          visible={editKanbanVisible}
          dismissable={true}
          onDismiss={hideEditModal}
          contentContainerStyle={containerStyle}
        >
          <EditKanbanForm
            onSubmit={handleEditKanban}
            data={editData}
            boardData={boardData}
          />
        </Modal>
      </Portal>
      <ScrollView contentContainerStyle={styles.outer}>
        {!loading ? (
          <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate('Task')}>
              {boardData.length !== 0 &&
                boardData.map(item => {
                  if (!item.is_completed) {
                    return (
                      <KanbanCard
                        onToggleEditModal={onToggleEditModal}
                        key={item?.id_job}
                        item={item}
                        onToggleSnackBar={onToggleSnackBar}
                      />
                    );
                  }
                })}
            </Pressable>
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
    </Provider>
  );
};

export default Kanban;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
