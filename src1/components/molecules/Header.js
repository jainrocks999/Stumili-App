import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { heightPercent as hp, widthPrecent as wp } from '../atoms/responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../Context/Conctants';
const Header = ({ placeholder, onChangeText, onPressSerach }) => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const handleClear = () => {
    setText;
    onChangeText;
  };

  return (
    <View style={styles.container}>
      <View
      // onPress={() => {
      //   navigation.navigate('goal');
      // }}
      >
        <Image
          source={require('../../assets/logo/stimuili-logos1-.png')}
          style={{
            height: hp(5.5),
            width: hp(5.5),
            marginRight: 15,
            borderRadius: hp(3.25),
            // tintColor: 'white',
          }}
        />
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressSerach}
        style={styles.inputContainer}
      >
        <AntDesign name="search1" size={20} color="black" />
        <TextInput
          editable={false}
          placeholder="Search"
          placeholderTextColor="black"
          style={styles.input}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  searchContainer: {},
  input: {
    marginLeft: 10,
    width: wp(50),
    color: 'black',
    fontFamily: fonts.medium,
  },
  inputContainer: {
    height: hp(5.5),
    borderWidth: wp(0.1),
    borderColor: 'grey',
    width: '80%',
    borderRadius: wp(7),
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: '5%',
    backgroundColor: 'white',
  },
  container: {
    height: hp(10),
    width: '100%',
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default Header;
{
  /*    <View
      style={{
        height: hp(10),
        width: '100%',
        backgroundColor: '#191919',
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('goal');
        }}>
        <Image
          source={require('../../assets/logo/stimuili-logos1-.png')}
          style={{
            height: hp(7),
            width: hp(7),
            marginRight: 15,
            borderRadius: hp(3.5),
            // tintColor: 'white',
          }}
        />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color="white" />
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
            color="grey"
            onPress={handleClear}
          />
        )}
      </View>
    </View>*/
}
