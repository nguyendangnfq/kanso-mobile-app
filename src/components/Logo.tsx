import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Logo() {
  return (
    <View style={styles.logo}>
      <Text style={styles.logoText}>Kanso</Text>
    </View>
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
});
