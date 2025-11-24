import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';

import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Buttun from '../../Auth/compoents/Buttun';
import { fonts } from '../../../Context/Conctants';
const Img = [
  {
    id: '1',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '2',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '3',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '4',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '5',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '6',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '7',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '8',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
];
const Createaffirmation = ({ route }) => {
  const { affirmations, addetItems_to_playlist } = useSelector(
    state => state.home,
  );
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setSelected(addetItems_to_playlist);
  }, [addetItems_to_playlist]);

  const filterSelected = () => {
    const filter = affirmations.filter(item => selected.includes(item.id));
    return filter;
    // setSelected(filter);
  };

  const deselectItem = itemId => {
    const updatedSelected = selected.filter(item => item != itemId);
    setSelected(updatedSelected);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({
        type: 'home/Add_item_to_Create_Playlist',
        payload: selected,
      });
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, [selected]);

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: '#191919' }}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ height: hp(5), marginLeft: '15%' }}>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={30}
            color="white"
          />
        </View>
        <View style={{ height: hp(5), width: wp(100) }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              marginHorizontal: '8%',
              fontFamily: fonts.bold,
              color: 'white',
            }}
          >
            Edit List of Affirmation
          </Text>
        </View>
      </View>
      {/* <View style={styles.searchContainer}>
        <Text style={{color: 'white', fontSize: 17}}>
          Edit List of Affirmation
        </Text>
      </View> */}
      <ScrollView
        contentContainerStyle={{ alignItems: 'center', marginTop: 20 }}
      >
        <FlatList
          data={filterSelected()}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                height: hp(8),
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
                    deselectItem(item.id);
                  }}
                  name={
                    !selected.includes(item.id) ? 'pluscircleo' : 'minuscircleo'
                  }
                  size={25}
                  color={!selected.includes(item.id) ? '#fff' : 'red'}
                />
              </View>
            </View>
          )}
        />
      </ScrollView>
      <View
        style={{
          height: hp(12),
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Buttun
          onPress={() => {
            navigation.navigate('saveplaylist', { isEdit: false });
          }}
          title={`${'Nex'}`}
          style={{
            width: '58%',
          }}
        />
      </View>
    </View>
  );
};
export default Createaffirmation;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignSelf: 'center',

    marginTop: 30,
    paddingHorizontal: 10,
  },
  imageContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
    flexDirection: 'row',
  },
  image: {
    width: hp(8),
    height: hp(8),
    borderRadius: 8,
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
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
  },
});
