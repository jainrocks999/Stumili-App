// // import React, { useState } from 'react';
// // import { View, Button, Text } from 'react-native';
// // import AudioRecorderPlayer from 'react-native-audio-recorder-player';

// // const AudioRecorder = () => {
// //   const [isRecording, setIsRecording] = useState(false);
// //   const [audioPath, setAudioPath] = useState('');
// //   const audioRecorderPlayer = new AudioRecorderPlayer();

// //   const startRecording = async () => {
// //     const path = 'your_audio_file_path.amr'; // Specify the file path where you want to save the recorded audio
// //     await audioRecorderPlayer.startRecorder(path);
// //     setAudioPath(path);
// //     setIsRecording(true);
// //   };

// //   const stopRecording = async () => {
// //     const result = await audioRecorderPlayer.stopRecorder();
// //     setIsRecording(false);
// //     console.log(result);
// //   };

// //   return (
// //     <View>
// //       <Text>{audioPath ? `Recorded audio path: ${audioPath}` : 'No audio recorded yet'}</Text>
// //       {isRecording ? (
// //         <Button title="Stop Recording" onPress={stopRecording} />
// //       ) : (
// //         <Button title="Start Recording" onPress={startRecording} />
// //       )}
// //     </View>
// //   );
// // };

// // export default AudioRecorder;

// import React, {useState, useEffect} from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   View,
//   StyleSheet,
//   PermissionsAndroid,
// } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player'; // Ensure you have installed this package
// import {heightPercent as hp, widthPrecent as wp} from '../atoms/responsive';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {Image} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// const AudioRecorder = () => {
//     const navigation = useNavigation();
//   const [recording, setRecording] = useState(null);
//   const [recordingStatus, setRecordingStatus] = useState('idle');
//   const [audioPermission, setAudioPermission] = useState(false);

//   useEffect(() => {
//     const requestAudioPermission = async () => {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//           {
//             title: 'Audio Recording Permission',
//             message: 'App needs access to your microphone for recording audio.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           setAudioPermission(true);
//         } else {
//           setAudioPermission(false);
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     };

//     requestAudioPermission();

//     return () => {
//       if (recording) {
//         stopRecording();
//       }
//     };
//   }, []);

//   const audioRecorderPlayer = new AudioRecorderPlayer();

//   const startRecording = async () => {
//     try {
//       if (audioPermission) {
//         const path = 'your_audio_file_path.amr'; // Specify the file path where you want to save the recorded audio
//         await audioRecorderPlayer.startRecorder(path);
//         setRecordingStatus('recording');
//         setRecording(true);
//       } else {
//         console.log('Audio recording permission not granted.');
//       }
//     } catch (error) {
//       console.error('Failed to start recording:', error);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       if (recordingStatus === 'recording') {
//         console.log('Stopping Recording');
//         const result = await audioRecorderPlayer.stopRecorder();
//         setRecordingStatus('idle');
//         setRecording(false);
//         console.log(result);
//       }
//     } catch (error) {
//       console.error('Failed to stop recording:', error);
//     }
//   };

//   const handleRecordButtonPress = () => {
//     if (recording) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   return (
//     <View style={{flex: 1, backgroundColor: '#191919'}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           marginTop: 20,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//         <View style={{height: hp(5), marginLeft: '15%'}}>
//           <Icon

//                 onPress={() => navigation.goBack()}

//             name="arrow-back"
//             size={30}
//             color="white"
//           />
//         </View>
//         <View style={{height: hp(5), width: wp(100)}}>
//           <Text
//             style={{
//               fontSize: hp(2.5),
//               fontWeight: '600',
//               marginHorizontal: '20%',
//               fontFamily: 'Montserrat-SemiBold',
//               color: 'white',
//             }}>
//             Your recordings
//           </Text>
//         </View>
//       </View>
//       <View
//         style={{
//           height: hp(30),
//           width: wp(50),
//           borderRadius: 20,
//           alignSelf: 'center',
//           alignItems: 'center',
//           marginTop: '10%',
//           justifyContent: 'center',
//         }}>
//         <Image
//           source={require('../../assets/playlist.png')}
//           style={{
//             height: hp(6),
//             width: wp(13),

//             tintColor: 'white',
//           }}
//         />
//         <View style={{top: 30}}>
//           <Text style={{color: 'white', fontSize: 25}}>
//             Here will appear your recordings
//           </Text>
//         </View>
//       </View>
//       <View
//         style={{
//           borderWidth: 0.5,
//           borderRadius: 50,
//           borderColor: 'grey',
//           height: hp(12),
//           width: wp(50),
//           borderRadius: 20,
//           alignSelf: 'center',
//           alignItems: 'center',
//           top: hp(12),
//           justifyContent: 'center',
//         }}>
//         <View style={{width: wp(40)}}>
//           <Text style={{color: 'white', fontSize: 14}}>
//             Hold the button & say one
//           </Text>
//           <Text style={{color: 'white', fontSize: 14, left: 13}}>
//             affirmation at the time
//           </Text>
//           <Text style={{color: 'white', fontSize: 14, top: 10, left: 20}}>
//             Ex: I am Confident
//           </Text>
//         </View>
//       </View>
//       <View
//         style={{
//           top: hp(17),
//           width: wp(50),
//           borderRadius: 20,
//           alignSelf: 'center',
//           alignItems: 'center',

//           justifyContent: 'center',
//         }}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleRecordButtonPress}>
//           <FontAwesome
//             name={recording ? 'stop-circle' : 'circle'}
//             size={45}
//             color="white"
//           />
//         </TouchableOpacity>
//         <Text
//           style={
//             styles.recordingStatusText
//           }>{`Recording status: ${recordingStatus}`}</Text>
//       </View>
//     </View>
//   );
// };

// export default AudioRecorder;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 100,
//     height: 100,
//     borderRadius: 64,
//     backgroundColor: 'red',
//   },
//   recordingStatusText: {
//     marginTop: 16,
//     color: 'white',
//   },
// });
