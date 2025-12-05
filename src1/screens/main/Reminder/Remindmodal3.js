import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import Modal2 from '../../../components/molecules/Modal2';
const Img = [
  {
    id: '1',

    title: 'M  ',
  },
  {
    id: '2',

    title: 'T ',
  },
  {
    id: '3',

    title: 'W ',
  },
  {
    id: '4',

    title: 'T ',
  },
  {
    id: '5',

    title: 'F  ',
  },
  {
    id: '6',

    title: 'S ',
  },
  {
    id: '7',

    title: 'S',
  },
];
const Remindmodal3 = () => {
  const [selectedDay, setSelectedDay] = useState([]);
  const handleSelectedDay = items => {
   
    if (selectedDay.includes(items.id)) {
      const filter = [...selectedDay].filter((item, index) => item != items.id);
      console.log(filter);
      setSelectedDay(filter);
    } else {
      setSelectedDay([...selectedDay, items.id]);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: hp(2),
        }}>
        <Text style={{fontSize: hp(2.5), fontWeight: '500', color: 'white'}}>
          Daily Practice
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: hp(7),
          paddingHorizontal: wp(8),
          // borderTopWidth:1,
          // borderBottomWidth:1,
          // borderTopColor:'grey',
          // borderBottomColor:'grey',
          height: hp(7),
        }}>
        <Text style={{color: 'white', fontSize: hp(2)}}> When </Text>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: hp(3),
              width: wp(6),
              backgroundColor: '#426e56',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 20}}> - </Text>
          </View>
          <Text style={{color: 'white', fontSize: 20, marginHorizontal: wp(3)}}>
            9:00
          </Text>
          <View
            style={{
              height: hp(3),
              width: wp(6),
              backgroundColor: '#426e56',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 20}}> + </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: hp(7),
          paddingHorizontal: wp(8),
        }}>
        <Text style={{color: 'white', fontSize: hp(2)}}> Repeat </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: hp(2),
        }}>
        <FlatList
          data={Img}
          horizontal
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                handleSelectedDay(item);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                justifyContent: 'center',
                marginHorizontal: wp(1),
                height: hp(5),
                width: hp(5),
                backgroundColor: selectedDay.includes(item.id)
                  ? '#426e56'
                  : 'white',
                borderRadius: 50,
              }}>
              <Text
                style={[
                  styles.text,
                  {
                    color: selectedDay.includes(item.id) ? 'white' : 'black',
                    left: 2,
                  },
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{alignSelf: 'center', bottom: hp(6), position: 'absolute'}}>
        <TouchableOpacity
          style={{
            height: 45,
            marginLeft: 20,
            backgroundColor: '#426e56',
            alignItems: 'center',
            justifyContent: 'center',
            width: wp(60),
            borderRadius: 10,
          }}
          // onPress={() => {
          //   navigation.navigate('saveplaylist');
          // }}
        >
          <Text style={styles.loginText}>Create</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Remindmodal3;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: hp(2),
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
  },
});
