// src/screens/intro/Quote.tsx
import React, { memo, useEffect } from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import QuoteIcon from '@assets/svg/quotes.svg'; // react-native-svg-transformer
import BG from '@assets/images/temp/fittnesIntro.jpg'; // import image asset (recommended)
import { Colors, FontSize } from '@constants';
import { Fonts } from '@constants';
import { useNavigation } from '@react-navigation/native';

const Quote = () => {
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);
  }, []);
  return (
    <ImageBackground source={BG} style={styles.container} resizeMode="cover">
      {/* Transparent status bar for full-screen look */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Dark overlay for text contrast */}
      <View style={styles.overlay} />

      {/* Center block */}
      <View style={[styles.content, { paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.iconWrap}>
          <QuoteIcon width={28} height={28} />
        </View>

        <Text accessibilityRole="text" style={styles.quoteText}>
          “Remember, physical fitness can neither be acquired by wishful
          thinking nor by outright purchase.”
        </Text>

        <Text accessibilityRole="text" style={styles.author}>
          — JOSEPH PILATES
        </Text>
      </View>
    </ImageBackground>
  );
};

export default memo(Quote);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Slight vignette/dim to ensure white text pops on any image
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: Colors.PRIMARY_COLOR ?? '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20%',
    // subtle elevation
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  quoteText: {
    fontFamily: Fonts.WorkSans.Medium,
    fontSize: FontSize.TWENTY_TWO, // responsive (your constant)
    lineHeight: Math.round(FontSize.TWENTY_TWO * 1.35),
    color: Colors.HEADING_COLOR ?? '#FFFFFF',
    textAlign: 'center',
    maxWidth: 680, // keeps lines readable on tablets
    letterSpacing: 0.2,
    marginBottom: '20%',
  },

  author: {
    fontFamily: Fonts.WorkSans.SemiBold,
    fontSize: FontSize.SIXTEEN,
    lineHeight: Math.round(FontSize.SIXTEEN * 1.3),
    color: Colors.HEADING_COLOR ?? '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
    marginTop: 8,
    marginBottom: '10%',
  },
});
