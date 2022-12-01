import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import { Button, PokeLoader, ProjectCard } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { listUserInfo } from '../store/user/userSettingSlice';

const Home = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const token = useAppSelector(state => state.login.token);
  const vice_token = useAppSelector(state => state.register.token);
  const loading = useAppSelector(state => state.userSetting.loading);
  const profile = useAppSelector(state => state?.userSetting);

  useEffect(() => {
    dispatch(listUserInfo(token || vice_token));
  }, []);

  const handleBoardPage = (value: any) => {
    navigation.navigate('BoardNavigator', value);
  };

  const renderItem = React.useCallback(({ item }: any) => {
    return (
      <Pressable onPress={() => handleBoardPage(item)}>
        <ProjectCard item={item} />
      </Pressable>
    );
  }, []);

  return (
    <View style={styles.container}>
      {loading && <PokeLoader />}

      {!loading && profile?.projects?.length !== 0 && (
        <>
          <FlatList
            data={profile?.projects}
            renderItem={renderItem}
            initialNumToRender={0}
            keyExtractor={(item: any) => item?.idProject}
          />
          <Button
            mode="contained"
            onPress={() => navigation.navigate('ProjectForm')}
          >
            New Project
          </Button>
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
