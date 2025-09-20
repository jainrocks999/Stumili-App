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
const Remindmodal5 = () => {
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
          Affirmations
        </Text>
      </View>

      <View
        style={{
          height: hp(20),
          width: wp(70),
          backgroundColor: 'black',
          borderRadius: 20,
          alignSelf: 'center',
          flexDirection: 'column',

          alignItems: 'center',
          marginTop: '10%',
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: hp(5),
              width: wp(10),
              backgroundColor: '#426e56',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: hp(4)}}> - </Text>
          </View>
          <Text style={{color: 'white', fontSize: 50}}> 7x </Text>
          <View
            style={{
              height: hp(5),
              width: wp(10),
              backgroundColor: '#426e56',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: hp(3)}}> + </Text>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={{color: 'white', fontSize: hp(1.5)}}> How many </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: hp(5),
          paddingHorizontal: wp(8),
        }}>
        <Text style={{color: 'white', fontSize: hp(2)}}>
          {' '}
          Select the playlist{' '}
        </Text>
        <Text style={{color: 'white', fontSize: hp(2)}}> General </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: hp(7),
          paddingHorizontal: wp(8),
        }}>
        <Text style={{color: 'white', fontSize: hp(2)}}> Start at </Text>
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
            09:00
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
        <Text style={{color: 'white', fontSize: hp(2)}}> Finish at </Text>
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
            20:00
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
                width: wp(10),
                backgroundColor: selectedDay.includes(item.id)
                  ? '#426e56'
                  : 'white',
                borderRadius: 50,
              }}>
              <Text
                style={[
                  styles.text,
                  {color: selectedDay.includes(item.id) ? 'white' : 'black'},
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{alignSelf: 'center', top: hp(6)}}>
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
          <Text style={styles.loginText}>Close</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Remindmodal5;

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
