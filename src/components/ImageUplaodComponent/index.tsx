import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Platform,
  ActionSheetIOS,
  StyleSheet,
} from "react-native";
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";

interface Props {
  onSelect: (asset: Asset) => void;
}

export interface ImagePickerRef {
  open: () => void;
  close: () => void;
}

const ImagePickerActionSheet = forwardRef<ImagePickerRef, Props>(
  ({ onSelect }, ref) => {
    const [androidSheet, setAndroidSheet] = useState(false);

    const openCamera = async () => {
      const result = await launchCamera({
        mediaType: "photo",
        includeBase64: true,
      });
      if (result.assets) onSelect(result.assets[0]);
    };

    const openGallery = async () => {
      const result = await launchImageLibrary({
        mediaType: "photo",
        includeBase64: true,
      });
      if (result.assets) onSelect(result.assets[0]);
    };

    const openIOS = () => {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Take Photo", "Choose from Gallery"],
          cancelButtonIndex: 0,
        },
        (index) => {
          if (index === 1) openCamera();
          if (index === 2) openGallery();
        }
      );
    };

    const open = () => {
      Platform.OS === "ios" ? openIOS() : setAndroidSheet(true);
    };

    const close = () => {
      setAndroidSheet(false);
    };

    // 🔥 expose open() and close() to the parent
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    return (
      <>
        {/* ANDROID SHEET */}
        <Modal visible={androidSheet} transparent animationType="slide">
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={close}
          >
            <View style={styles.sheet}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  close();
                  openCamera();
                }}
              >
                <Text style={styles.optionText}>📷 Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  close();
                  openGallery();
                }}
              >
                <Text style={styles.optionText}>🖼️ Choose from Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.option, { backgroundColor: "#F3F3F3" }]}
                onPress={close}
              >
                <Text style={[styles.optionText, { color: "#555" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    );
  }
);

export default ImagePickerActionSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 18,
    color: "#000",
  },
});
