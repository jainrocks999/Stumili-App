import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {widthPrecent as wp, heightPercent as hp} from '../atoms/responsive';
import {fonts} from '../../Context/Conctants';
import Entypo from 'react-native-vector-icons/Entypo';
import Categores_menu from '../Playlist/Categores_menu';
import storage from '../../utils/StorageService';
import {useDispatch, useSelector} from 'react-redux';

const List = ({cate, onPress, onPressPlay}) => {
  const {loading} = useSelector(state => state.home);
  const [modalIndex, setModalIndex] = useState(-1);
  const dispatch = useDispatch();
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
      token,
      item: false,
      isSearch: true,
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
      url: 'unlikeCategories',
      user_id: user,
      favorite_id: item.favorite_id,
      category_id: item.id,
      token,
      isCat: true,
      item: false,
      isSearch: true,
    });
  };
  return (
    <View>
      <FlatList
        data={cate}
        keyExtractor={item => item?.id}
        scrollEnabled={false}
        renderItem={({item, index}) => {
          let image =
            item.categories_image.length > 0
              ? item.categories_image[0].original_url
              : 'https://images.unsplash.com/photo-1616356607338-fd87169ecf1a';
          return (
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Categores_menu
                onClose={() => setModalIndex(-1)}
                visible={index == modalIndex}
                item={item}
                image={{uri: image}}
                onPressEdit={items => {
                  item.is_favorite ? removeFavroit(items) : getFavriote(items);
                }}
                loading={loading}
                onPressListen={onPressPlay}
              />
              <TouchableOpacity
                onPress={() => {
                  onPress(item);
                }}>
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
                    }}>
                    <Image
                      source={{uri: image}}
                      style={{height: '100%', width: '100%'}}
                      resizeMode="contain"
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      marginHorizontal: hp(2.5),
                    }}>
                    <Text style={styles.text}>{item.categories_name}</Text>
                    <Text style={styles.text2}>{'Buy Stimuli '}</Text>
                  </View>
                  <View style={{justifyContent: 'center', paddingRight: 20}}>
                    <Entypo
                      name="dots-three-horizontal"
                      size={20}
                      color="white"
                      onPress={() => {
                        setModalIndex(index);
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  imageeContainer: {
    marginVertical: hp(1.5),
    justifyContent: 'space-around',
    width: wp(90),
    flexDirection: 'row',
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
