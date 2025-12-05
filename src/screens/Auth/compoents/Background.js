import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';

const Background = ({children}) => {
  return (
    <View style={styles.container}>
      <View style={styles.round1}>
        <View style={styles.round2}></View>
      </View>
      <View style={[styles.round1, styles.roundSecond]}></View>
      <View style={{flex: 1, zIndex: 5}}>{children}</View>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },
  round1: {
    height: hp(40),
    width: hp(40),
    backgroundColor: 'rgba(60, 60, 60,0.5)',
    borderRadius: hp(20),
    position: 'absolute',
    right: wp(-26),
    top: hp(-15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  round2: {
    height: hp(33),
    width: hp(33),
    backgroundColor: 'rgba(180, 180, 180, 0.1)',
    borderRadius: hp(17.5),
    position: 'absolute',
  },
  roundSecond: {
    position: 'absolute',
    left: wp(-55),
    top: hp(30),
    backgroundColor: 'rgba(100, 100, 100, 0.1)',
  },
});
