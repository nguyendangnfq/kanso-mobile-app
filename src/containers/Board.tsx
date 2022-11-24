import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { fetchAllBoard } from '../store/board/boardSlice';
import { useAppDispatch, useAppSelector } from './../store/hooks';

type Props = {
  route: any;
};

const Board = (props: Props) => {
  const { route } = props;
  const token = useAppSelector(state => state.login.token);
  const vice_token = useAppSelector(state => state.register.token);
  const boardData = useAppSelector(state => state.board.listJobs);
  const data = route.params;
  //   console.log('projectowner', data.idProject);
  //   console.log('owner', token);
  console.log(boardData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchAllBoard({
        projectowner: data.idProject,
        owner: token || vice_token,
      }),
    );
  }, []);

  return (
    <View>
      <Text>Board</Text>
    </View>
  );
};

export default Board;
