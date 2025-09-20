// import React from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   ScrollView,
//   View,
//   SafeAreaView,
// } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {
//   heightPercent as hp,
//   widthPrecent as wp,
// } from '../../components/atoms/responsive';
// import {FlatList} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {fonts} from '../../Context/Conctants';
// import Buttun from '../Auth/compoents/Buttun';

// const images = [
//   {
//     title: 'Get Over Your Fear ',
//     path: require('../../assets/Intrested/icon1.png'),
//   },
//   {
//     title: 'Get Higher Self Love',
//     path: require('../../assets/Intrested/icon2.png'),
//   },
//   {
//     title: 'Get Our an Addiction',
//     path: require('../../assets/Intrested/icon3.png'),
//   },
//   {title: 'Get More Health', path: require('../../assets/Intrested/icon4.png')},
//   {
//     title: 'Get More Motivation',
//     path: require('../../assets/Intrested/icon5.png'),
//   },
//   {
//     title: 'Get More Confidence',
//     path: require('../../assets/Intrested/icon6.png'),
//   },
//   {
//     title: 'Get More Happiness',
//     path: require('../../assets/Intrested/icon7.png'),
//   },
//   {
//     title: 'Get More Aboundence',
//     path: require('../../assets/Intrested/icon8.png'),
//   },
// ];

// const Intrested = () => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.container}>
//       <SafeAreaView style={{flex: 1}}>
//         <ScrollView nestedScrollEnabled>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}>
//             <AntDesign
//               onPress={() => {
//                 navigation.goBack();
//               }}
//               name="arrowleft"
//               size={25}
//               color="white"
//               style={{marginLeft: '5%'}}
//             />
//             <Text style={styles.headerTitle}>Welecome to stimuli</Text>
//             <Image
//               style={{
//                 marginTop: '2%',
//                 height: 50,
//                 width: 50,
//                 marginRight: '5%',
//               }}
//               source={require('../../assets/logo/stimuili-logos1-.png')}
//             />
//           </View>
//           <View style={{marginTop: '10%'}}>
//             <Text
//               style={{
//                 marginLeft: wp(3),
//                 width: '80%',
//                 color: 'white',
//                 fontSize: wp(4.5),
//                 fontWeight: '500',
//                 fontFamily: fonts.medium,
//               }}>
//               What are your Intrest
//             </Text>
//             <Text
//               style={{
//                 fontSize: wp(3.5),
//                 width: '95%',
//                 textAlign: 'left',
//                 marginLeft: wp(3),
//                 marginTop: '1%',
//                 color: 'white',
//                 fontFamily: fonts.medium,
//               }}>
//               You are capable, resilient, and worthy of all the good things life
//               offers. Your unique qualities shine brightly, guiding you towards
//               success and fulfillment.
//             </Text>
//           </View>
//           <View style={{width: '100%', alignItems: 'center', marginTop: '8%'}}>
//             <FlatList
//               data={images}
//               numColumns={3}
//               keyExtractor={item => item.title}
//               renderItem={({item, index}) => (
//                 <View
//                   style={{
//                     alignItems: 'center',
//                     width: wp(25),
//                     paddingBottom: '-5%',
//                     marginHorizontal: wp(2.5),
//                   }}>
//                   <View style={styles.item}>
//                     <Image
//                       style={{height: '50%', width: '50%'}}
//                       source={item.path}
//                       resizeMode="contain"
//                     />
//                   </View>
//                   <Text style={styles.itemTitle}>
//                     {item.title.substring(0, 16)}
//                   </Text>
//                 </View>
//               )}
//             />
//           </View>
//           <Buttun
//             style={{
//               alignSelf: 'center',
//               width: '60%',
//             }}
//             title={'Next'}
//             onPress={() => {
//               navigation.reset({index: 0, routes: [{name: 'Home'}]});
//             }}
//           />
//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   );
// };

// export default Intrested;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#191919',
//   },
//   headerTitle: {
//     color: '#FFF',
//     // marginLeft: '-21%',
//     fontSize: wp(5),
//     fontFamily: fonts.bold,
//   },
//   item: {
//     width: wp(22),
//     height: wp(22),
//     backgroundColor: '#fff',

