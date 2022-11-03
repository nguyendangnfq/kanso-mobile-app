import React, { useState } from 'react';
import { View, Image, Text, FlatList, StyleSheet } from 'react-native';
import { instance } from '../services/api';

type DetailProps = {
  name: string;
  picture: string;
  types: Array<any>;
  description: string;
};

const Detail: React.FC<DetailProps> = (props: any) => {
  const [value, setvalue] = useState({});
  const { route } = props;
  const data = route.params;

  console.log(value);

  React.useEffect(() => {
    const fetchByID = async () => {
      const url = `/pokemon/${data.name}`;
      const res = await instance.get(url);
      setvalue(res.data);
    };
    fetchByID();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.mainDetails}>
      <Text style={styles.mainText}>{data.name.toUpperCase()}</Text>
      <Image
        source={{ uri: value?.sprites?.other.home.front_default }}
        style={styles.image}
        resizeMode="contain"
      />

      {/* <FlatList
        columnWrapperStyle={styles.types}
        data={types}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles[item.name], styles.type]}>
            <Text style={styles.typeText}>{item.name}</Text>
          </View>
        )}
      /> */}

      {/* <View style={styles.description}>
        <Text>{description}</Text>
      </View> */}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  mainDetails: {
    padding: 30,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
  mainText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    marginTop: 20,
  },
  types: {
    flexDirection: 'row',
    marginTop: 20,
  },
  type: {
    padding: 5,
    width: 100,
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
