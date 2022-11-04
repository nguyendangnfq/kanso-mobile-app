import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
} from 'react-native';
import { instance } from '../services/api';
import * as Progress from 'react-native-progress';

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

  const imageSrc = require('../assets/bg.png');

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
    <ImageBackground style={styles.mainDetails} source={imageSrc}>
      <Text style={styles.mainText}>{data.name.toUpperCase()}</Text>

      <Image
        source={{ uri: value?.sprites?.other.home.front_default }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.stats}>
        <Text style={styles.statText}>Base Stats</Text>

        <FlatList
          columnWrapperStyle={styles.types}
          data={value.stats}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 5 }}>
              <View style={styles.skills}>
                <Text style={styles.skillTitleText}>
                  {item?.stat.name.toUpperCase()}
                </Text>
              </View>
              <View>
                <Progress.Bar progress={item.base_stat / 100} width={200} />
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default Detail;

const styles = StyleSheet.create({
  mainDetails: {
    padding: 30,
    alignItems: 'center',
    flex: 1,
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
  stats: {
    marginTop: 20,
    justifyContent: 'center',
  },
  statText: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 24,
    marginBottom: 20,
  },
  skills: {
    width: '100%',
    // alignItems: 'flex-start',
  },
  skillTitleText: {
    color: '#c03028',
    fontSize: 13,
    marginBottom: 5,
  },
  description: {
    marginTop: 20,
  },
  types: {
    flexDirection: 'column',
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
