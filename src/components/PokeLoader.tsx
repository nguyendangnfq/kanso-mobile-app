import React from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

const PokeLoader = () => {
  return (
    <View style={styles.wrapper}>
      {/*<Image*/}
      {/*  source={{*/}
      {/*    uri: 'https://img1.picmix.com/output/stamp/normal/0/9/0/4/1604090_a14a5.gif',*/}
      {/*  }}*/}
      {/*  style={styles.img}*/}
      {/*/>*/}
      <ActivityIndicator size="large" color="#0064e1" />
    </View>
  );
};

export default PokeLoader;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    height: 300,
    width: '100%',
  },
});
