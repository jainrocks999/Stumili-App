import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Clipboard,
} from 'react-native';
import { FlatList } from 'react-native';
import { widthPrecent as wp } from '../../components/atoms/responsive';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts } from '../../Context/Conctants';
import { NavigationContext } from '@react-navigation/native';
import storage from '../../utils/StorageService';

const Horizontal = ({ data, onPress, onPressHeart }) => {
  const { Createfavriote } = useSelector(state => state.home);

  const dispatch = useDispatch();
  const navigation = React.useContext(NavigationContext);

  return (
    <FlatList
      horizontal={true}
      data={data}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => {
        let title = 'Believe in yourself';

        let image =
          item?.caetgory_images ??
          'https://img.freepik.com/free-photo/outdoor-adventurers-hiking-towards-mountain-peak-sunrise-silhouette-generated-by-ai_188544-30928.jpg';
        title = item?.categories_name;

        return (
          <TouchableOpacity onPress={() => onPress(item)} style={styles.main}>
            <Icon
              onPress={() => {
                onPressHeart(item.is_favorite, { item, index: index });
              }}
              style={{ position: 'absolute', zIndex: 1, left: 20, top: 10 }}
              name={item.is_favorite ? 'heart-fill' : 'heart'}
              color={item.is_favorite ? '#B72658' : 'white'}
              size={20}
            />
            <View style={styles.container}>
              <Image
                style={{ height: '100%', width: '100%' }}
                source={{ uri: image }}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    marginHorizontal: wp(2.5),
  },
  container: {
    height: wp(43),
    width: wp(43),
    overflow: 'hidden',
    borderRadius: wp(5),
  },
  title: {
    color: 'white',
    marginTop: wp(2),
    fontSize: wp(4.5),
    width: wp(43),
    marginLeft: wp(4),
    fontFamily: fonts.regular,
  },
});

export default Horizontal;
