import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import { DropDownCustom, PokeLoader } from '../components';
import PokeCard from '../components/PokeCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllPokemon, PokemonState } from '../store/pokemon/pokemonSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { listUserInfo } from '../store/user/userSettingSlice';

const Home = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const allPokemonData = useAppSelector(state => state.pokemon.allPokeState);

  const token = useAppSelector(state => state.login.token);
  const loading = useAppSelector(state => state.userSetting.loading);
  const profile = useAppSelector(state => state?.userSetting);
  console.log(profile);

  const handleDetailPage = (value: any) => {
    navigation.navigate('Detail', value);
  };

  useEffect(() => {
    dispatch(fetchAllPokemon());
    dispatch(listUserInfo(token));
  }, []);

  const renderItem = React.useCallback(({ item }: any) => {
    return (
      <Pressable onPress={() => handleDetailPage(item)}>
        <PokeCard name={item.name} />
      </Pressable>
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* <DropDownCustom /> */}
      {loading && <PokeLoader />}
      {!loading && allPokemonData.length !== 0 && (
        <FlatList
          data={allPokemonData}
          renderItem={renderItem}
          initialNumToRender={0}
          keyExtractor={(item: PokemonState) => item.name}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
