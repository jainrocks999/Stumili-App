// src/screens/intro/WelcomeScreen.tsx
import React, { memo } from 'react';
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BG from '@assets/images/welcome/welcome.jpg';
import { Colors, FontSize, Fonts } from '@constants';
import BackArrow from '../../assets/svg/backprimary.svg';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation:any=useNavigation()

  return (
    <ImageBackground
      source={BG}
      style={styles.container}
      imageStyle={styles.bgImage} // ← only the image scales
      resizeMode="cover"
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.overlay} />

      <View
        style={[
          styles.content,
          { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 70 },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome To</Text>
          <Text style={styles.brand}>EatEase AI</Text>
          <Text style={styles.subtitle}>
            Your personal Nutrition AI Assistant 🤖
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <Pressable onPress={()=>{navigation.replace("WecomrCarousel")}} style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
            <BackArrow height={25} width={25} style={styles.arrow} />
          </Pressable>

          <Text style={styles.signIn}>
            Already have account? <Text style={styles.signInLink}>Sign In</Text>
          </Text>
        </View>
      </View>
      <LinearGradient
         colors={['#00000000', '#000000E6']} 
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}
      />
    </ImageBackground>
  );
};

export default memo(WelcomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  bgImage: {
    transform: [{ scale: 2.5 }],
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 28,
  },
  textContainer: {
    marginBottom: 40,
    alignItems: 'center',
    zIndex: 100,
  },
  title: {
    fontFamily: Fonts.WorkSans.Bold,
    fontSize: FontSize.TWENTY_FIVE,
    color: '#FFFFFF',
    lineHeight: Math.round(FontSize.TWENTY_FIVE * 1.2),
  },
  brand: {
    fontFamily: Fonts.WorkSans.Bold,
    fontSize: FontSize.TWENTY_FIVE,
    color: '#FFFFFF',
    marginTop: 4,
    lineHeight: Math.round(FontSize.TWENTY_FIVE * 1.2),
  },
  subtitle: {
    fontFamily: Fonts.WorkSans.Medium,
    fontSize: FontSize.FOURTEEN,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 12,
    lineHeight: Math.round(FontSize.FOURTEEN * 1.35),
  },
  bottomContainer: { marginTop: 8, alignItems: 'center', zIndex: 100 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.PRIMARY_COLOR ?? '#F97316',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: Fonts.WorkSans.SemiBold,
    fontSize: FontSize.SIXTEEN,
    lineHeight: Math.round(FontSize.SIXTEEN * 1.25),
  },
  arrow: {
    color: '#FFFFFF',
    fontFamily: Fonts.WorkSans.SemiBold,
    fontSize: FontSize.SIXTEEN,
    marginLeft: 6,
    lineHeight: Math.round(FontSize.SIXTEEN * 1.25),
  },
  signIn: {
    fontFamily: Fonts.WorkSans.Medium,
    fontSize: FontSize.TWELVE,
    color: 'rgba(255,255,255,0.9)',
  },
  signInLink: {
    color: Colors.PRIMARY_COLOR ?? '#F97316',
    fontFamily: Fonts.WorkSans.SemiBold,
    textDecorationLine: 'underline',
  },
});
