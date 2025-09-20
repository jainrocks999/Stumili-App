import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Loader = ({loading}) =>
  loading ? (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="black" />
    </View>
  ) : null;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default Loader;
