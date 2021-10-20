import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/Home';
import { theme } from './src/Styles';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="inverted" translucent animated networkActivityIndicatorVisible backgroundColor={theme.backgroundColor} />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
