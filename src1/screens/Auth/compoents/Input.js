import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import { fonts } from '../../../Context/Conctants';

const Input = ({ ...props }) => {
  return (
    <View style={styles.input}>
      <TextInput
        {...props}
        placeholderTextColor={'grey'}
        style={{
          fontSize: wp(5),
          fontFamily: fonts.medium,
          color: '#fff',
          height: '100%',
          width: '95%',
          alignSelf: 'flex-end',
        }}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: '88%',
    height: hp(6.5),
    borderColor: '#fff',
    borderRadius: wp(1),
    // paddingLeft: '5%',
    marginTop: '8%',
  },
});
