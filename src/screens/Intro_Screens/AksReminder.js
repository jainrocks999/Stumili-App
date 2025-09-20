import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../../components/atoms/responsive';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import {fonts} from '../../Context/Conctants';
import {SafeAreaView} from 'react-native-safe-area-context';

const AksReminder = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <AntDesign
            onPress={() => {
              navigation.goBack();
            }}
            name="arrowleft"
            size={25}
            color="white"
            style={{marginLeft: '5%'}}
          />
          <Text style={styles.headerTitle}>Welcome to stimuli</Text>
          <Image
            style={{
              marginTop: '2%',
              height: 50,
              width: 50,
              marginRight: '5%',
            }}
            source={require('../../assets/logo/stimuili-logos1-.png')}
          />
        </View>
        <FastImage
          style={{
            height: 200,
            width: 200,

            alignSelf: 'center',
            marginTop: '5%',
            backfaceVisibility: 'hidden',
          }}
          source={require('../../assets/logo/Animatedgif.gif')}
          resizeMode="contain"
          onPointerMoveCapture={ec => {
            console.log(ec);
          }}
        />
        <Text
          style={{
            paddingHorizontal:wp(1),
            marginLeft: wp(3),
            width: '80%',
            color: 'white',
            fontSize: wp(4.5),
            fontWeight: '500',
            marginTop: '10%',
            fontFamily: fonts.medium,
          }}>
          Get reminded to respect along your favorite affirmations{' '}
        </Text>
        <Text
          style={{
            paddingHorizontal:wp(1),
            fontSize: wp(3.5),
            width: '95%',
            textAlign: 'left',
            marginLeft: wp(3),
            marginTop: '1%',
            color: 'white',
          }}>
          ou are capable, resilient, and worthy of all the good things life
          offers. Your unique qualities shine brightly, guiding you towards
          success and fulfillment.
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Intrested');
          }}
          style={[styles.nextBtn]}>
          <LinearGradient
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            start={{x: 1.4, y: 0}}
            end={{x: 0, y: 1}}
            locations={[0, 1]}
            colors={['#D485D1', '#B72658']}>
            <Text
              style={{
                color: 'white',
                fontSize: wp(5.5),
                // fontWeight: '400',
                fontFamily: fonts.regular,
              }}>
              {'Get Started'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default AksReminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },
  headerTitle: {
    color: '#FFF',
    // marginLeft: '1%',
    fontSize: wp(5),
    fontFamily: fonts.bold,
  },
  nextBtn: {
    alignSelf: 'center',
    zIndex: 1,
    position: 'absolute',
    height: hp(6),
    width: wp(50),
    elevation: 4,
    borderRadius: 5,
    overflow: 'hidden',
    bottom: hp(4),
  },
});
