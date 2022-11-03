import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import { PokeLoader } from '../components';
import PokeCard from '../components/PokeCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllPokemon } from '../store/pokemon/pokemonSlice';

const Home = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const allPokemonData = useAppSelector(state => state.pokemon.allPokeState);

  const loading = useAppSelector(state => state.pokemon.originalState.loading);

  const handleDetailPage = (value: any) => {
    console.log(value);
    navigation.navigate('Detail', value);
  };

  const renderItem = React.useCallback(({ item }: any) => {
    return (
      <Pressable onPress={() => handleDetailPage(item)}>
        <PokeCard name={item.name} />
      </Pressable>
    );
  }, []);

  useEffect(() => {
    dispatch(fetchAllPokemon());
  }, []);

  return (
    <View style={styles.container}>
      {loading && <PokeLoader />}
      {!loading && allPokemonData.length !== 0 && (
        <FlatList
          data={allPokemonData}
          renderItem={renderItem}
          initialNumToRender={0}
          keyExtractor={item => item.name}
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