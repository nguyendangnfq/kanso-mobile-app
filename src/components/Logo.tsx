import React from 'react';
import { StyleSheet, Image } from 'react-native';

type LogoProps = {
  title: string;
};

export default function Logo(props: LogoProps) {
  const { title } = props;
  return (
    <>
      {title ? (
        <Image source={{ uri: title }} style={styles.image} />
      ) : (
        <Image source={require('../assets/avatar.jpg')} style={styles.image} />
      )}
    </>
    // <View style={styles.logo}>
    //   <Text style={styles.logoText}>{title}</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },

  logoText: {
    fontSize: 32,
    color: 'black',
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
});
