// components/FeatureCard.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function FeatureCard({
  title,
  subtitle,
  colors,
  right,
  style,
  headerIcon,
  children,
}: {
  title: string;
  subtitle?: string;
  colors: [string, string]; // gradient
  right?: React.ReactNode;  // e.g., phone PNG/SVG
  style?: ViewStyle;
  headerIcon?: React.ReactNode; // small circle icon top-left
  children?: React.ReactNode;   // custom inner (e.g., rings)
}) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, style]}
    >
      <View style={styles.headerRow}>
        <View style={styles.iconBubble}>
          {headerIcon ?? <View style={styles.placeholderDot} />}
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        {children}
      </View>

      {right ? <View style={styles.rightWrap}>{right}</View> : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 14,
    overflow: 'hidden',
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  iconBubble: {
    width: 34, height: 34, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center', justifyContent: 'center',
  },
  placeholderDot: {
    width: 10, height: 10, borderRadius: 5, backgroundColor: '#fff',
    opacity: 0.8,
  },
  title: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 14,
    color: '#0F172A',
  },
  subtitle: {
    marginTop: 4,
    fontFamily: 'WorkSans-Medium',
    fontSize: 11,
    color: '#374151',
    opacity: 0.9,
  },
  rightWrap: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});
