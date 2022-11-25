import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Pressable, Modal } from 'react-native';
import {
  Button,
  DropDownCustom,
  PokeLoader,
  TextInput,
  ProjectCard,
} from '../components';
import PokeCard from '../components/PokeCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllPokemon, PokemonState } from '../store/pokemon/pokemonSlice';
import { createProject } from '../store/project/projectSlice';
import { listUserInfo } from '../store/user/userSettingSlice';

const Home = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const token = useAppSelector(state => state.login.token);
  const vice_token = useAppSelector(state => state.register.token);
  const loading = useAppSelector(state => state.userSetting.loading);
  const profile = useAppSelector(state => state?.userSetting);

  useEffect(() => {
    // dispatch(fetchAllPokemon());
    dispatch(listUserInfo(token || vice_token));
  }, []);

  const handleBoardPage = (value: any) => {
    navigation.navigate('BoardNavigator', value);
  };

  const renderItem = React.useCallback(({ item }: any) => {
    return (
      <Pressable onPress={() => handleBoardPage(item)}>
        {/* <PokeCard name={item.name} /> */}
        <ProjectCard item={item} />
      </Pressable>
    );
  }, []);

  return (
    <View style={styles.container}>
      {loading && <PokeLoader />}
      {/* {!loading && allPokemonData.length !== 0 && (
        <FlatList
          data={allPokemonData}
          renderItem={renderItem}
          initialNumToRender={0}
          keyExtractor={(item: PokemonState) => item.name}
        />
      )} */}

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

  formView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
