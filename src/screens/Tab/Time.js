import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Slider from '@react-native-community/slider';
import {fonts} from '../../Context/Conctants';
const Img2 = [
  {
    id: '1',
    title: '1',
    title2: 'min',
  },
  {
    id: '2',
    title: '5',
    title2: 'min',
  },
  {
    id: '3',
    title: '10',
    title2: 'min',
  },
  {
    id: '4',
    title: '20',
    title2: 'min',
  },
  {
    id: '5',
    title: '30',
    title2: 'min',
  },
];

const Time = ({maxTimeInMinutes, onPress}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: hp(2),
        }}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontWeight: '500',
            color: 'white',
            fontFamily: fonts.bold,
          }}>
          Session Length
        </Text>
      </View>

      <View
        style={{
          height: hp(20),
          width: wp(100),
          marginHorizontal: hp(1),
          marginVertical: hp(6),
        }}>
        <FlatList
          horizontal={true}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={Img2}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => onPress(item)}
              style={styles.imageContainerr}>
              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.textt}>{item.title}</Text>
                <Text style={styles.textt}>{item.title2}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default Time;
const styles = StyleSheet.create({
  imageContainerr: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: hp(15),
    height: hp(15),
    borderRadius: 20,
    marginHorizontal: hp(0.5),
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#4A4949',
  },
  imagee: {
    width: hp(6),
    height: hp(6),
    marginVertical: 10,
    borderRadius: hp(7),
  },
  textt: {
    color: 'white',
    fontSize: hp(3),
    fontFamily: fonts.medium,
    fontWeight: '500',
  },
});