//     marginVertical: hp(2),
//     elevation: 4,
//     borderRadius: wp(2),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   itemTitle: {
//     fontSize: wp(3),
//     color: 'white',
//     textAlign: 'center',
//     width: '80%',
//     marginTop: '-8%',
//     fontFamily: fonts.medium,
//   },
//   nextBtn: {
//     alignSelf: 'center',
//     zIndex: 1,
//     position: 'absolute',
//     height: hp(6),
//     width: wp(50),
//     elevation: 4,
//     borderRadius: 5,
//     overflow: 'hidden',
//     bottom: hp(-12),
//   },
// });
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../Context/Conctants';
import Buttun from '../Auth/compoents/Buttun';

const BUTTON_COLOR = '#D485D1'; 

const images = [
  { title: 'Get Over Your Fear', path: require('../../assets/Intrested/icon1.png') },
  { title: 'Get Higher Self Love', path: require('../../assets/Intrested/icon2.png') },
  { title: 'Get Over an Addiction', path: require('../../assets/Intrested/icon3.png') },
  { title: 'Get More Health', path: require('../../assets/Intrested/icon4.png') },
  { title: 'Get More Motivation', path: require('../../assets/Intrested/icon5.png') },
  { title: 'Get More Confidence', path: require('../../assets/Intrested/icon6.png') },
  { title: 'Get More Happiness', path: require('../../assets/Intrested/icon7.png') },
  { title: 'Get More Abundance', path: require('../../assets/Intrested/icon8.png') },
];

const Interested = () => {
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelection = (title) => {
    setSelectedItems(prev =>
      prev.includes(title) ? prev.filter(item => item !== title) : [...prev, title]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView nestedScrollEnabled>
          <View style={styles.header}>
            <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={25} color="white" />
            <Text style={styles.headerTitle}>Welcome to Stimuli</Text>
            <Image style={styles.logo} source={require('../../assets/logo/stimuili-logos1-.png')} />
          </View>
          <View style={styles.intro}>
            <Text style={styles.title}>What are your Interests?</Text>
            <Text style={styles.subtitle}>
              You are capable, resilient, and worthy of all the good things life offers. 
              Your unique qualities shine brightly, guiding you toward success and fulfillment.
            </Text>
          </View>
          <View style={styles.listContainer}>
          <FlatList
  data={images}
  numColumns={3}
  keyExtractor={item => item.title}
  renderItem={({ item }) => {
    const isSelected = selectedItems.includes(item.title);
    return (
      <TouchableOpacity onPress={() => toggleSelection(item.title)}>
        <View style={[styles.item, isSelected && styles.selectedItem]}>
          <Image style={styles.icon} source={item.path} resizeMode="contain" />
        </View>
        <Text style={styles.itemTitle}>{item.title.substring(0, 16)}</Text>
      </TouchableOpacity>
    );
  }}
/>

          </View>
          <Buttun
            style={styles.nextBtn}
            title={'Next'}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Interested;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: wp(5),
    fontFamily: fonts.bold,
  },
  logo: {
    marginTop:wp(5),
    height: 50,
    width: 50,
  },
  intro: {
    marginTop: '10%',
    marginLeft: wp(3),
  },
  title: {
    color: 'white',
    fontSize: wp(4.5),
    fontWeight: '500',
    fontFamily: fonts.medium,
  },
  subtitle: {
    fontSize: wp(3.5),
    width: '95%',
    textAlign: 'left',
    marginTop: '1%',
    color: 'white',
    fontFamily: fonts.medium,
  },
  listContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: '8%',
  },
  item: {
    width: wp(22),
    height: wp(22),
    backgroundColor: '#fff', 
    marginVertical: hp(2),
    elevation: 4,
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,  
    borderColor: 'white',
  },
  icon: {
    height: '50%',
    width: '50%',
  },
  itemTitle: {
    fontSize: wp(3),
    color: 'white',
    textAlign: 'center',
    width: '80%',
    marginTop: '-8%',
    fontFamily: fonts.medium,
  },
  nextBtn: {
    alignSelf: 'center',
    width: '60%',
  },
  selectedItem: {
    borderColor: BUTTON_COLOR,  // Change only border color when selected
  },
});
