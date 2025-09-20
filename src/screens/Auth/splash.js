import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './compoents/Background';
const Splash = () => {
  const navigation = useNavigation();

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Stimuli Notification Permission',
          message:
            'Stimuli would like to send you push notifications ' +
            'to keep you updated on the latest photo trends and app features.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Don’t Allow',
          buttonPositive: 'Allow',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      }
      console.log('this', granted);
    } catch (err) {
      console.warn(err);
    }
  };
  const version = async () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const res = fetch(
      'https://stimuli.forebearpro.co.in/api/v1/version-update',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .catch(error => console.error(error));
  };
  useEffect(() => {
    version();
    requestPermissions();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      navigate();
    }, 1500);
  }, []);
  const navigate = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token != null) {
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    } else {
      navigation.replace('login');
    }
  };

  return (
    <Background>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            height: 180,
            width: 180,
            margin: '6%',
            marginBottom: '3%',
            borderRadius: 90,
          }}
          source={require('../../assets/logo/stimuili-logos1-.png')}
        />
      </View>
    </Background>
  );
};

export default Splash;

const styles = StyleSheet.create({});
