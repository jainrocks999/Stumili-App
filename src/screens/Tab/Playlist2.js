import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ImageBackground,
  Alert,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Header from '../../components/molecules/Header';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Horizontal from '../../components/Home/Horizontal';
import { Image } from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import { ScrollView } from 'react-native';
import Loader from '../../components/Loader';
import LinearGradient from 'react-native-linear-gradient';
import Menu from '../../components/Playlist/Menu';
import Buttun from '../Auth/compoents/Buttun';
import { fonts } from '../../Context/Conctants';
import storage from '../../utils/StorageService';
import Categores_menu from '../../components/Playlist/Categores_menu';
import { MusicPlayerContext } from '../../Context/MusicPlayerConstaxt';
import CircularProgress from 'react-native-circular-progress-indicator';
import PlayPopup from '../../components/PlayPopup';
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
    title: 'Lorem Ipsum is simply dummy text of the',
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
  const { getNameImage } = useContext(MusicPlayerContext);
  const { favoriteList } = useSelector(state => state.home);

  console.log('tjhidi', favoriteList.favoritelist);
  const { loading, affirmations, groups, category, item } = useSelector(
    state => state.home,
  );
  const playItem = item;
  const image = item?.categories_image[0]?.original_url ?? '';
  const title = item?.categories_name ?? 'Believe in yourself';
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const HEADER_HEIGHT = 50;
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, hp(55));
  const translateY = diffClamp.interpolate({
    inputRange: [0, hp(55)],
    outputRange: [hp(0), hp(-60)],
    extrapolate: 'clamp',
  });
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true },
  );
  const [modalIndex, setModalIndex] = useState(-1);
  const onClose = () => {
    setModalIndex(-1);
  };
  const getFavriote = async item => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/Createfavriote_request',
      user_id: user,
      category_id: item.id,
      affirmation_id: '',
      url: 'createFavoriteList',
      navigation,
      token,
      item: { ...playItem, is_favorite: true },
    });
  };
  const removeFavroit = async item => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/removeFavriout_request',
      url: 'removeFavoriteList',
      user_id: user,
      favorite_id: item.favorite_id,
      category_id: item.id,
      token,
      isCat: true,
      item: { ...playItem, is_favorite: false },
    });
  };
  // useEffect(() => {
  //   setVisible(false);
  // }, [item]);
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <Categores_menu
        onPressListen={() => navigation.navigate('playsong', { index: -1 })}
        item={item}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        onPressEdit={items => {
          items.is_favorite ? removeFavroit(items) : getFavriote(items);
        }}
        loading={loading}
      />
      <Animated.View style={[styles.header]}>
        <View
          style={{
            height: '100%',
            width: '100%',
            zIndex: 100,
          }}
        >
          <View style={{ height: '3%' }} />
          <View
            style={{
              height: '100%',
              width: '90%',
              alignSelf: 'center',
              borderRadius: wp(2),
              elevation: 5,
              overflow: 'hidden',
              shadowOffset: {
                height: 4,
                width: 4,
              },
              shadowRadius: 4,
              shadowOpacity: 4,
              shadowColor: 'rgba(255,255,255,.5)',
            }}
          >
            <LinearGradient
              start={{ x: 0.3, y: 0 }}
              end={{ x: 0.3, y: 1 }}
              locations={[-3, 0.7, 1]}
              colors={[
                'rgba(0,0,0,1)',
                'rgba(0, 0, 0, 0.5)',
                'rgba(0, 0, 0, 0)',
              ]}
              style={[styles.gradient, { top: 0 }]}
            />
            <Entypo
              onPress={() => navigation.goBack()}
              name="chevron-left"
              size={30}
              color={'white'}
              style={{ position: 'absolute', zIndex: 8, margin: '4%' }}
            />
            <Text
              style={{
                position: 'absolute',
                zIndex: 7,
                color: 'white',
                bottom: '8%',
                fontSize: wp(6),
                fontWeight: '600',
                left: '5%',
                fontFamily: fonts.medium,
              }}
            >
              {title}
            </Text>
            <ImageBackground
              source={
                image == ''
                  ? require('../../assets/profilepic/plalist.png')
                  : { uri: image }
              }
              style={{
                height: '100%',
                width: '100%',
              }}
            >
              <LinearGradient
                start={{ x: 0.6, y: 0 }}
                end={{ x: 0.6, y: 1 }}
                locations={[-3, 0.2, 1]}
                colors={[
                  'rgba(0, 0, 0, 0)',
                  'rgba(0, 0, 0, 0.5)',
                  'rgba(0, 0, 0, 1)',
                ]}
                style={[styles.gradient, { bottom: 0, height: '60%' }]}
              />
            </ImageBackground>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              position: 'absolute',
              zIndex: 5,
            }}
          >
            {/* <Entypo
              name="chevron-left"
              size={30}
              color={'white'}
              style={{position: 'absolute', zIndex: 8, margin: '4%'}}
            /> */}
          </View>
        </View>
      </Animated.View>
      {/* <View
        style={{
          height: '8%',
          flexDirection: 'row',
         
          paddingHorizontal: wp(5),
          alignItems: 'center',
        }}>
        <Entypo
          onPress={() => navigation.goBack()}
          name="chevron-left"
          size={30}
          color={'white'}
          style={{
            zIndex: 0,
            margin: '4%',
          }}
        />
        <Text
          style={{color: '#fff', fontSize: wp(5.5), fontFamily: fonts.medium}}>
          {title}
        </Text>
      
      </View> */}
      <View
        style={{
          borderColor: '#fff',
          // height: '5%',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: hp(2),
          paddingHorizontal: wp(7),
          marginTop: '3%',
        }}
      >
        <View
          style={{
            marginTop: 10,
            zIndex: 5,
            color: 'white',
            alignSelf: 'center',
            height: hp(6.5),
            width: '45%',
            borderRadius: wp(1),
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <Buttun
            style={{
              height: '100%',
              width: '100%',
              flexDirection: 'row',
              elevation: 3,
              shadowColor: '#fff',
            }}
            onPress={() => {
              navigation.navigate('playsong', { index: -1 });
              dispatch({
                type: 'home/currentPLaylist',
                payload: item,
              });
            }}
            title={'Play'}
            playlist
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '45%',
            zIndex: 5,
            alignSelf: 'center',
            // bottom: '5%',
            justifyContent: 'space-between',
            marginTop: '8%',
          }}
        >
          <FontAwesome
            onPress={() => {
              item.is_favorite ? removeFavroit(item) : getFavriote(item);
            }}
            name={item.is_favorite ? 'heart' : 'heart-o'}
            size={25}
            color={item.is_favorite ? '#B72658' : 'white'}
          />
          <Entypo name="share" size={25} color="white" />
          <Entypo
            onPress={() => {
              setVisible(true);
            }}
            name="dots-three-vertical"
            size={25}
            color="white"
          />
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={e => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
      >
        <FlatList
          data={affirmations}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: '3%',
          }}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                height: hp(8),
                width: wp(90),
                marginVertical: 10,
                backgroundColor: '#4A4949',
                borderRadius: 8,
              }}
            >
              <Menu
                onClose={onClose}
                selectedItem={item}
                visible={index == modalIndex}
                selectedIndex={index}
                affirmations={affirmations}
                loading={loading}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('playsong', { index: index });
                }}
                style={{ justifyContent: 'center', marginHorizontal: '10%' }}
              >
                <Text style={styles.text}>
                  {typeof item?.affirmation_text == 'string'
                    ? item?.affirmation_text.substring(0, 40)
                    : ''}
                </Text>
              </TouchableOpacity>
              <View style={{ justifyContent: 'center' }}>
                <Entypo
                  onPress={() => {
                    setModalIndex(index);
                  }}
                  name="dots-three-horizontal"
                  size={20}
                  color="white"
                />
              </View>
            </View>
          )}
        />
      </ScrollView>
      {affirmations.length > 0 && getNameImage().name != '' ? (
        <PlayPopup />
      ) : null}
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
    height: hp(40),
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // left: 0,
    // elevation: 4,
    // zIndex: 8,
    backgroundColor: '#191919',

    borderColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: { paddingTop: hp(0) },
  text: {
    width: wp(60),
    marginLeft: 5,
    color: 'white',
    fontSize: hp(2),
    fontFamily: fonts.regular,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    zIndex: 5,
    height: '40%',
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
  },
});
