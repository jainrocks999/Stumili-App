import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Slider from '@react-native-community/slider';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';
const Img = [
  {
    id: '1',
    image: require('../../assets/music.jpg'),
    title: 'michel',
    title2: '90 affirmations',
  },
  {
    id: '2',
    image: require('../../assets/music.jpg'),
    title: 'Mumbai',
    title2: '90 affirmations',
  },
  {
    id: '3',
    image: require('../../assets/music.jpg'),
    title: 'chennai',
    title2: '90 affirmations',
  },
  {
    id: '4',
    image: require('../../assets/music.jpg'),
    title: 'Delhi',
    title2: '90 affirmations',
  },
  {
    id: '5',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '6',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '7',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '8',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '9',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '10',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
];

const Sleep = ({data, onPress}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <ScrollView contentContainerStyle={{alignSelf: 'center'}}>
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'column',
                width: wp(49),
                alignItems: 'center',
              }}>
              <View style={styles.imageContainerrr}>
                <TouchableOpacity
                  onPress={() => {
                    const obj = {
                      ...item,
                      music: {
                        url: item.media[1]?.original_url,
                        title: 'Titel',
                        artist: 'Innertune',
                        artwork: item.media[0]?.original_url,
                        duration: null,
                      },
                    };
                    onPress(obj);
                  }}>
                  <Image
                    source={{uri: item?.bgsound_image[0]?.original_url}}
                    style={styles.imageee}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignSelf: 'center',
                      marginTop: 10,
                    }}>
                    <Text style={styles.texttt}>{item?.bgsound_name}</Text>
                  </View>
                </TouchableOpacity>
                {/* <View
                  style={{
                    // position: 'absolute',
                    // right: 10,
                    // top: 10,
                    height: hp(4),
                    width: wp(8),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    backgroundColor: null,
                  }}>
                  {/* <Fontisto name="locked" size={20} color="black" /> 
                </View> */}
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sleep;

const styles = StyleSheet.create({
  imageContainerrr: {
    width: hp(20),
    height: hp(15),
    borderRadius: 20,
    marginVertical: hp(3.5),
    // borderWidth: 1,
    // borderColor: 'black',
    // backgroundColor: 'black',
  },
  imageee: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  texttt: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});
