import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import {fonts} from '../../Context/Conctants';
import Buttun from './compoents/Buttun';

const Img = [
  {
    id: '1',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '2',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '3',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
];
const Goal = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#191919'}}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: hp(2.5),
            // fontFamily: 'Poppins-Medium',
            fontFamily: fonts.bold,
            // fontWeight: '600',,
            color: '#fff',
          }}>
          {' '}
          What are your Goals
        </Text>

        <View style={{marginVertical: 10, marginBottom: 20}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '400',
              fontFamily: fonts.medium,
              color: '#fff',
            }}>
            {' '}
            You can choose multiple options
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          width: wp(100),
          height: hp(18),
          top: hp(2),
        }}>
        <FlatList
          data={Img}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                height: hp(14),
                justifyContent: 'center',
                marginHorizontal: wp(2),
                width: hp(14),
                marginVertical: hp(2),
                backgroundColor: '#4A4949',
                borderRadius: 20,
              }}>
              <View style={{justifyContent: 'center', marginVertical: 10}}>
                <Entypo name="baidu" size={30} color="white" />
              </View>
              <View style={{justifyContent: 'center', marginHorizontal: '10%'}}>
                <Text style={styles.text}>divfsidf</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          width: wp(100),
          height: hp(18),
          top: hp(2),
        }}>
        <FlatList
          data={Img}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                height: hp(14),
                justifyContent: 'center',
                marginHorizontal: wp(2),
                width: hp(14),
                marginVertical: hp(2),
                backgroundColor: '#4A4949',
                borderRadius: 20,
              }}>
              <View style={{justifyContent: 'center', marginVertical: 10}}>
                <Entypo name="baidu" size={30} color="white" />
              </View>
              <View style={{justifyContent: 'center', marginHorizontal: '10%'}}>
                <Text style={styles.text}>divfsidf</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          width: wp(100),
          height: hp(18),
          top: hp(2),
        }}>
        <FlatList
          data={Img}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                height: hp(14),
                justifyContent: 'center',
                marginHorizontal: wp(2),
                width: hp(14),
                marginVertical: hp(2),
                backgroundColor: '#4A4949',
                borderRadius: 20,
              }}>
              <View style={{justifyContent: 'center', marginVertical: 10}}>
                <Entypo name="baidu" size={30} color="white" />
              </View>
              <View style={{justifyContent: 'center', marginHorizontal: '10%'}}>
                <Text style={styles.text}>divfsidf</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          margin: hp(2),
          top: hp(5),
        }}>
        <Buttun title={'Continue'} />
      </View>
    </View>
  );
};

export default Goal;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(5),
  },
  text: {
    color: 'white',
    fontSize: wp(4),
    fontFamily: fonts.medium,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
    marginHorizontal: 10,
  },
});
