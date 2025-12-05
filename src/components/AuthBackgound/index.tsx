import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GYM_BG from '@assets/images/Auth/Auth1.jpg';
import { Dimensions } from '@constants';

const AuthBackground = () => {
  return (
    <View style={styles.root}>
      <Image source={GYM_BG} style={styles.hero} resizeMode="contain" />

      <View style={styles.shadowWrapper}>
        <LinearGradient
          colors={['#FFFFFF00', '#FFFFFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.bottomGradient}
        />
      </View>
      <LinearGradient
        colors={['#FFFFFF00', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          height: '40%',
          width: '100%',
          top: '10%',
          borderWidth: 0,
          position: 'absolute',
        }}
      />
      <LinearGradient
        colors={['#FFFFFF00', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          height: '40%',
          width: '100%',
          top: '10%',
          borderWidth: 0,
          position: 'absolute',
        }}
      />
      <LinearGradient
        colors={['#FFFFFF00', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          height: '40%',
          width: '100%',
          top: '10%',
          borderWidth: 0,
          position: 'absolute',
        }}
      />
    </View>
  );
};

export default AuthBackground;

const styles = StyleSheet.create({
  root: {
    position:'absolute',
     height:Dimensions.height,
     width:Dimensions.width,
    backgroundColor: '#FFF',
    
  },
  hero: {
    width: '60%',
    height: '44%',
    // marginTop: 20,
    alignSelf: 'flex-end',
    transform: [{ scale: 3 }],
  },

  /** Bottom fade: covers only the lower ~60% of screen */
  bottomFade: {
    position: 'absolute',
    height: '60%',
    borderWidth: 1,
    borderColor: 'red',
  },

  /** Corner fade: limited to bottom-right box so left side stays clean */
  cornerFade: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '45%', // <- how wide the corner fade reaches
    height: '32%', // <- how tall the corner fade reaches
  },

  shadowWrapper: {
    position: 'absolute',
    top: '10%',
    height: '40%',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12, // Android shadow
  },
  bottomGradient: {
    flex: 1,
  },
});
