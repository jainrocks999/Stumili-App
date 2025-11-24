import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Buttun from '../../Auth/compoents/Buttun';
import Loader from '../../../components/Loader';
import { fonts } from '../../../Context/Conctants';
import { SafeAreaView } from 'react-native-safe-area-context';
// import {affirmations} from '../affmatin';
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
const Createplaylist = () => {
  const { affirmations, loading, addetItems_to_playlist } = useSelector(
    state => state.home,
  );
  useEffect(() => {
    setSelected(addetItems_to_playlist);
  }, [addetItems_to_playlist]);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [selected, setSelected] = useState([]);
  const hanleSelected = id => {
    console.log(id);
    let newarray = [];
    if (selected.includes(id)) {
      const filter = [...selected].filter(item => item != id);
      newarray = [...filter];
    } else {
      newarray = [...selected, id];
    }
    setSelected(newarray);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#191919' }}>
      <Loader loading={loading} />
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
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
            }
            name="arrow-back"
            size={30}
            color="white"
          />
        </View>
        <View style={{ height: hp(5), width: wp(100) }}>
          <Text
            style={{
              fontSize: hp(2.5),
              fontWeight: '600',
              marginHorizontal: '15%',
              marginLeft: '8%',
              // fontFamily: 'Montserrat-SemiBold',
              fontFamily: fonts.bold,
              color: 'white',
            }}
          >
            Create Your Playlis
          </Text>
        </View>
      </View>
      {/* <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="grey"
          value={text}
          onChangeText={value => {
            setText(value);
            onChangeText(value);
          }}
        />
        {text.length > 0 && (
          <AntDesign
            name="close"
            size={20}
            color="gray"
            onPress={handleClear}
          />
        )}
      </View> */}
      <ScrollView
        contentContainerStyle={{
          marginTop: 20,
          alignItems: 'center',
          paddingBottom: hp(4),
        }}
      >
        <FlatList
          data={affirmations}
          keyExtractor={item => item.id}
          scrollEnabled={false}
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
                {item.affirmation_text.substring(0, 35)}
              </Text>

              <View style={{ justifyContent: 'center' }}>
                <AntDesign
                  onPress={() => {
                    hanleSelected(item.id);
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
        }}
      >
        <Buttun
          onPress={() => {
            dispatch({
              type: 'home/Add_item_to_Create_Playlist',
              payload: selected,
            });
            navigation.navigate('createaffirmation', { selected: [] });
          }}
          title={`${'Added Affirmations '}${selected.length}`}
          style={{
            width: '68%',
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default Createplaylist;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: 30,
    paddingHorizontal: 10,

    elevation: 5,
    width: wp(70),
    height: hp(5),
  },
  text: {
    // width: wp(50),
    fontFamily: fonts.regular,
    marginLeft: 5,
    color: '#fff',
    fontSize: wp(4),
  },
  input: {
    marginLeft: 10,
    width: wp(50),
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
    marginHorizontal: 10,
  },
});
