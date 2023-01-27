import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {song} from './data';
import Label from './component/Label';

const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const playBackState = usePlaybackState();
  const progress = useProgress();

  useEffect(() => {
    setupPlayer();
  }, []);

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();

      await TrackPlayer.add([song, song]);
    } catch (error) {
      console.log(error);
    }
  };

  const togglePlayBack = async playBackState => {
    if (playBackState === State.Buffering) {
      await TrackPlayer.pause();
    }
    if (playBackState == State.Paused || playBackState == State.Ready) {
      console.log(playBackState == State.Paused);
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };
  console.log(playBackState);
  return (
    <SafeAreaView style={style.container}>
      <View style={style.mainContainer}>
        <View>
          <Text style={[style.songContent, style.songTitle]}>{song.title}</Text>
          <Text style={[style.songContent, style.songArtist]}>
            {song.artist}
          </Text>
        </View>

        <View>
          <Slider
            style={style.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#fff"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />
          <Label position={progress.position} duration={progress.duration} />
        </View>

        <View style={style.musicControlsContainer}>
          <TouchableOpacity onPress={() => TrackPlayer.seekTo(-10)}>
            <Ionicons name="play-skip-back-outline" size={35} color="#FFD369" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
            <Ionicons
              name={
                playBackState === State.Playing
                  ? 'ios-pause-circle'
                  : 'ios-play-circle'
              }
              size={75}
              color="#FFD369"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => TrackPlayer.seekTo(10)}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#FFD369"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },

  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },

  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '60%',
  },
});
