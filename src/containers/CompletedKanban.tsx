import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { fetchAllBoard } from '../store/board/boardSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

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
    <View>
      <Text>CompletedKanban</Text>
    </View>
  );
};

export default CompletedKanban;
