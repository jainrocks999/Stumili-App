import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import {Image} from 'react-native';

const Social = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
      }}>
      <TouchableOpacity style={styles.btn}>
        <Image
          source={require('../../../assets/fa-brands-google-plus-g.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Image source={require('../../../assets/corebrands-apple.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default Social;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#fff',
    height: hp(10),
    width: hp(10),
    borderRadius: wp(2),
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
