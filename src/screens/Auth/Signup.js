// import React, {useState} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {
//   heightPercent as hp,
//   widthPrecent as wp,
// } from '../../components/atoms/responsive';
// import {useNavigation} from '@react-navigation/native';
// import Background from './compoents/Background';
// import Intro from './compoents/Intro';
// import Input from './compoents/Input';
// import Buttun from './compoents/Buttun';
// import Line from './compoents/Line';
// import Social from './compoents/Social';
// import {fonts} from '../../Context/Conctants';

// const Signup = () => {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();

//   return (
//     <Background>
//       <Intro
//         title1="Empower"
//         title2="Yourself Now"
//         title3="Let's get you Signed Up"
//         style={{
//           height: hp(30),
//         }}
//       />
//       <View style={{alignItems: 'center'}}>
//         <Input
//           placeholder="Enter your name "
//           keyboardType="email-address"
//           underlineColorAndroid="transparent"
//           onChangeText={email => setEmail({email})}
//         />
//         <Input
//           placeholder="Your Email"
//           underlineColorAndroid="transparent"
//           onChangeText={password => setPassword({password})}
//         />
//         <Input
//           placeholder="Password"
//           secureTextEntry={true}
//           underlineColorAndroid="transparent"
//           onChangeText={password => setPassword({password})}
//         />
//         <Buttun title="Sing Up" />
//       </View>
//       <Line />
//       <View style={{alignItems: 'center', marginTop: '7%'}}>
//         <Social />
//       </View>
//       <Text
//         style={{
//           alignSelf: 'center',
//           marginTop: '5%',
//           color: 'white',
//           fontFamily: fonts.medium,
//         }}>
//         Already have an account ?{' '}
//         <Text
//           onPress={() => {
//             navigation.navigate('login');
//           }}
//           style={{
//             fontFamily: fonts.medium,
//             color: '#B72658',
//             fontSize: wp(5),
//             fontWeight: '500',
//           }}>
//           {' Sign In'}
//         </Text>
//       </Text>
//     </Background>
//   );
// };

// export default Signup;
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Background from './compoents/Background';
import Intro from './compoents/Intro';
import Input from './compoents/Input';
import Buttun from './compoents/Buttun';
import Line from './compoents/Line';
import Social from './compoents/Social';
import { fonts } from '../../Context/Conctants';
import Toast from 'react-native-simple-toast';
import storage from '../../utils/StorageService';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      Toast.show('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      Toast.show('Passwords do not match');
      return;
    }

    let data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('password_confirmation', confirmPassword); 

    let config = {
      method: 'post',
      url: 'https://stimuli.forebearpro.co.in/api/v1/registration',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(async (response) => {
        console.log('Response:', response.data);
        if (response.data?.status) {
          Toast.show('Signup Successful! Please login.');
          navigation.navigate('login');
        } else {
          Toast.show(response.data?.message || 'Signup failed');
        }
      })
      .catch((error) => {
        console.log('Signup Error:', error?.response?.data || error);
        if (error.response?.data?.errors) {
          Toast.show(error.response.data.errors.join('\n')); 
        } else {
          Toast.show('Signup error! Please try again.');
        }
      });
  };


  return (
    <Background>
      <Intro title1="Empower" title2="Yourself Now" title3="Let's get you Signed Up" />
      <View style={{ alignItems: 'center' }}>
        <Input
          placeholder="Enter your name"
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Your Email"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Confirm Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={text => setConfirmPassword(text)} 
        />
        <Buttun title="Sign Up" onPress={handleSignup} />
      </View>
      <Line />
      <View style={{ alignItems: 'center', marginTop: '7%' }}>
        <Social />
      </View>
      <Text style={{ alignSelf: 'center', marginTop: '5%', color: 'white', fontFamily: fonts.medium }}>
        Already have an account?{' '}
        <Text onPress={() => navigation.navigate('login')} style={{ color: '#B72658', fontSize: 16, fontWeight: '500' }}>
          Sign In
        </Text>
      </Text>
    </Background>
  );
};

export default Signup;
