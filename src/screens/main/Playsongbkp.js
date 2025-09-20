import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Song from '../../components/Home/component_song';

const Playsong = () => {
  const {affirmations} = useSelector(state => state.home);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Song itemss={affirmations} />
    </View>
  );
};

export default Playsong;

const styles = StyleSheet.create({});
