import React from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { heightPercent as hp, widthPrecent as wp } from '../atoms/responsive';
import { fonts } from '../../Context/Conctants';
import { FlatList } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Loader from '../Loader';

const Categores_menu = ({
  visible,
  image,
  item,
  onClose,
  onPressEdit,
  onPressListen,
  onPressDelete,
  loading,
}) => {
  const parentItem = item;
  const data = [
    {
      id: '1',
      text: 'Listen Playlist',
      icon: 'play',
    },
    {
      id: '2',
      text: !item.is_favorite ? 'like playlist' : 'Unlike playlist',
      icon: item.is_favorite ? 'heart' : 'hearto',
    },
    {
      id: '3',
      text: 'Share playlist',
      icon: 'share',
    },
  ];

  return (
    <Modal
      onRequestClose={() => {
        onClose();
      }}
      animationType="fade"
      visible={visible}
      transparent={true}
    >
      <View style={{ flex: 1, backgroundColor: '#191919', opacity: 0.99 }}>
        <Loader loading={loading} />
        <View style={{ height: '20%' }} />
        <View style={styles.card}>
          <View
            style={{
              height: hp(9),
              width: hp(9),
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: wp(2),
              overflow: 'hidden',
            }}
          >
            <Image source={image} style={{ height: '100%', width: '100%' }} />
          </View>
          <View style={{ paddingBottom: '5%' }}>
            <Text style={styles.title}>
              {item.categories_name.substring(0, 15)}...
            </Text>
            <Text
              style={[
                styles.title,
                { fontSize: wp(4), marginTop: 10, fontFamily: fonts.medium },
              ]}
            >
              {'by stumili'}
            </Text>
          </View>
        </View>
        <View style={{ paddingLeft: wp(5), paddingTop: hp(4) }}>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            contentContainerStyle={{ alignSelf: 'right', marginLeft: wp(8) }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    if (item.id == '1') {
                      onPressListen(parentItem);
                    } else if (item.id == '2') {
                      onPressEdit(parentItem);
                    } else if (item.id == '3' && onPressDelete) {
                      onPressDelete(parentItem);
                    } else {
                      console.log('onPressDelete function is missing!');
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: '5%',
                  }}
                >
                  {index == 0 || index == 1 ? (
                    <AntDesign
                      color={
                        parentItem.is_favorite && index == 1
                          ? '#B72658'
                          : 'white'
                      }
                      size={wp(7)}
                      name={item.icon}
                    />
                  ) : (
                    <Entypo
                      color={index == 2 ? '#fff' : '#B72658'}
                      size={wp(7)}
                      name={item.icon}
                    />
                  )}

                  <Text
                    style={{
                      color: 'white',
                      fontSize: wp(5),
                      marginLeft: '5%',
                      fontFamily: fonts.medium,
                    }}
                  >
                    {item.text}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <TouchableOpacity onPress={onClose} style={styles.close}>
          <Text
            style={{
              color: '#fff',
              fontSize: wp(6.5),
              fontFamily: fonts.medium,
              // fontWeight: 'bol000d',
            }}
          >
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Categores_menu;

const styles = StyleSheet.create({
  card: {
    borderWidth: 0.2,
    width: '80%',
    alignSelf: 'center',
    // paddingVertical: wp(1),
    paddingLeft: wp(1),
    backgroundColor: '#4A4949',
    borderColor: 'lightgrey',
    borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: wp(5),
    marginLeft: wp(3),
    fontFamily: fonts.bold,
    color: '#fff',
  },
  close: {
    bottom: hp(20),
    position: 'absolute',
    alignSelf: 'center',
  },
});
