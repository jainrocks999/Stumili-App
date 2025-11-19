import React, { useEffect, useState } from 'react';
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
  Clipboard,
} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Slider from '@react-native-community/slider';
import Tts from 'react-native-tts';
import { fonts } from '../../Context/Conctants';
import { vociesss } from '../../Context/vocies';
import VolumeModule, { VolumeEvents } from '../../native/VolumeModule';
const Img = [
  {
    id: '1',
    image: require('../../assets/music.jpg'),
    title: 'John',
  },
  {
    id: '2',
    image: require('../../assets/music.jpg'),
    title: 'Annie',
  },
  {
    id: '3',
    image: require('../../assets/music.jpg'),
    title: 'Lilly',
  },
  {
    id: '4',
    image: require('../../assets/music.jpg'),
    title: 'Max',
  },
];
const Voice = ({ voice, onPress, selectedVoice }) => {
  const [volume, setVolume] = React.useState(0);
  useEffect(() => {
    VolumeModule.startListening();
    const sub = VolumeEvents.addListener(({ volume }) => {
      setVolume(volume);
      console.log('Volume changed →', volume);
    });

    return () => {
      VolumeModule.stopListening();
      sub.remove();
    };
  }, []);
  const getVolume = async() => {
    const value= await VolumeModule.getVolume()
    setVolume(value);
  };
  useEffect(() => {
    getVolume();
  }, []);
  function filterByLanguage(array, languages) {
    return array.filter(item => languages.includes(item.language));
  }
  const myvoice = vociesss
    .filter((item, index) => {
      return item.language == 'en-IN';
    })
    .map((item, index) => ({
      id: item.id,
      name: 'Lily' + index,
      language: item.language,
      image: require('../../assets/profilepic/profile4.jpg'),
    }));
  const myvoice1 = [
    {
      id: 'en-IN-language',
      name: 'Lily',
      language: 'en-IN',
      image: require('../../assets/profilepic/profile3.jpg'),
    }, //female //anny
    {
      id: 'en-us-x-iob-local',
      name: 'Annie',
      language: 'en-US',
      image: require('../../assets/profilepic/profile4.jpg'),
    },
    {
      id: 'en-au-x-aub-local',
      name: 'John',
      language: 'en-AU',
      image: require('../../assets/profilepic/profile2.jpg'),
    }, //male
    {
      id: 'en-in-x-ahp-local',
      name: 'Beth',
      language: 'en-IN',
      image: require('../../assets/profilepic/profile1.jpg'),
    },
    {
      id: 'en-us-x-iom-local',
      name: 'Smith',
      language: 'en-US',
      image: require('../../assets/profilepic/profile5.jpg'),
    },
    {
      id: 'en-in-x-cxx-local',
      name: 'Kimm',
      language: 'en-IN',
      image: require('../../assets/profilepic/profile6.jpg'),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#191919' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: hp(2),
        }}
      >
        <Text
          style={{
            fontSize: hp(2.5),
            //fontWeight: '500',
            color: 'white',
            fontFamily: fonts.bold,
          }}
        >
          Voice Settings
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          margin: hp(2),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            fontWeight: '500',
            color: 'grey',
            fontFamily: fonts.medium,
          }}
        >
          Voice Over
        </Text>
      </View>
      <View style={{ margin: hp(1) }}>
        <FlatList
          data={myvoice}
          horizontal
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => onPress(item)}>
              <View
                style={{
                  paddingRight: '4%',
                  height: hp(7),
                  borderRadius: hp(7),
                  backgroundColor: selectedVoice == item.id ? 'black' : 'gray',
                  marginHorizontal: wp(1),
                  width: selectedVoice == item.id ? wp(40) : wp(30),
                  justifyContent: 'center',
                }}
              >
                <View style={styles.imageContainer}>
                  <Image source={item.image} style={styles.image} />
                  {
                    <View style={{ marginHorizontal: hp(1) }}>
                      <Text style={styles.text}>{item.name}</Text>
                    </View>
                  }
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          margin: hp(2),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            fontWeight: '500',
            color: 'grey',
            fontFamily: fonts.medium,
          }}
        >
          Voice Volume
        </Text>
      </View>

      <View style={[{ alignItems: 'center' }]}>
        <Slider
          style={{ width: '90%', height: 30 }}
          value={volume}
          maximumValue={1}
          onValueChange={vaule => {
            VolumeModule.setVolume(vaule);
          }}
          minimumTrackTintColor="white"
          maximumTrackTintColor="white"
          thumbTintColor="white"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: hp(2),
          marginTop: hp(2),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            fontWeight: '500',
            color: 'grey',
            fontFamily: fonts.medium,
          }}
        >
          Affirmation Delay
        </Text>
      </View>
      <View style={{ marginTop: hp(3), alignItems: 'center' }}>
        <Slider
          style={{ width: '90%', height: 30 }}
          minimumValue={0}
          maximumValue={2}
          minimumTrackTintColor="white"
          maximumTrackTintColor="white"
          thumbTintColor="white"
        />
      </View>
    </SafeAreaView>
  );
};
export default Voice;
const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: hp(7),
    height: hp(7),
    borderRadius: hp(7),
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: wp(1),
    fontFamily: fonts.bold,
  },
});
