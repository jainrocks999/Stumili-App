import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Clipboard,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../components/atoms/responsive';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../Context/Conctants';
import storage from '../utils/StorageService';
import Loader from '../components/Loader';
import Playlist_Menu from '../components/Playlist/Playlist_Menu';
import Categores_menu from '../components/Playlist/Categores_menu';
import PlayPopup from '../components/PlayPopup';
import { MusicPlayerContext } from '../Context/MusicPlayerConstaxt';

const Img = [
  {
    id: '1',
    image: require('../assets/music.jpg'),
    title: 'abcd',
    title2: 'by You',
  },
  {
    id: '2',
    image: require('../assets/music.jpg'),
    title: 'abcd',
    title2: 'by You',
  },
  // {
  //   id: '3',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
  // {
  //   id: '4',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
  // {
  //   id: '5',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
  // {
  //   id: '6',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
  // {
  //   id: '7',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
  // {
  //   id: '8',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
];

const Toptab = () => {
  const {
    playlist,
    favorite_Cat,
    affirmations,
    category,
    affirmations2,
    loading,
    grops,
  } = useSelector(state => state.home);
  const { getNameImage } = useContext(MusicPlayerContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    getplaylist();
  }, []);
  const getplaylist = async () => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/playlist_request',
      token,
      url: 'playList',
      user_id: user,
    });
  };

  const getPlayListItem = async (item, bool) => {
    const token = await storage.getItem(storage.TOKEN);
    const user_id = await storage.getItem(storage.USER_ID);
    dispatch({
      type: 'home/getPlayListItem_request',
      playlist_id: item.id,
      user_id,
      token,
      url: 'playListItem',
      navigation,
      item: item,
      isEdit: bool ?? false,
    });
  };
  const getFavroitCategories = async bool => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/getFavriotCategories_request',
      url: bool ? 'likeCategories' : 'likeAffirmations',
      user_id: user,
      token,
      category: bool,
      navigation,
    });
  };
  useEffect(() => {
    getFavroitCategories(true);
  }, [grops, category]);
  const getAffetMations = async item => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];

    dispatch({
      type: 'home/affirmation_fetch_request',
      token,
      user_id: user,
      navigation,
      url: 'affirmation',
      item,
      page: 'Playlistdetails2',
    });
  };
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [categoriesIndex, setCategoryIndex] = useState(-1);
  useEffect(() => {
    setVisibleIndex(-1);
    setCategoryIndex(-1);
  }, [affirmations, affirmations2, playlist, favorite_Cat]);

  const onPressDelete = async item => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);

    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];

    dispatch({
      type: 'home/delete_playlist_request',
      user_id: user,
      token,
      playlist_id: item.id,
      url: 'playListDelete',
    });
  };

  const getAffetMationsbyCategories = async item => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];

    dispatch({
      type: 'home/affirmationBYCategory_request',
      token,
      user_id: user,
      navigation,
      url: 'categoryByAffermation',
      item: { ...item, is_favorite: true },
      page: 'Playlistdetails2',
      category_id: item.id,
    });
  };
  const getFilter = (array, id) => {
    return array.filter(item => item.id != id);
  };
  const removeFavroit = async (item, index) => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    // const modified = getmodified(groups, item.index, index, false);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    const filter = getFilter([...favorite_Cat], item.id);

    dispatch({
      type: 'home/removeFavriout_request',
      url: 'removeFavoriteList',
      user_id: user,
      favorite_id: item?.favorite_id,
      category_id: item.id,
      token,
      isCat: true,
      data: filter,
      removeFromFavrioutList: true,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#191919', height: '100%' }}>
      <Loader loading={loading} />
      <View style={{ marginHorizontal: hp(3), marginTop: 10 }}>
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: hp(3),
            color: 'white',
            marginVertical: 10,
          }}
        >
          My Library
        </Text>
      </View>
      <TouchableOpacity
        onPress={items => {
          getFavroitCategories(false);
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            top: hp(3),
          }}
        >
          <View style={styles.imageContainer}>
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: -0.2, y: 0 }}
              locations={[0.3, 1]}
              colors={['#D485D1', '#B72658']}
              style={styles.linearGradient}
            >
              <View style={{ justifyContent: 'center', marginLeft: '5%' }}>
                <Entypo name="heart" size={30} color="white" />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    width: wp(50),
                    color: '#fff',
                    fontSize: wp(5),
                    fontWeight: '500',
                    fontFamily: fonts.bold,
                  }}
                >
                  Afffirmation liked
                </Text>
                <Text style={styles.text2}>90 affirmations</Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </TouchableOpacity>

      <View style={{ marginHorizontal: hp(3), marginTop: hp(3) }}>
        <Text
          style={{
            fontFamily: fonts.bold, // fontFamily: 'Montserrat',
            fontSize: hp(2.5),
            color: 'white',
            marginVertical: 10,
          }}
        >
          Playlist
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: hp(4) }}>
        <View>
          <FlatList
            data={favorite_Cat}
            keyExtractor={item => item?.id}
            scrollEnabled={false}
            renderItem={({ item, index }) => {
              let image =
                item.categories_image.length > 0
                  ? item.categories_image[0].original_url
                  : 'https://images.unsplash.com/photo-1616356607338-fd87169ecf1a';
              // console.log(image, item.categories_name);
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Categores_menu
                    visible={categoriesIndex == index}
                    image={{ uri: image }}
                    item={{ ...item, is_favorite: true }}
                    onClose={() => {
                      setCategoryIndex(-1);
                    }}
                    onPressListen={getAffetMationsbyCategories}
                    onPressEdit={removeFavroit}
                    loading={loading}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      getAffetMationsbyCategories(item);
                    }}
                  >
                    <View style={styles.imageeContainer}>
                      <View
                        style={{
                          justifyContent: 'center',
                          height: hp(8),
                          width: wp(16),
                          alignItems: 'center',
                          borderRadius: wp(2),
                          backgroundColor: 'white',
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          source={{ uri: image }}
                          style={{ height: '100%', width: '100%' }}
                          resizeMode="stretch"
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginHorizontal: hp(2.5),
                        }}
                      >
                        <Text style={styles.text}>{item.categories_name}</Text>
                        <Text style={styles.text2}>{'Buy Stimuli '}</Text>
                      </View>
                      <View
                        style={{ justifyContent: 'center', paddingRight: 20 }}
                      >
                        <Entypo
                          onPress={() => {
                            setCategoryIndex(index);
                          }}
                          name="dots-three-horizontal"
                          size={20}
                          color="white"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>

        <FlatList
          data={playlist[0].playlist}
          keyExtractor={item => item?.id}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            >
              <Playlist_Menu
                image={require('../assets/playlist.png')}
                item={{ ...item, is_favorite: true }}
                visible={index == visibleIndex}
                onClose={() => setVisibleIndex(-1)}
                onPressListen={items => {
                  getPlayListItem(items);
                }}
                onPressEdit={data => {
                  getPlayListItem(item, true);
                }}
                onPressDelete={item => {
                  onPressDelete(item);
                }}
                loading={loading}
              />
              <TouchableOpacity
                onPress={() => {
                  getPlayListItem(item);
                }}
              >
                <View style={styles.imageeContainer}>
                  <View
                    style={{
                      justifyContent: 'center',
                      height: hp(8),
                      width: wp(16),
                      alignItems: 'center',
                      borderRadius: wp(2),
                      backgroundColor: 'white',
                    }}
                  >
                    <Image
                      source={require('../assets/playlist.png')}
                      style={styles.image}
                      tintColor={'#B72658'}
                    />
                  </View>
                  {/* </LinearGradient> */}
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      marginHorizontal: hp(2.5),
                    }}
                  >
                    <Text style={styles.text}>{item.title}</Text>
                    <Text style={styles.text2}>{item.description}</Text>
                  </View>
                  <View style={{ justifyContent: 'center', paddingRight: 20 }}>
                    <Entypo
                      onPress={() => {
                        setVisibleIndex(index);
                      }}
                      name="dots-three-horizontal"
                      size={20}
                      color="white"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
      {affirmations?.length > 0 && getNameImage().name != '' ? (
        <PlayPopup />
      ) : null}
    </View>
  );
};

export default Toptab;
const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: hp(1.5),

    justifyContent: 'space-around',

    height: hp(10),
    width: wp(90),
    borderRadius: 10,
    flexDirection: 'row',
  },
  linearGradient: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: wp(2),
    justifyContent: 'space-around',
    paddingRight: '20%',
  },

  imageeContainer: {
    marginVertical: hp(1.5),
    justifyContent: 'space-around',
    width: wp(90),
    flexDirection: 'row',
  },
  image: {
    width: hp(4),
    height: hp(4),
    borderRadius: 30,
  },
  text: {
    width: wp(50),
    color: 'white',
    fontSize: hp(2),
    fontWeight: '500',
    fontFamily: fonts.bold,
  },
  text2: {
    width: wp(50),
    top: 3,
    color: 'white',
    fontSize: hp(1.8),
    fontWeight: '300',
    fontFamily: fonts.medium,
  },
});
