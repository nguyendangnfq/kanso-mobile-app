import React, { useState } from 'react';
import { Image, View, Text, FlatList, StyleSheet } from 'react-native';
import { instance } from '../services/api';

type PokeCardProps = {
  name?: string;
};

const PokeCard: React.FC<PokeCardProps> = props => {
  const [data, setData] = useState({});
  const { name } = props;

  React.useEffect(() => {
    if (name) {
      const fetchByID = async () => {
        const url = `/pokemon/${name}`;
        const res = await instance.get(url);
        setData(res.data);
      };
      fetchByID();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.textId}>{data.id}</Text>
      <Image
        source={{ uri: data?.sprites?.other.home.front_default }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.mainText}>{name}</Text>

      <FlatList
        columnWrapperStyle={styles.types}
        data={data?.types}
        numColumns={2}
        keyExtractor={item => item?.slot.toString()}
        renderItem={({ item }) => (
          <View style={[styles[item.type.name], styles.type]}>
            <Text style={styles.typeText}>{item.type.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default PokeCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 10,
    marginBottom: 10,
  },
  textId: {
    fontSize: 24,
    position: 'absolute',
    top: 10,
    left: 20,
  },
  image: {
    width: '100%',
    height: 120,
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    marginTop: 20,
  },
  types: {
    flexDirection: 'row',
    marginTop: 15,
  },
  type: {
    padding: 2,
    width: 60,
    alignItems: 'center',
  },
  typeText: {
    color: '#fff',
  },
  normal: {
    backgroundColor: '#8a8a59',
  },
  fire: {
    backgroundColor: '#f08030',
  },
  water: {
    backgroundColor: '#6890f0',
  },
  electric: {
    backgroundColor: '#f8d030',
  },
  grass: {
    backgroundColor: '#78c850',
  },
  ice: {
    backgroundColor: '#98d8d8',
  },
  fighting: {
    backgroundColor: '#c03028',
  },
  poison: {
    backgroundColor: '#a040a0',
  },
  ground: {
    backgroundColor: '#e0c068',
  },
  flying: {
    backgroundColor: '#a890f0',
  },
  psychic: {
    backgroundColor: '#f85888',
  },
  bug: {
    backgroundColor: '#a8b820',
  },
  rock: {
    backgroundColor: '#b8a038',
  },
  ghost: {
    backgroundColor: '#705898',
  },
  dragon: {
    backgroundColor: '#7038f8',
  },
  dark: {
    backgroundColor: '#705848',
  },
  steel: {
    backgroundColor: '#b8b8d0',
  },
  fairy: {
    backgroundColor: '#e898e8',
  },
});
