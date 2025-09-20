import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../../../components/atoms/responsive';
import {fonts} from '../../../Context/Conctants';

const Line = () => {
  return (
    <View style={styles.orcontainer}>
      <View style={styles.line}></View>
      <Text
        style={{
          color: 'white',
          fontSize: wp(5),
          fontWeight: '800',
          marginTop: '-1.2%',
          fontFamily: fonts.regular,
        }}>
        or
      </Text>
      <View style={styles.line}></View>
    </View>
  );
};

export default Line;
const styles = StyleSheet.create({
  orcontainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '88%',
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    borderWidth: 1,
    borderWidth: 0.5,
    width: '45%',
    borderColor: '#fff',
  },
});
