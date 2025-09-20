import React, {useRef, useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated as Animated2,
  ScrollView,
} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
const affirmations = [
  {
    title: 'You are capable of achieving great things',
    description:
      'Believe in yourself and your abilities. You have the potential to accomplish your goals and dreams.',
    image_url:
      'https://img.freepik.com/free-photo/man-jumping-impossible-possible-cliff-sunset-background-business-concept-idea_1323-266.jpg',
  },
  {
    title: 'Every challenge is an opportunity for growth',
    description:
      'Embrace challenges as opportunities to learn and grow. With every challenge you overcome, you become stronger and more resilient.',
    image_url:
      'https://www.shutterstock.com/shutterstock/photos/430299556/display_1500/stock-photo-business-concept-young-businessman-pushing-large-stone-uphill-with-copy-space-430299556.jpg',
  },
  {
    title: 'You are deserving of love and happiness',
    description:
      'Remember that you are worthy of love and happiness. Treat yourself with kindness and compassion.',
    image_url:
      'https://img.freepik.com/free-photo/person-practicing-yoga-meditation-outdoors-nature_23-2150838348.jpg',
  },
  {
    title: 'Your potential is limitless',
    description:
      'There are no limits to what you can achieve. Keep pushing yourself to reach new heights and explore your full potential.',
    image_url:
      'https://img.freepik.com/free-photo/relaxed-woman-enjoying-sea_1098-1441.jpg',
  },
  {
    title: 'You are making progress every day',
    description:
      'Even small steps forward are meaningful. Celebrate your progress and keep moving forward with determination.',
    image_url:
      'https://img.freepik.com/free-photo/outdoor-adventurers-hiking-towards-mountain-peak-sunrise-silhouette-generated-by-ai_188544-30928.jpg',
  },
];

const Welecome = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated2.Value(0)).current;
  const flatListRef = useRef(null);
  const ITEM_WIDTH = wp(100);

  useEffect(() => {
    const listenerId = scrollX.addListener(({value}) => {
      const index = Math.round(value / ITEM_WIDTH);
      setCurrentIndex(index);
    });

    return () => {
      scrollX.removeListener(listenerId);
    };
  }, []);

  const onViewableItemsChanged = React.useRef(({viewableItems}) => {
    // Getting the index of the first viewable item
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const onNextPress = () => {
    if (currentIndex !== affirmations.length - 1) {
      const nextIndex = (currentIndex + 1) % affirmations.length;

      flatListRef.current.scrollToIndex({Animated2: true, index: nextIndex});
      setCurrentIndex(nextIndex);
    } else {
      navigation.navigate('ChooseAfferamtion');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <AntDesign
          name="arrowleft"
          size={25}
          color="white"
          style={{margin: '5%'}}
        />
        <Image
          style={{
            marginTop: '2%',
            height: 50,
            width: 50,
            // alignSelf: 'flex-end',
            marginRight: '5%',
          }}
          source={require('../../assets/logo/stimuili-logos1-.png')}
        />
      </View>
      <Text style={[styles.txt, {marginTop: '2%'}]}>
        Let's Personalize Your experience
      </Text>
      {/* <Text style={styles.txt}></Text> */}
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={{height: hp(82), marginTop: '8%'}}>
        <FlatList
          scrollEventThrottle={1}
          data={affirmations}
          ref={flatListRef}
          pagingEnabled
          renderItem={({item, index}) => {
            return currentIndex == index ? (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                style={[styles.listContianer]}>
                <LinearGradient
                  start={{x: 1, y: 0}}
                  end={{x: 1, y: 1}}
                  locations={[0, 0.5, 1]}
                  colors={[
                    '#191919',
                    'rgba(0, 0, 0, 0.5)',
                    'rgba(0, 0, 0, 00)',
                  ]}
                  style={[styles.gradient, {top: 0}]}
                />
                <Image
                  //resizeMode="stretch"
                  style={{height: '100%', width: '100%'}}
                  source={{uri: item.image_url}}
                />
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  locations={[-1, 0.2, 0.8]}
                  colors={[
                    'rgba(0, 0, 0, 00)',
                    'rgba(0, 0, 0, 0.7)',
                    '#191919',
                  ]} // Adjust alpha for transparency
                  style={[styles.gradient]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '14%',
                    }}>
                    <Text style={styles.txt2}>
                      {item.title.substring(0, 15)}....
                    </Text>
                    <View style={{flexDirection: 'row', marginRight: '0%'}}>
                      {[1, 2, 3, 4, 5].map(() => {
                        return (
                          <AntDesign
                            name="star"
                            style={{marginLeft: '2%'}}
                            color="yellow"
                            size={22}
                          />
                        );
                      })}
                    </View>
                  </View>
                  <Text style={styles.txt3}>{item.description}</Text>
                </LinearGradient>
              </Animated.View>
            ) : (
              <View style={{height: hp(82)}}></View>
            );
          }}
          onViewableItemsChanged={onViewableItemsChanged.current}
        />
        <View style={{position: 'absolute', right: '5%', top: '15%'}}>
          <FlatList
            data={affirmations}
            renderItem={({item, index}) => {
              return (
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        index == currentIndex ? '#B72658' : 'lightgrey',
                    },
                  ]}></View>
              );
            }}
          />
        </View>
      </Animated.View>
      <TouchableOpacity
        onPress={onNextPress}
        style={[
          styles.nextBtn,
          {
            height: currentIndex == affirmations.length - 1 ? hp(6) : hp(7),
            width: currentIndex == affirmations.length - 1 ? '60%' : hp(7),
            borderRadius:
              currentIndex !== affirmations.length - 1 ? hp(3.5) : 12,
            overflow: 'hidden',
          },
        ]}>
        <LinearGradient
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          start={{x: 0.0, y: 0.0}}
          end={{x: 5, y: 0.0}}
          locations={[0, 0.4, 0.2]}
          colors={['#B72658', '#D485D1']}>
          {currentIndex == affirmations.length - 1 ? (
            <Text
              style={{color: 'white', fontSize: wp(5.5), fontWeight: '400'}}>
              {'Get Started'}
            </Text>
          ) : (
            <Entypo name="chevron-right" size={30} color={'white'} />
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Welecome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
    // alignItems: 'center',
    // marginLeft: '2%',
  },
  txt: {
    color: 'white',
    fontSize: wp(6),
    fontWeight: '500',
    zIndex: 1,
    marginLeft: '3%',
  },
  listContianer: {
    backgroundColor: '#fff',
    width: wp(100),
    height: hp(82),
    // borderWidth: 5,
  },
  gradient: {
    position: 'absolute',

    bottom: 0,
    // borderRadius: 10, // if you want to add rounded corners
    zIndex: 3,
    height: '40%',
    width: '100%',
  },
  txt2: {
    color: 'white',
    marginLeft: '2%',
    marginTop: '2%',
    fontSize: wp(6),
  },
  txt3: {
    color: 'white',
    fontSize: wp(4),
    marginLeft: '2%',
  },
  dot: {
    backgroundColor: 'grey',
    height: hp(5),
    width: hp(0.6),
    borderRadius: hp(1.5),
    marginVertical: '15%',
  },
  nextBtn: {
    alignSelf: 'center',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 1,
    bottom: hp(3),
  },
});
