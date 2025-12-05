import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Background from './compoents/Background';
import Intro from './compoents/Intro';
import Input from './compoents/Input';
import Buttun from './compoents/Buttun';
import Line from './compoents/Line';
import Social from './compoents/Social';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import {fonts} from '../../Context/Conctants';

const Forgot = () => {
  return (
    <Background>
      <Intro
        title1="Forget your"
        title2="Your Password"
        title3="Well send you a verification code to your email"
        style={{
          height: hp(42),
        }}
      />
      <View style={{alignItems: 'center'}}>
        <Input
          placeholder="Your Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={email => setEmail(email)}
        />
        <View style={{marginTop: '15%'}} />
        <Buttun title="Reset Password" />
      </View>
      <Line />
      <View style={{alignItems: 'center', marginTop: '10%'}}>
        <Social />
      </View>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: '5%',
          color: 'white',
          fontFamily: fonts.medium,
        }}>
        Don't have an account ?{' '}
        <Text
          onPress={() => {
            navigation.navigate('signup');
          }}
          style={{
            color: '#B72658',
            fontSize: wp(5),
            fontWeight: '500',
            fontFamily: fonts.medium,
          }}>
          {' Sign Up'}
        </Text>
      </Text>
    </Background>
  );
};

export default Forgot;
