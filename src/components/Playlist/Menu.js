import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacityBase,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {widthPrecent as wp, heightPercent as hp} from '../atoms/responsive';
import {TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {fonts} from '../../Context/Conctants';
import storage from '../../utils/StorageService';
import {useDispatch} from 'react-redux';
import Loader from '../Loader';
import FullScreenModal from './AddAffirmationPlaylist';

const Menu = ({
  visible,
  selectedItem,
  onClose,
  selectedIndex,
  affirmations,
  loading,
}) => {
  const dispatch = useDispatch();
  const data = [
    {
      id: '1',
      text: selectedItem.is_favorite ? 'Unlike Affirmation' : 'Like Affermaion',
      icon: selectedItem.is_favorite ? 'heart' : 'hearto',
    },
    {
      id: '2',
      text: 'Add to Playlist',
      icon: 'pluscircleo',
    },
    {
      id: '3',
      text: 'Share',
      icon: 'share-alternative',
    },
    {
      id: '4',
      text: 'Hide',
      icon: 'minuscircleo',
    },
  ];

  const getmodified = (array, indexs, bool) => {
    return array.map((item, index) => {
      if (index == indexs) {
        return {...item, is_favorite: bool};
      } else {
        return item;
      }
    });
  };
  const handleHeartPress = async (item, index) => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);

    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    const modified = getmodified(affirmations, index, true);

    dispatch({
      type: 'home/Createfavriote_request',
      user_id: user,
      category_id: '',
      affirmation_id: item.id,
      url: 'createFavoriteList',
      navigation: false,
      token,
      data: modified,
    });
  };
  const removeFavroit = async (item, index) => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);

    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];

    const modified = getmodified(affirmations, index, false);

    dispatch({
      type: 'home/removeFavriout_request',
      url: 'unlikeAffirmations',
      user_id: user,
      favorite_id: item.favorite_id,
      category_id: item.id,
      token,
      isCat: false,
      data: modified,
    });
  };
  const [visibles, setVisible] = useState(false);

  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <Loader loading={loading} />
      <FullScreenModal
        loading={loading}
        id={selectedItem.id}
        onClose={() => setVisible(false)}
        visible={visibles}
      />
      <View style={{flex: 1, backgroundColor: '#191919', opacity: 0.99}}>
        <View style={{height: '25%'}} />
        <View style={styles.main}>
          <Text style={styles.txt}>{selectedItem?.affirmation_text}</Text>
        </View>
        <View style={{height: '5%'}} />
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          contentContainerStyle={{alignSelf: 'right', marginLeft: wp(8)}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  switch (item.id) {
                    case '1': {
                      if (selectedItem.is_favorite) {
                        removeFavroit(selectedItem, selectedIndex);
                      } else {
                        handleHeartPress(selectedItem, selectedIndex);
                      }
                      break;
                    }
                    case '2': {
                      setVisible(true);
                    }
                  }
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: '5%',
                }}>
                {index != 2 ? (
                  <AntDesign
                    color={
                      item.id == '1' && selectedItem.is_favorite
                        ? '#B72658'
                        : 'white'
                    }
                    size={wp(7)}
                    name={item.icon}
                  />
                ) : (
                  <Entypo color="white" size={wp(7)} name={item.icon} />
                )}

                <Text
                  style={{
                    color: 'white',
                    fontSize: wp(5),
                    marginLeft: '5%',
                    fontFamily: fonts.medium,
                  }}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <TouchableOpacity onPress={onClose} style={styles.close}>
          <Text
            style={{
              color: '#fff',
              fontSize: wp(6.5),
              fontFamily: fonts.medium,
              // fontWeight: 'bol000d',
            }}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Menu;

const styles = StyleSheet.create({
  main: {
    width: '85%',
    alignSelf: 'center',
    backgroundColor: '#4A4949',
    paddingHorizontal: '3%',
    paddingVertical: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2.5),
    elevation: 5,
  },
  txt: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#fff',
    textAlign: 'left',
    fontFamily: fonts.medium,
  },
  close: {
    bottom: hp(10),
    position: 'absolute',
    alignSelf: 'center',
  },
});
