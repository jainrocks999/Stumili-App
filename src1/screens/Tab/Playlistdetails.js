import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../components/molecules/Header';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Horizontal from '../../components/Home/Horizontal';
// import {affirmations} from '../main/affmatin';
import {Image} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import {affirmations} from '../main/affmatin';

import {ScrollView} from 'react-native';
import Loader from '../../components/Loader';
import LinearGradient from 'react-native-linear-gradient';
import Menu from '../../components/Playlist/Menu';
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
  {
    id: '4',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '5',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '6',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '7',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '8',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
];

const Playlistdetails = () => {
  const dispatch = useDispatch();
  const {favoriteList} = useSelector(state => state.home);
  console.log('tjhidi', favoriteList.favoritelist);
  const {loading, groups, category, item} = useSelector(state => state.home);
  const image =
    // item?.categories_image[0]?.original_url ??
    'https://img.freepik.com/free-photo/relaxed-woman-enjoying-sea_1098-1441.jpg';
  const title = item?.categories_name ?? 'Believe in yourself';
  const navigation = useNavigation();
  const HEADER_HEIGHT = 50;
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, hp(55));
  const translateY = diffClamp.interpolate({
    inputRange: [0, hp(55)],
    outputRange: [0, hp(-55)],
  });
  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: true},
  );
  const [menuvisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(affirmations[0]);
  const onClose = () => {
    setMenuVisible(false);
  };
  return (
    <View style={styles.container}>
      <Menu
        onClose={onClose}
        selectedItem={selectedItem}
        visible={menuvisible}
      />
      <Loader loading={loading} />
      <Animated.View
        style={[styles.header, {transform: [{translateY: translateY}]}]}>
        <LinearGradient
          start={{x: 0.3, y: 0}}
          end={{x: 0.3, y: 1}}
          locations={[-3, 0.7, 1]}
          colors={['rgba(0,0,0,1)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
          style={[styles.gradient, {top: 0}]}
        />
        <Image
          source={{uri: image}}
          style={{
            height: '100%',
            width: wp(100),
            resizeMode: 'stretch',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            position: 'absolute',
            zIndex: 5,
          }}>
          <View style={{height: hp(5), marginLeft: wp(5)}}>
            <Icon
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={30}
              color="white"
            />
          </View>
        </View>
        <LinearGradient
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          locations={[-0.9, 0.7, 1]}
          colors={['rgba(0, 0, 0, 0)', '#191919']}
          style={[styles.gradient, {height: '20%'}]}></LinearGradient>
      </Animated.View>

      <View style={{marginLeft: wp(6), marginTop: hp(1), flexDirection: 'row'}}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={30}
          color="white"
        />
        <Text
          style={{
            color: 'white',
            fontSize: hp(3),
            fontWeight: '500',
            fontFamily: 'Poppins-Medium',
            marginLeft: '4%',
          }}>
          {title}
        </Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
            marginHorizontal: hp(3),
            marginTop: hp(1),
          }}>
          <Feather name="heart" size={25} color="white" />

          <Entypo name="share" size={25} color="white" marginHorizontal="10%" />
          <Entypo name="dots-three-horizontal" size={25} color="white" />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('playsong');
            }}
            style={{
              height: hp(8),
              width: hp(8),
              left: wp(35),
              backgroundColor: '#191919',
              borderRadius: hp(4),
            }}>
            <Image
              source={require('../../assets/playkey.png')}
              style={{
                height: '100%',
                width: '100%',
                tintColor: '#fff',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={e => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}>
        <View>
          <View style={{marginTop: hp(1.8), marginLeft: wp(6)}}>
            <Text
              style={{
                color: 'white',
                fontSize: hp(3.5),
                fontWeight: '500',
                fontFamily: 'Poppins-Medium',
              }}>
              {title}
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: hp(3),
                marginTop: hp(1),
              }}>
              <Feather name="heart" size={25} color="white" />
              <Entypo
                name="share"
                size={25}
                color="white"
                marginHorizontal="10%"
              />
              <Entypo
                onPress={() => {
                  navigation.navigate('Menu');
                }}
                name="dots-three-horizontal"
                size={25}
                color="white"
              />

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('playsong');
                }}
                style={{
                  height: hp(8),
                  width: hp(8),
                  left: wp(35),
                  backgroundColor: '#191919',
                  borderRadius: hp(4),
                }}>
                <Image
                  source={require('../../assets/playkey.png')}
                  style={{
                    height: '100%',
                    width: '100%',
                    tintColor: '#fff',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <FlatList
          data={affirmations}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            // <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                height: hp(8),
                width: wp(90),
                marginVertical: 10,
                backgroundColor: '#4A4949',
                borderRadius: 20,
              }}>
              <View style={{justifyContent: 'center', marginHorizontal: '10%'}}>
                <Text style={styles.text}>
                  {item.affirmation_text.substring(0, 30)}
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Entypo
                  onPress={() => {
                    setMenuVisible(true);
                    setSelectedItem(item);
                  }}
                  name="dots-three-horizontal"
                  size={20}
                  color="white"
                />
              </View>
            </View>
            // </TouchableOpacity>
          )}
        />
        {/* <Horizontal
          onPress={() => {
            getAffetMations();
          }}
          data={category}
        /> */}
      </ScrollView>
    </View>
  );
};
export default Playlistdetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },
  header: {
    height: hp(50),
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    elevation: 4,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: hp(32),
  },
  text: {
    width: wp(60),

    marginLeft: 5,
    color: 'white',
    fontSize: hp(2),
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    zIndex: 3,
    height: '40%',
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
  },
});
