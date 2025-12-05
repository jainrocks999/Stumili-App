import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../../../components/atoms/responsive';
import { fonts } from '../../../Context/Conctants';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Buttun from '../../Auth/compoents/Buttun';
import { FlatList } from 'react-native';
import AffirmationMenu from './AffirmationMenu';
import storage from '../../../utils/StorageService';
import Loader from '../../../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditPlayList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { item, affirmations2, affirmations, loading } = useSelector(
    state => state.home,
  );
  const data = item.item;
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    setSelected(affirmations2);
  }, [affirmations2]);
  const [visible, setVisible] = useState(false);
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
      navigation: false,
      url: 'affirmation',
      item: false,
      page: '',
    });
    setVisible(true);
  };
  const fileTerAffirmation = array => {
    const result = array.filter(item => {
      return !selected.some(affirmation => affirmation.id == item.id);
    });
    return result;
  };
  const toggleItemInSelected = item => {
    setSelected(prevSelected => {
      const index = prevSelected.findIndex(
        selectedItem => selectedItem.id == item.id,
      );
      if (index == -1) {
        return [...prevSelected, item];
      } else {
        return prevSelected.filter(selectedItem => selectedItem.id != item.id);
      }
    });
  };
  const getIds = array => {
    return array.map(item => item.id);
  };

  const updatePlaylistItem = async () => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user_id = items.find(([key]) => key === storage.USER_ID)?.[1];
    const ids = getIds(selected);
    dispatch({
      type: 'home/update_playlistitem_request',
      url: 'deletePlayListItem',
      playlist_id: item.item.id,
      affirmation_id: ids,
      user_id,
      token,
      navigation,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#191919' }}>
      <Loader loading={loading} />
      <View
        style={{
          height: '8%',
          flexDirection: 'row',
          paddingHorizontal: wp(0),
          alignItems: 'center',
        }}
      >
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
          style={{ color: '#fff', fontSize: wp(5.5), fontFamily: fonts.medium }}
        >
          {'Edit PlayList'}
        </Text>
      </View>
      <AffirmationMenu
        visible={visible}
        affirmations={fileTerAffirmation(affirmations)}
        onClose={() => setVisible(false)}
        onSelect={item => toggleItemInSelected(item)}
      />
      <View style={{ height: '2%' }} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('saveplaylist', { isEdit: true });
        }}
        style={styles.card}
      >
        <View
          style={{
            height: hp(9),
            paddingHorizontal: wp(1),
            paddingVertical: wp(1),
            width: hp(9),
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: wp(2),
          }}
        >
          <Image
            tintColor={'#B72658'}
            source={require('../../../assets/playlist.png')}
            style={{ height: '100%', width: '100%' }}
            resizeMode="contain"
          />
        </View>
        <View style={{ paddingBottom: '5%' }}>
          <Text style={styles.title}>{data.title}</Text>
          <Text
            style={[
              styles.title,
              { fontSize: wp(4), fontFamily: fonts.regular, marginTop: '2%' },
            ]}
          >
            <Entypo color="white" size={wp(3.5)} name={'pencil'} />
            {'Edit Name and info'}
          </Text>
        </View>
      </TouchableOpacity>
      <Buttun
        onPress={() => getAffetMations()}
        child
        style={styles.moreAffirmationBtn}
      >
        <Text
          style={{
            fontSize: wp(5),
            textAlign: 'center',
            color: '#fff',
            fontFamily: fonts.medium,
          }}
        >
          {'Add More Affirmations'}
        </Text>
        <AntDesign
          size={wp(6)}
          style={{ marginTop: '1%', marginLeft: '3%' }}
          name="plus"
          color={'#fff'}
        />
      </Buttun>
      <View
        style={{
          flexDirection: 'row',
          marginTop: '5%',
          width: '90%',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      >
        <Text style={styles.aded}>Added Affirmations</Text>
        <Text style={styles.aded}>{selected.length}</Text>
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: '2%',
          height: '55%',
        }}
      >
        <FlatList
          data={selected}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                height: hp(7),
                width: wp(90),
                marginVertical: hp(1),
                backgroundColor: '#4A4949',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: wp(4),
              }}
            >
              <Text style={styles.text}>
                {item.affirmation_text.substring(0, 40)}
              </Text>

              <View style={{ justifyContent: 'center' }}>
                <AntDesign
                  onPress={() => {
                    toggleItemInSelected(item);
                  }}
                  name={!true ? 'pluscircleo' : 'minuscircleo'}
                  size={22}
                  color={!true ? '#fff' : 'red'}
                />
              </View>
            </View>
          )}
        />
      </View>
      <Buttun
        title={'Update Playlist'}
        style={{
          alignSelf: 'center',
          position: 'absolute',
          bottom: '4%',
          width: '60%',
          height: hp(5.5),
        }}
        onPress={() => {
          updatePlaylistItem();
        }}
      />
    </SafeAreaView>
  );
};

export default EditPlayList;

const styles = StyleSheet.create({
  card: {
    borderWidth: 0.2,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: wp(1),
    paddingLeft: wp(1),
    backgroundColor: '#4A4949',
    borderColor: 'lightgrey',
    borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: wp(5),
    marginLeft: wp(3),
    fontFamily: fonts.bold,
    color: '#fff',
  },
  moreAffirmationBtn: {
    alignSelf: 'center',
    marginTop: '5%',
    height: hp(6),
    width: wp(90),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDEBA3',
    borderRadius: wp(2),
    elevation: 5,
    flexDirection: 'row',
  },
  aded: {
    color: '#fff',
    fontSize: wp(4.5),
    fontFamily: fonts.bold,
  },
  text: {
    color: 'white',
    fontSize: wp(4.5),
    fontFamily: fonts.regular,
  },
  text2: {
    width: wp(50),
    marginTop: 4,
    marginLeft: 5,
    color: 'black',
    fontSize: 15,
    fontWeight: '300',
  },
});
