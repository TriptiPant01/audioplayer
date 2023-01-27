import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MusicPlayer from './src/MusicPlayer';

export default function App() {
  return (
    <View style={styles.container}>
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
