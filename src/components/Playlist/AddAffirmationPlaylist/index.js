import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  PanResponder,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {heightPercent as hp, widthPrecent as wp} from '../../atoms/responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import {fonts} from '../../../Context/Conctants';
import Buttun from '../../../screens/Auth/compoents/Buttun';
import CheckCircle from './Animatecicle';
import storage from '../../../utils/StorageService';
import Loader from '../../Loader';
const FullScreenModal = ({visible, onClose, loading, id}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const {playlist, paly} = useSelector(state => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);
  useEffect(() => {
    onClose();
  }, [paly]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(1 - gestureState.dy / 300);
          console.log('kmdfdfpofpo', gestureState);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 150) {
          onClose(onClose);
        } else {
          Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const slideIn = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const dummyData = Array.from({length: 5}, (_, index) => ({
    id: index.toString(),
    title: `Item ${index + 1}`,
  }));
  const [selectedIndex, setSelcteIndex] = useState({id: -1});
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <Loader loading={loading} />
        <Animated.View
          style={[styles.modalContent, {transform: [{translateY: slideIn}]}]}
          {...panResponder.panHandlers}>
          <View style={styles.handle} />

          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.buttonText}>Create Playlist</Text>
            </TouchableOpacity>
          </View> */}
          <Buttun
            style={styles.buttonContainer}
            title={'Create new Playlist'}
          />
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <FlatList
              data={playlist[0].playlist}
              keyExtractor={item => item?.id}
              scrollEnabled={false}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      // getPlayListItem(item);
                    }}>
                    <View style={styles.imageeContainer}>
                      <View
                        style={{
                          justifyContent: 'center',
                          height: hp(8),
                          width: wp(16),
                          alignItems: 'center',
                          borderRadius: wp(2),
                          backgroundColor: 'white',
                        }}>
                        <Image
                          source={require('../../../assets/playlist.png')}
                          style={styles.image}
                          tintColor={'#B72658'}
                        />
                      </View>
                      {/* </LinearGradient> */}
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginHorizontal: hp(2.5),
                        }}>
                        <Text style={styles.text}>{item.title}</Text>
                        <Text style={styles.text2}>{item.description}</Text>
                      </View>
                      <View
                        style={{justifyContent: 'center', paddingRight: 20}}>
                        <CheckCircle
                          size={wp(8)}
                          strokeWidth={wp(1)}
                          duration={1000}
                          item={item}
                          checked={selectedIndex.id == item.id}
                          onPress={() => setSelcteIndex(item)}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>
          <View style={styles.bottomButtonContainer}>
            {/* <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity> */}
            <Buttun
              onPress={async () => {
                const token = await storage.getItem(storage.TOKEN);
                dispatch({
                  type: 'home/add_playlistItem_request',
                  playlist_id: selectedIndex.id,
                  affirmation_id: [id],
                  url: 'createPlayListItem',
                  token,
                });
              }}
              style={styles.saveButton}
              title={'Save'}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#42dd5e9',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'black',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '95%', // Full-screen height
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    height: hp(7.5),
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: wp(8),
    marginTop: '10%',
  },
  createButton: {
    height: '100%',
    width: '100%',
    backgroundColor: '#dbed7b',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    flexGrow: 0,
    marginBottom: 20,
  },
  listItem: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 10,
  },
  listItemText: {
    fontSize: 16,
  },
  bottomButtonContainer: {
    height: hp(7.5),
    width: '40%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  saveButton: {
    height: '100%',
    width: '100%',
    backgroundColor: '#dbed7b',
    borderRadius: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageeContainer: {
    marginVertical: hp(1.5),
    justifyContent: 'space-around',
    width: wp(90),
    flexDirection: 'row',
  },
  image: {
    width: hp(4),
    height: hp(4),
    borderRadius: 30,
  },
  text: {
    width: wp(50),
    color: 'white',
    fontSize: hp(2),
    fontWeight: '500',
    fontFamily: fonts.bold,
  },
  text2: {
    width: wp(50),
    top: 3,
    color: 'white',
    fontSize: hp(1.8),
    fontWeight: '300',
    fontFamily: fonts.medium,
  },
});

export default FullScreenModal;
