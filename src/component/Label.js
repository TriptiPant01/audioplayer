import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function Label({position = 0, duration = 0}) {
  return (
    <View style={style.progressLevelDuraiton}>
      <Text style={style.progressLabelText}>{position.toFixed(0)}</Text>
      <Text style={style.progressLabelText}>Total Duration: {duration}</Text>
      <Text style={style.progressLabelText}>
        {(duration - position).toFixed(0)}
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  progressLevelDuraiton: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
  },
});
