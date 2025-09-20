import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../atoms/responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const Header2 = ({placeholder, onChangeText,}) => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const handleClear = () => {
    setText;
    onChangeText;
  };
  return (
    <View
      style={{
        height: hp(10),
        width: '100%',
        backgroundColor: '#191919',
       
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back"
        size={30}
        color="white"
      />

      <View style={styles.searchContainer}>
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
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginHorizontal: 40,
  borderWidth:.2,
  borderColor:'grey',
    width: wp(70),
    height: hp(5),
  },
  input: {
    marginLeft: 10,
    width: wp(50),
  },
});
export default Header2;
