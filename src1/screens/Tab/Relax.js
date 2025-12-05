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
import {fonts} from '../../Context/Conctants';
const Img = [
  {
    id: '1',
    image: require('../../assets/music.jpg'),
    title: 'John cena',
    title2: '90 affirmations',
  },
  {
    id: '2',
    image: require('../../assets/music.jpg'),
    title: 'Annie sharma',
    title2: '90 affirmations',
  },
  {
    id: '3',
    image: require('../../assets/music.jpg'),
    title: 'Lilly barde',
    title2: '90 affirmations',
  },
  {
    id: '4',
    image: require('../../assets/music.jpg'),
    title: 'maxvell',
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

const Relax = ({data, onPress}) => {
  // logh;
  return (
    // <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
    //   {/* <ScrollView contentContainerStyle={{alignSelf: 'center'}}> */}
    //   <View style={{paddingBottom: hp(10)}}>
    //     <FlatList
    //       data={data}
    //       numColumns={2}
    //       keyExtractor={item => item.id}
    //       renderItem={({item}) => (
    //         <View
    //           style={{
    //             flexDirection: 'column',
    //             width: wp(49),
    //             alignItems: 'center',
    //           }}>
    //           <View style={styles.imageContainerrr}>
    //             <TouchableOpacity>
    //               <Image
    //                 source={{uri: item?.bgsound_image[0]?.original_url}}
    //                 style={styles.imageee}
    //               />
    //             </TouchableOpacity>
    //             <TouchableOpacity>
    //               <View
    //                 style={{
    //                   flexDirection: 'column',
    //                   alignSelf: 'center',
    //                   marginTop: 10,
    //                 }}>
    //                 <Text style={styles.texttt}>{item?.bgsound_name}</Text>
    //               </View>
    //             </TouchableOpacity>
    //             <View
    //               style={{
    //                 position: 'absolute',
    //                 right: 10,
    //                 top: 10,
    //                 height: hp(4),
    //                 width: wp(8),
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //                 borderRadius: 20,
    //                 backgroundColor: 'white',
    //               }}>
    //               <Fontisto name="locked" size={20} color="black" />
    //             </View>
    //           </View>
    //         </View>
    //       )}
    //     />
    //   </View>
    //   {/* </ScrollView> */}
    // </SafeAreaView>
    <View style={{backgroundColor: '#191919', flex: 1}}>
      <View style={{width: '100%', alignItems: 'center', marginTop: '5%'}}>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({item, index}) => (
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
              }}
              activeOpacity={0.7}
              style={{alignItems: 'center'}}>
              <View style={styles.listContainer}>
                <Image
                  source={{uri: item?.bgsound_image[0]?.original_url}}
                  style={styles.imageee}
                />
              </View>
              <Text style={styles.texttt}>{item?.bgsound_name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Relax;

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
    marginBottom: hp(3),
    fontFamily: fonts.medium,
  },
  listContainer: {
    // borderWidth: 1,
    borderColor: 'white',
    height: hp(18),
    width: wp(45),
    marginHorizontal: wp(2),
    marginVertical: wp(2),
    borderRadius: 20,
  },
});
