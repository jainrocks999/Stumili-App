import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Clipboard,
  BackHandler,
} from 'react-native';
import Header from '../../components/molecules/Header';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Horizontal from '../../components/Home/Horizontal';
import Loader from '../../components/Loader';
import { fonts } from '../../Context/Conctants';
import storage from '../../utils/StorageService';
import SearchModal from '../../components/serachModal';
import CateGoriesModal from '../../components/Categories';
import { MusicPlayerContext } from '../../Context/MusicPlayerConstaxt';
import CircularProgress from 'react-native-circular-progress-indicator';
import PlayPopup from '../../components/PlayPopup';
const Img = [
  {
    id: '1',
    image: require('../../assets/profilepic/profile1.jpg'),
    title: 'Control Stress and Anxiety',
  },
  {
    id: '2',
    image: require('../../assets/profilepic/profile2.jpg'),
    title: 'Be a Better Friend',
  },
  {
    id: '3',
    image: require('../../assets/profilepic/profile3.jpg'),
    title: 'Liked affirmations',
  },
  {
    id: '4',
    image: require('../../assets/profilepic/profile4.jpg'),
    title: 'Billionaire Mindset',
  },
  {
    id: '5',
    image: require('../../assets/profilepic/profile5.jpg'),
    title: 'Manifest Wealth',
  },
  {
    id: '6',
    image: require('../../assets/profilepic/profile6.jpg'),
    title: 'Awaken Your Money Power',
  },
];
const HomeScreen = props => {
  const { navigation } = props;
  const { getNameImage, affirmations } = useContext(MusicPlayerContext);
  // console.log(progress);
  const dispatch = useDispatch();
  const getFavriote = item => { };
  const { groups, loading, category, playItem } = useSelector(
    state => state.home,
  );
  const [searchvisble, setSearchvisible] = useState(false);
  const getAllCategories = async () => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/playlist_request',
      token,
      url: 'playList',
      user_id: user,
    });
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  useEffect(() => {
    getplaylist();
  }, []);
  const getplaylist = async () => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];

    dispatch({
      type: 'home/category_fetch_request',
      token,
      url: 'categories',
      user_id: user,
    });
    dispatch({
      type: 'home/group_fetch_request',
      token,
      url: 'groups',
      user_id: user,
    });
  };
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
      navigation,
      url: 'affirmation',
      item,
      page: 'Playlistdetails2',
    });
  };
  const getAffetMationsbyCategories = async item => {
   
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];

    dispatch({
      type: 'home/affirmationBYCategory_request',
      token,
      user_id: user,
      navigation,
      url: 'categoryByAffermation',
      item,
      page: 'Playlistdetails2',
      category_id: item.id,
    });
  };
  const getmodified = (array, cateIndex, groupIndex, bool) => {
    return array.map((items, index) => {
      if (index === groupIndex) {
        return {
          ...items,
          groupByCategory: items.groupByCategory.map((item, idx) => {
            if (idx === cateIndex) {
              return { ...item, is_favorite: bool };
            }
            return item;
          }),
        };
      }
      return items;
    });
  };
  const [currentVisbleIndex, setCurrentVisibleIndex] = useState(-1);
  const removeFavroit = async (item, index) => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const modified = getmodified(groups, item.index, index, false);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/removeFavriout_request',
      url: 'removeFavoriteList',
      user_id: user,
      favorite_id: item.item.favorite_id,
      category_id: item.item.id,
      token,
      isCat: true,
      data: modified,
    });
  };
  const addFavorit = async (item, index) => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const modified = getmodified(groups, item.index, index, true);

    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/Createfavriote_request',
      user_id: user,
      category_id: item.item.id,
      affirmation_id: '',
      url: 'createFavoriteList',
      navigation,
      token,
      data: modified,
    });
  };
  const getFilterCategories = (id, array, isFavorite) => {
    return array.map(item =>
      item.id == id ? { ...item, is_favorite: isFavorite } : item,
    );
  };

  const addFavoriteNew = async item => {
    try {
      const items = await storage.getMultipleItems([
        storage.TOKEN,
        storage.USER_ID,
      ]);

      const token = items.find(([key]) => key === storage.TOKEN)?.[1];
      const user = items.find(([key]) => key === storage.USER_ID)?.[1];

      const modifiedCategories = getFilterCategories(
        item.item.id,
        category,
        true,
      );
      dispatch({
        type: 'home/Createfavriote_request',
        user_id: user,
        category_id: item.item.id,
        affirmation_id: '',
        url: 'createFavoriteList',
        navigation,
        token,
        data: modifiedCategories,
        categories: true,
      });
    } catch (error) {
      console.error('An error occurred while adding favorite', error);
    }
  };
  const removeFavroitNew = async item => {
    try {
      const items = await storage.getMultipleItems([
        storage.TOKEN,
        storage.USER_ID,
      ]);
      const token = items.find(([key]) => key === storage.TOKEN)?.[1];
      const user = items.find(([key]) => key === storage.USER_ID)?.[1];
      const modifiedCategories = getFilterCategories(
        item.item.id,
        category,
        false,
      );
      dispatch({
        type: 'home/removeFavriout_request',
        url: 'removeFavoriteList',
        user_id: user,
        favorite_id: item.item.favorite_id,
        category_id: item.item.id,
        token,
        isCat: true,
        data: modifiedCategories,
        categories: true,
      });
    } catch (error) {
      console.log('some error', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#191919' }}>
      <Header
        onPressSerach={() => {
          setSearchvisible(true);
        }}
        onChangeText={text => {
          console.log(text);
        }}
      />
      <SearchModal
        onClose={value => {
          setSearchvisible(value);
        }}
        visible={searchvisble}
        onCategories={item => {
          getAffetMationsbyCategories(item);
        }}
      />
      <Loader loading={loading} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View s tyle={styles.FeatureContainer}>
          <Text style={styles.Featurecategory}>Last sessions</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <FlatList
            data={Img}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.lastSestionItem}>
                <Image
                  source={item.image}
                  style={{ height: hp(8), width: hp(8), borderRadius: hp(1.5) }}
                />
                <Text
                  style={{
                    fontSize:12,
                    marginLeft: '5%',
                    fontWeight: '400',
                    fontFamily: 'Poppins-Medium',
                    color: '#ffffff',
                    width: '50%',
                  }}>
                  {item.title.substring(0, 10)}...
                </Text>
              </View>
            )}
          />
        </View>
        <CateGoriesModal
          data={category}
          loading={loading}
          visible={currentVisbleIndex == -10}
          onCLose={() => setCurrentVisibleIndex(-1)}
          title={'Just For You'}
          onCategories={items => {
            getAffetMationsbyCategories(items);
          }}
        />
        <View style={styles.FeatureContainer}>
          <Text style={styles.Featurecategory}>Just For You</Text>
          <View style={{ paddingHorizontal: '15%' }}>
            <TouchableOpacity
              onPress={() => {
                setCurrentVisibleIndex(-10);
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  fontFamily: fonts.bold,
                }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Horizontal
          onPress={items => {
            getAffetMationsbyCategories(items);
          }}
          data={category}
          onPressHeart={(val, item) => {
            !val ? addFavoriteNew(item) : removeFavroitNew(item);
          }}
        />
        <View style={styles.cardd}>
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 5, y: 0.0 }}
            locations={[0, 0.3, 0.0]}
            colors={['#B72658', '#D485D1']}
            style={styles.linearGradientt}>
            <Image
              source={require('../../assets/music1.jpg')}
              style={{ height: hp(13), width: wp(25), borderRadius: 20 }}
            />
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'center',
                width: wp(50),
                marginHorizontal: '5%',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  color: '#ffffff',
                  backgroundColor: 'transparent',
                }}>
                Share Innertunes with your loved...
              </Text>
            </View>
          </LinearGradient>
        </View>
        <CateGoriesModal
          data={category}
          loading={loading}
          visible={currentVisbleIndex == -11}
          onCLose={() => setCurrentVisibleIndex(-1)}
          title={'Populer Playlist'}
          onCategories={items => {
            getAffetMationsbyCategories(items);
          }}
        />

        <View style={styles.FeatureContainer}>
          <Text style={styles.Featurecategory}>Populer Playlist</Text>
          <View style={{ paddingHorizontal: '15%' }}>
            <TouchableOpacity
              onPress={() => {
                setCurrentVisibleIndex(-11);
              }}>
              <Text
                style={{
                  ontSize: 15,
                  color: 'white',
                  fontFamily: fonts.bold,
                }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Horizontal
          onPress={items => {
            getAffetMationsbyCategories(items);
          }}
          data={category}
          onPressHeart={(val, item) => {
            !val ? addFavoriteNew(item) : removeFavroitNew(item);
          }}
        />
{console.log("this is groups",groups)}
        <FlatList
          data={groups}
          renderItem={({ item, index }) => (
            <>
              {item.groupByCategory?.length > 0 ? (
                <>
                  <View style={styles.FeatureContainer}>
                    <CateGoriesModal
                      data={item.groupByCategory}
                      loading={loading}
                      visible={currentVisbleIndex == index}
                      onCLose={() => setCurrentVisibleIndex(-1)}
                      title={item.group_name}
                      onCategories={items => {
                        getAffetMationsbyCategories(items);
                      }}
                    />

                    <Text style={styles.Featurecategory}>
                      {item?.group_name}
                    </Text>
                    <View style={{ paddingHorizontal: '15%' }}>
                      <TouchableOpacity
                        onPress={() => {
                          setCurrentVisibleIndex(index);
                        }}>
                        <Text
                          style={{
                            ontSize: 15,
                            color: 'white',
                            fontFamily: fonts.bold,
                          }}>
                          View All
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Horizontal
                    onPressHeart={(val, items) => {
                      val
                        ? removeFavroit(items, index)
                        : addFavorit(items, index);
                    }}
                    onPress={items => {
                      getAffetMationsbyCategories(items);
                    }}
                    data={item.groupByCategory}
                  />
                </>
              ) : null}
              {index == 1 ? (
                <View
                  style={{
                    width: wp(100),
                    justifyContent: 'space-around',
                    marginVertical: 10,
                  }}>
                  <View style={styles.card}>
                    <TouchableOpacity>
                      <LinearGradient
                        start={{ x: 0.0, y: 0.0 }}
                        end={{ x: 5, y: 0.0 }}
                        locations={[0, 0.5, 0.3]}
                        colors={['#191919', '#89FFBF']}
                        style={styles.linearGradient}>
                        <Image
                          source={require('../../assets/review.jpg')}
                          style={{
                            height: hp(30),
                            width: wp(40),
                            borderRadius: 20,
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'column',
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            width: wp(35),
                            marginHorizontal: '5%',
                            bottom: hp(2),
                          }}>
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: '600',
                              color: '#ffffff',
                              backgroundColor: 'transparent',
                            }}>
                            Leave us review...
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <LinearGradient
                        start={{ x: 0.0, y: 0.0 }}
                        end={{ x: 5, y: 0.0 }}
                        locations={[0, 0.5, 0.3]}
                        colors={['#191919', '#89FFBF']}
                        style={styles.linearGradient}>
                        <Image
                          source={require('../../assets/music1.jpg')}
                          style={{
                            height: hp(30),
                            width: wp(40),
                            borderRadius: 20,
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'column',
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            width: wp(35),
                            marginHorizontal: '5%',
                            bottom: hp(2),
                          }}>
                          <Text
                            style={{
                              fontSize: 15,
                              color: '#ffffff',
                              backgroundColor: 'transparent',
                              fontFamily: fonts.bold,
                            }}>
                            Share Innertunes with your loved...
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </>
          )}
        />
      </ScrollView>
      {affirmations?.length > 0 && getNameImage().name != '' ? (
       
        <PlayPopup />
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: hp(5),
    width: wp(10),
  },
  FeatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: wp(100),
    height: hp(6.5),
  },
  Featurecategory: {
    fontSize: wp(5),
    width: wp(60),
    fontWeight: '400',
    fontFamily: fonts.bold,
    color: 'white',
    paddingHorizontal: 10,
  },
  scrollView: { paddingBottom: hp(2), paddingRight:5 },
  imageContainer: {
    padding: 12,
  },
  image: {
    width: hp(30),
    height: hp(20),
    resizeMode: 'stretch',
    borderRadius: 20,
  },

  linearGradient: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 20,
  },

  text: {
    width: wp(50),
    marginLeft: 5,
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
  },
  textttt: {
    width: wp(60),
    marginTop: 10,
    marginLeft: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  text2: {
    width: wp(50),
    marginLeft: 5,
    color: 'black',
    fontSize: 15,
    fontWeight: '300',
  },
  card: {
    height: hp(30),

    width: wp(40),
    borderColor: 'black',

    flexDirection: 'row',
    borderRadius: 20,
  },
  linearGradient: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  linearGradientt: {
    flexDirection: 'row',
    width: wp(90),
    borderRadius: 20,
  },
  linearGradienttt: {
    flexDirection: 'row',
    width: wp(45),
    borderRadius: 20,
  },
  cardd: {
    height: hp(13),
    width: wp(100),
    left: wp(4),
    marginVertical: hp(4),
    borderColor: 'black',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    marginBottom: 20,
  },
  carddd: {
    height: hp(8),
    width: wp(45),
    borderColor: 'black',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: 'black',
    margin: 10,
  },
  lastSestionItem: {
    width: '46%',
    marginHorizontal: '2%',
    marginVertical: '2%',
    backgroundColor: '#4A4949',
    borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: '2%',
  },
});

export default HomeScreen;
