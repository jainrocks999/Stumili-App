import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

export interface ActionSheetOption {
  label: string;
  icon?: string | React.ReactNode;
  value: string;
  destructive?: boolean;
}

export interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  options?: ActionSheetOption[];
  title?: string;
  cancelText?: string;
  destructiveIndex?: number;
  theme?: 'light' | 'dark';
  onOptionPress?: (value: string) => void;
}

const ActionSheet: React.FC<ActionSheetProps> = ({
  visible,
  onClose,
  options = [
    { label: 'Take Photo', icon: '📷', value: 'camera' },
    { label: 'Choose from Gallery', icon: '🖼️', value: 'gallery' },
  ],
  title = 'Choose an option',
  cancelText = 'Cancel',
  destructiveIndex = -1,
  theme = 'light',
  onOptionPress,
}) => {
  const slideY = useRef(new Animated.Value(height)).current;
  const isDark = theme === 'dark';

  useEffect(() => {
    if (visible) {
      Animated.spring(slideY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 60,
        friction: 10,
      }).start();
    } else {
      Animated.timing(slideY, {
        toValue: height,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const renderIcon = (icon?: string | React.ReactNode) => {
    if (!icon) return null;

    if (typeof icon === 'string') {
      return <Text style={styles.icon}>{icon}</Text>;
    }
    return icon;
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      {/* BACKDROP */}
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.backdrop,
          { backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.45)' },
        ]}
        onPress={onClose}
      />

      {/* BOTTOM SHEET */}
      <Animated.View
        style={[
          styles.sheet,
          isDark && styles.sheetDark,
          { transform: [{ translateY: slideY }] },
        ]}
      >
        <SafeAreaView style={{ width: '100%' }}>
          <View style={[styles.card, isDark && styles.cardDark]}>
            {options.map((option, index) => {
              const isDestructive =
                option.destructive || destructiveIndex === index;

              return (
                <React.Fragment key={option.value}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.option}
                    onPress={() => {
                      onOptionPress?.(option.value);
                      onClose();
                    }}
                  >
                    {renderIcon(option.icon)}
                    <Text
                      style={[
                        styles.optionText,
                        isDark && styles.optionTextDark,
                        isDestructive && styles.destructiveText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>

                  {index !== options.length - 1 && (
                    <View
                      style={[styles.divider, isDark && styles.dividerDark]}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </View>

          <View style={[styles.card, isDark && styles.cardDark]}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.option}
              onPress={onClose}
            >
              <Text style={[styles.cancel, isDark && styles.cancelDark]}>
                {cancelText}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  sheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 10 : 20,
  },
  sheetDark: {
    backgroundColor: '#1c1c1e',
  },

  titleBox: {
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    backgroundColor: '#f7f7f7',
  },
  titleBoxDark: {
    backgroundColor: '#2c2c2e',
    borderBottomColor: '#3a3a3c',
  },
  title: { fontSize: 13, color: '#8e8e93' },
  titleDark: { color: '#b0b0b5' },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 14,
    overflow: 'hidden',
  },
  cardDark: {
    backgroundColor: '#2c2c2e',
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 18,
  },

  icon: {
    fontSize: 20,
    marginRight: 12,
  },

  optionText: {
    fontSize: 17,
    color: '#0394fc',
    fontWeight:'500'
  },
  optionTextDark: {
    color: '#ff3b30',
  },

  destructiveText: {
    color: '#ff3b30',
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#c7c7cc',
    marginLeft: 18,
  },
  dividerDark: {
    backgroundColor: '#3a3a3c',
  },

  cancel: {
    fontSize: 17,
    color: '#ff3b30',
    textAlign: 'center',
    width: '100%',
    fontWeight:'500'
  },
  cancelDark: {
    color: '#0a84ff',
  },
});

export default ActionSheet;
