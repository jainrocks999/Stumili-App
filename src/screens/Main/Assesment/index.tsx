import React from 'react';
import {
  FlatList,
  ImageBackground,
  StatusBar,
  Text,
  View,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowBack from './svg/back.svg';
import { Fonts, FontSize } from '@constants';
import Imaggess from './image/body.jpg';
import LinearGradient from 'react-native-linear-gradient';
import Tick from './svg/tick.svg';
import CommonButton from '@components/CommonButton';
import Camera from './svg/camera.svg';

const AssementScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const data = [
    { title: '720p Camera' },
    { title: 'Stay Still' },
    { title: 'Good Lighting' },
  ];

  return (
    <View
      style={{ flex: 1, backgroundColor: '#fff', paddingBottom: insets.bottom }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 10,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Pressable hitSlop={12} onPress={() => navigation?.goBack?.()}>
          <ArrowBack height={38} width={38} />
        </Pressable>
        <Text
          style={{ fontSize: FontSize.TWENTY, fontFamily: Fonts.WorkSans.Bold }}
        >
          Assessment
        </Text>
      </View>

      {/* Title + subtitle */}
      <View
        style={{
          alignItems: 'center',
          paddingTop: '10%',
          paddingHorizontal: 16,
        }}
      >
        <Text
          style={{
            fontSize: FontSize.TWENTY_FIVE + 5,
            fontFamily: Fonts.WorkSans.Bold,
          }}
        >
          Body Analysis
        </Text>

        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            lineHeight: 20,
            fontSize: FontSize.SIXTEEN,
            fontFamily: Fonts.WorkSans.Medium,
            color: '#676C75',
            marginTop: 12,
          }}
        >
          {`We’ll now scan your body for better assessment result. Ensure the following:`}
        </Text>
      </View>

      {/* Image with bottom fade */}
      <View style={{ paddingHorizontal: 16, marginTop: '10%' }}>
        <ImageBackground
          source={Imaggess}
          resizeMode="cover"
          style={{
            width: '100%',
            aspectRatio: 16 / 10, // keeps consistent height across screens
            borderRadius: 16,
            overflow: 'hidden',
          }}
          imageStyle={{ borderRadius: 16 }}
        >
          <LinearGradient
            colors={['#FFFFFF00', '#FFFFFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '60%', // how much of the bottom fades
            }}
          />
        </ImageBackground>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, i) => `${item.title}-${i}`}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 12,
          marginTop: 30,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              borderRadius: 12,
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: FontSize.EIGHTEEN,
                fontFamily: Fonts.WorkSans.SemiBold,
                color: '#111214',
              }}
            >
              {item.title}
            </Text>
            <Tick />
          </View>
        )}
      />
      <View style={{ paddingHorizontal: 16, flex: 1 }}>
        <CommonButton
          style={{ gap: 5 }}
          onPress={() => {
            navigation.navigate('CameraShowScreen');
          }}
          RightIcon={() => <Camera height={18} width={18} />}
          title="Got it, lets scan"
        />
      </View>
    </View>
  );
};

export default AssementScreen;
