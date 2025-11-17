// import React, { useState } from 'react';
// import { View, Text, Alert, SafeAreaView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import {
//   heightPercent as hp,
//   widthPrecent as wp,
// } from '../../components/atoms/responsive';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader from '../../components/Loader';
// import Background from './compoents/Background';
// import Intro from './compoents/Intro';
// import Input from './compoents/Input';
// import Buttun from './compoents/Buttun';
// import Line from './compoents/Line';
// import Social from './compoents/Social';
// import { fonts } from '../../Context/Conctants';
// import Toast from 'react-native-simple-toast';
// import { ScrollView } from 'react-native-gesture-handler';
// import storage from '../../utils/StorageService';
// const Login = () => {
//   const loading = useSelector(state => state.auth.loading);
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   function validateEmail(email) {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   }
//   // const getToken = () => {
//   //   if (email == '') {
//   //     Toast.show('Please enter email');
//   //     return;
//   //   }
//   //   if (!validateEmail(email)) {
//   //     Toast.show('Email is invalid');
//   //     return;
//   //   }
//   //   if (password == '') {
//   //     Toast.show('Please Enter password');
//   //     return;
//   //   }
//   //   dispatch({
//   //     type: 'auth/login_request',
//   //     payload: {
//   //       email,
//   //       password,
//   //       url: 'login',
//   //     },
//   //     navigation,
//   //   });
//   // };
//   const login = () => {
//        if (email == '') {
//       Toast.show('Please enter email');
//       return;
//     }
//     if (!validateEmail(email)) {
//       Toast.show('Email is invalid');
//       return;
//     }
//     if (password == '') {
//       Toast.show('Please Enter password');
//       return;
//     }
//     const FormData = require('form-data');
//     let data = new FormData();
//     data.append('email', 'bhupendrarajput70.forbear@gmail.com');
//     data.append('password', '12345678');
//     data.append('fcm_token', 'eaNTcT6oTAqFaZFYH0Gnez:APA91bGCaILXCtWA4RKocVDU6Oq7GwgrWpz7ENckRc5UqTYM3ThoRAKiMEmPb7pxGCayRU8mhYA4jELDmbA2toK_iDgw-0McmXUuez7y1UtRU95tvmwuBHKwK1rxKfSzv7-r5DfcYfCL');
//     let config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'https://stimuli.craftsweb.co.in/api/v1/login',
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'Accept': 'application/json'
//       },
//       data: data
//     };
//     axios.request(config)
//       .then(async (response) => {
//         const id = response.data?.data?.id
//         const token = response.data?.data?.token
//         await storage.setItem(storage.USER_ID, id)
//         await storage.setItem(storage.TOKEN, token)
//         navigation.replace('Welecome2');
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   return (
//     <Background>
//       <Loader loading={loading} />
//       <SafeAreaView style={{ flex: 1 }}>
//         <ScrollView>
//           <Intro
//             title1="Welcome"
//             title2="To STIMULI"
//             title3="Let's Sign In here"
//           />
//           <View style={{ alignItems: 'center' }}>
//             <Input
//               placeholder="Email"
//               keyboardType="email-address"
//               underlineColorAndroid="transparent"
//               onChangeText={email => setEmail(email)}
//             />
//             <Input
//               placeholder="Password"
//               secureTextEntry={true}
//               underlineColorAndroid="transparent"
//               onChangeText={password => setPassword(password)}
//             />
//             <Text
//               onPress={() => {
//                 navigation.navigate('Forgot');
//               }}
//               style={{
//                 color: '#fff',
//                 alignSelf: 'flex-end',
//                 marginRight: '6%',
//                 marginTop: '3%',
//                 fontFamily: 'OpenSans_Condensed-Regular',
//                 fontSize: wp(5),
//               }}>
//               Forgot Your password ?
//             </Text>
//             <Buttun
//               onPress={() => {
//                 // getToken();
//                 login()
//               }}
//               title="Sign In"
//             />
//           </View>
//           <Line />
//           <View style={{ alignItems: 'center', marginTop: '7%' }}>
//             <Social />
//           </View>
//           <Text
//             style={{
//               alignSelf: 'center',
//               marginTop: '5%',
//               color: 'white',
//               fontFamily: fonts.medium,
//             }}>
//             Don't have an account ?{' '}
//             <Text
//               onPress={() => {
//                 navigation.navigate('signup');
//               }}
//               style={{
//                 color: '#B72658',
//                 fontSize: wp(5),
//                 fontWeight: '500',
//                 fontFamily: fonts.medium,
//               }}>
//               {' Sign Up'}
//             </Text>
//           </Text>
//         </ScrollView>
//       </SafeAreaView>
//     </Background>
//   );
// };
// export default Login;


import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loader from '../../components/Loader';
import Background from './compoents/Background';
import Intro from './compoents/Intro';
import Input from './compoents/Input';
import Buttun from './compoents/Buttun';
import Line from './compoents/Line';
import Social from './compoents/Social';
import { fonts } from '../../Context/Conctants';
import Toast from 'react-native-simple-toast';
import storage from '../../utils/StorageService';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const STATIC_FCM_TOKEN = 'eaNTcT6oTAqFaZFYH0Gnez:APA91bGCaILXCtWA4RKocVDU6Oq7GwgrWpz7ENckRc5UqTYM3ThoRAKiMEmPb7pxGCayRU8mhYA4jELDmbA2toK_iDgw-0McmXUuez7y1UtRU95tvmwuBHKwK1rxKfSzv7-r5DfcYfCL';

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!email) {
      Toast.show('Please enter email');
      return;
    }
    if (!validateEmail(email)) {
      Toast.show('Email is invalid');
      return;
    }
    if (!password) {
      Toast.show('Please enter password');
      return;
    }
    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('fcm_token', STATIC_FCM_TOKEN);
    console.log('FormData Debugging:');
    console.log(formData); 
    const debugData = {
      email: email,
      password: password,
      fcm_token: STATIC_FCM_TOKEN,
    };
    console.log('Debug Object:', debugData);
    try {
      const response = await axios.post(
        'https://stimuli.craftsweb.co.in/api/v1/login',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
        }
      );
    

      const userData = response?.data?.data;
    
      if (userData?.id && userData?.token) {
        const userId = userData.id;
        const token = userData.token;
    
        console.log('User ID:', userId);
        console.log('Token:', token);
    
        await storage.setItem(storage.USER_ID, userId.toString());
        await storage.setItem(storage.TOKEN, token);
    
        console.log('Stored User ID:', await storage.getItem(storage.USER_ID));
        console.log('Stored Token:', await storage.getItem(storage.TOKEN));
    
        Toast.show('Login successful!');
        console.log('Navigating to Welcome2 screen');
        navigation.replace('Welecome2');
      } else {
        console.log('Login Failed: Missing ID or Token');
        Toast.show('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error?.response?.data || error);
      Toast.show(error?.response?.data?.message || 'Something went wrong!');
    }
    
};
  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Intro title1="Welcome" title2="To STIMULI" title3="Let's Sign In here" />
          <View style={{ alignItems: 'center' }}>
            <Input placeholder="Email" keyboardType="email-address" onChangeText={setEmail} />
            <Input placeholder="Password" secureTextEntry onChangeText={setPassword} />
            <Text
              onPress={() => navigation.navigate('Forgot')}
              style={{ color: '#fff', alignSelf: 'flex-end', marginRight: '6%', marginTop: '3%', fontSize: 16 }}>
              Forgot Your Password?
            </Text>
            <Buttun title="Sign In" onPress={handleLogin} />
          </View>
          <Line />
          <View style={{ alignItems: 'center', marginTop: '7%' }}>
            <Social />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: '5%', color: 'white', fontFamily: fonts.medium }}>
            Don't have an account?{' '}
            <Text onPress={() => navigation.navigate('signup')} style={{ color: '#B72658', fontSize: 16, fontWeight: '500' }}>
              Sign Up
            </Text>
          </Text>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

export default Login;

