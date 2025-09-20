// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {
//   widthPrecent as wp,
//   heightPercent as hp,
// } from '../../components/atoms/responsive';
// import LinearGradient from 'react-native-linear-gradient';
// import {fonts} from '../../Context/Conctants';
// const affirmations = [
//   {id: 1, text: 'I am worthy of love and respect, just as I am.'},
//   {
//     id: 2,
//     text: 'Every challenge I face is an opportunity for growth and learning.',
//   },
//   {
//     id: 3,
//     text: 'I am grateful for the abundance in my life, and more blessings are on their way.',
//   },
//   {
//     id: 4,
//     text: 'I trust in my ability to overcome obstacles and achieve my goals.',
//   },
//   {
//     id: 5,
//     text: 'I am surrounded by positivity, and I radiate positivity in return.',
//   },
//   {
//     id: 6,
//     text: 'I am deserving of success, and I attract success into my life effortlessly.',
//   },
//   {
//     id: 7,
//     text: 'I forgive myself for past mistakes and release any lingering negativity.',
//   },
//   {
//     id: 8,
//     text: 'I am filled with confidence, and I trust in my own inner wisdom.',
//   },
//   {id: 9, text: 'I am at peace with who I am, and I embrace my uniqueness.'},
//   {
//     id: 10,
//     text: 'I am the architect of my destiny, and I create a life filled with joy and fulfillment.',
//   },
// ];

// const ChooseAfferamtion = ({navigation}) => {
//   return (
//     <View style={styles.container}>
//       <SafeAreaView style={{flex: 1}}>
//         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//           <AntDesign
//             onPress={() => {
//               navigation.goBack();
//             }}
//             name="arrowleft"
//             size={25}
//             color="white"
//             style={{margin: '5%'}}
//           />
//           <Image
//             style={{
//               marginTop: '2%',
//               height: 50,
//               width: 50,
//               // alignSelf: 'flex-end',
//               marginRight: '5%',
//             }}
//             source={require('../../assets/logo/stimuili-logos1-.png')}
//           />
//         </View>
//         <Text style={[styles.txt, {marginTop: '2%'}]}>
//           What best describes your positive affirmation practice?
//         </Text>
//         <View style={{marginTop: '6%', alignItems: 'center', width: '100%'}}>
//           <FlatList
//             data={affirmations.slice(0, 7)}
//             keyExtractor={item => item.id.toString()}
//             renderItem={({item, index}) => (
//               <View style={styles.listContainer}>
//                 <Text style={styles.txt2}>{item.text}</Text>
//               </View>
//             )}
//           />
//         </View>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('AksReminder')}
//           style={[styles.nextBtn]}>
//           <LinearGradient
//             style={{
//               height: '100%',
//               width: '100%',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//             start={{x: 1.4, y: 0}}
//             end={{x: 0, y: 1}}
//             locations={[0, 1]}
//             colors={['#D485D1', '#B72658']}>
//             <Text
//               style={{color: 'white', fontSize: wp(5.5), fontWeight: '400'}}>
//               {'Next'}
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </SafeAreaView>
//     </View>
//   );
// };

// export default ChooseAfferamtion;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#191919',
//   },
//   txt: {
//     color: 'white',
//     fontSize: wp(5),
//     fontWeight: '500',
//     fontFamily: fonts.medium,
//     marginLeft: '4%',
//   },
//   listContainer: {
//     borderWidth: wp(0.5),
//     height: hp(6.8),
//     width: wp(94),
//     borderColor: 'white',
//     marginVertical: '2%',
//     borderRadius: wp(2.5),
//     alignItems: 'flex-start',
//     paddingLeft: '3%',
//     justifyContent: 'center',
//     paddingRight: '3%',
//   },
//   txt2: {
//     fontSize: wp(3),
//     color: 'white',
//     elevation: 3,
//     // fontWeight: '300',
//     fontFamily: fonts.medium,
//   },
//   nextBtn: {
//     alignSelf: 'center',
//     zIndex: 1,
//     position: 'absolute',
//     height: hp(7),
//     width: '60%',
//     elevation: 4,
//     borderRadius: 5,
//     overflow: 'hidden',
//     bottom: hp(4),
//     borderWidth: 1,
//   },
// });
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../../components/atoms/responsive';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../../Context/Conctants';

const affirmations = [
  { id: 1, text: 'I am worthy of love and respect, just as I am.' },
  { id: 2, text: 'Every challenge I face is an opportunity for growth and learning.' },
  { id: 3, text: 'I am grateful for the abundance in my life, and more blessings are on their way.' },
  { id: 4, text: 'I trust in my ability to overcome obstacles and achieve my goals.' },
  { id: 5, text: 'I am surrounded by positivity, and I radiate positivity in return.' },
  { id: 6, text: 'I am deserving of success, and I attract success into my life effortlessly.' },
  { id: 7, text: 'I forgive myself for past mistakes and release any lingering negativity.' },
  { id: 8, text: 'I am filled with confidence, and I trust in my own inner wisdom.' },
  { id: 9, text: 'I am at peace with who I am, and I embrace my uniqueness.' },
  { id: 10, text: 'I am the architect of my destiny, and I create a life filled with joy and fulfillment.' },
];

const ChooseAffirmation = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelection = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={25}
            color="white"
            style={{ margin: '5%' }}
          />
          <Image
            style={{
              marginTop: '2%',
              height: 50,
              width: 50,
              marginRight: '5%',
            }}
            source={require('../../assets/logo/stimuili-logos1-.png')}
          />
        </View>
        <Text style={[styles.txt, { marginTop: '2%' }]}>
          What best describes your positive affirmation practice?
        </Text>
        <View style={{ marginTop: '6%', alignItems: 'center', width: '100%' }}>
          <FlatList
            data={affirmations.slice(0, 7)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const isSelected = selectedItems.includes(item.id);
              return (
                <TouchableOpacity onPress={() => toggleSelection(item.id)}>
                  <View
                    style={[
                      styles.listContainer,
                      isSelected && styles.selectedItem,
                    ]}
                  >
                    <Text style={styles.txt2}>{item.text}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AksReminder', { selectedItems })}
          style={styles.nextBtn}
        >
          <LinearGradient
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            start={{ x: 1.4, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 1]}
            colors={['#D485D1', '#B72658']}
          >
            <Text style={{ color: 'white', fontSize: wp(5.5), fontWeight: '400' }}>
              {'Next'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default ChooseAffirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },
  txt: {
    color: 'white',
    fontSize: wp(5),
    fontWeight: '500',
    fontFamily: fonts.medium,
    marginLeft: '4%',
  },
  listContainer: {
    borderWidth: wp(0.5),
    height: hp(6.8),
    width: wp(94),
    borderColor: 'white',
    marginVertical: '2%',
    borderRadius: wp(2.5),
    alignItems: 'flex-start',
    paddingLeft: '3%',
    justifyContent: 'center',
    paddingRight: '3%',
  },
  selectedItem: {
    borderWidth: 3,  
    // backgroundColor: '#B72658',
    borderColor: '#D485D1',
  },
  txt2: {
    fontSize: wp(3),
    color: 'white',
    fontFamily: fonts.medium,
  },
  nextBtn: {
    alignSelf: 'center',
    zIndex: 1,
    position: 'absolute',
    height: hp(7),
    width: '60%',
    elevation: 4,
    borderRadius: 5,
    overflow: 'hidden',
    bottom: hp(4),
    borderWidth: 1,
  },
});
