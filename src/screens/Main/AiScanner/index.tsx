import CustomModal from '@components/CustomModal';
import ModalButtons from '@components/ModalButtons';
import { Colors, Fonts, FontSize } from '@constants';
import {
  Modal,
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Dimension1 from 'src/constants/Diemensions';
import Fitst from './svg/Fitst.svg';
import Second from './svg/Second.svg';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ImagePickerActionSheet, {
  ImagePickerRef,
} from '@components/ImageUplaodComponent';
import { useEffect, useRef, useState } from 'react';
import Header from '@components/Header';

import CommonButton from '@components/CommonButton';
import { scanFood } from 'src/api/uploadApis';
import { Asset } from 'react-native-image-picker';
import { MAIN_URl } from '@utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from 'src/storage/storageKeys';
import axios from 'axios';
import { useToast } from '@components/ToastProvider';
import ActionSheet from '@components/ActionSheet/actionsheet';

const AiScannerScreen = () => {
  const navigation: any = useNavigation();
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();
  const pickerRef = useRef<ImagePickerRef>(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [aiText, setAiText] = useState('');
  const focused = useIsFocused();
  useEffect(() => {
    setVisible(true);
  }, [focused]);
  const [showProgress, setShowProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [isFood, setIsFood] = useState(true);

  const handleUpload = async () => {
   
    try {
      setLoading(true);
      setUploadProgress(0);
      setShowProgress(true);

      const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);

      const data = new FormData();
      data.append(isFood ? 'foodImage' : 'recieptImage', {
        uri: selectedImage?.uri,
        type: selectedImage?.type,
        name: selectedImage?.name,
      } as any);

     if(isFood){ data.append('userInput', aiText);
}
      const response = await axios.post(
        `${MAIN_URl}/api/users/${isFood ? 'scan-food' : 'scan-recipt'}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },

          // -------- PROGRESS FIX (Perfect for React Native) --------
          onUploadProgress: event => {
            const loaded = event?.loaded ?? 0;

            // fallback if total missing -> use local file size
            const total = event?.total ?? selectedImage?.size ?? loaded;

            let percent = Math.round((loaded / total) * 100);
            if (percent > 100) percent = 100;

            setUploadProgress(percent);
          },

          maxBodyLength: Infinity,
          timeout: 90000,
        },
      );

      setLoading(false);
      setShowProgress(false);

      if (response.data.status === true) {
        setSelectedImage(null);
        if (isFood) {
          navigation.navigate('FoodCardScreen', {
            data: response.data?.data,
          });
        } else {
          navigation.navigate('Inventory');
        }
      }
    } catch (err: any) {
      console.log('UPLOAD ERROR:', err?.response || err);
      setLoading(false);
      setShowProgress(false);
    }
  };

  const [selectedImage, setSelectedImage] = useState<{
    name: string;
    type: string;
    uri: string;
    size: number;
  } | null>(null);

  const handleImageSelect = (asset: Asset) => {
    setSelectedImage({
      name: asset?.fileName ?? '',
      type: asset?.type ?? '',
      uri: asset?.uri ?? '',
      size: asset?.fileSize || 0,
    });

    setVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Header title="Ai Scanner" />
      <ActionSheet
        visible={pickerVisible}
        onClose={() => {
          setPickerVisible(false);
        }}
        onSelect={handleImageSelect}
      />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedImage(null);
            setVisible(true);
          }}
          style={styles.dismiss}
        >
          <Text style={styles.dismissX}>✕</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: selectedImage?.uri }}
          style={{ height: Dimension1.height * 0.56, width: '100%' }}
        />
        <View
          style={{
            width: '100%',
            paddingHorizontal: 20,
            gap: 15,
            marginTop: 20,
          }}
        >
          {isFood ? (
            <TextInput
              placeholder="Add additional details for AI…"
              placeholderTextColor="#777"
              value={aiText}
              onChangeText={setAiText}
              multiline
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 12,
                padding: 15,
                fontSize: 16,
                color: Colors.BLACK,
                height: 120,
                textAlignVertical: 'top',
                backgroundColor: '#F7F7F7',
                width: '100%',
              }}
            />
          ) : null}

          {/* Progress Bar */}
          {showProgress && (
            <View style={{ width: '100%', marginTop: 10 }}>
              <View
                style={{
                  height: 10,
                  backgroundColor: '#E0E0E0',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    height: '100%',
                    width: `${uploadProgress}%`,
                    backgroundColor: Colors.PRIMARY_COLOR,
                    borderRadius: 10,
                  }}
                />
              </View>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  color: '#555',
                  textAlign: 'center',
                }}
              >
                Uploading… {uploadProgress}%
              </Text>
            </View>
          )}

          {/* Button */}
          <TouchableOpacity
            onPress={handleUpload}
            disabled={loading}
            style={{
              backgroundColor: loading ? '#9BCD9B' : '#4FAF5A',
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontFamily: Fonts.Poppins.SemiBold,
              }}
            >
              {loading ? 'Scanning…' : 'Scan Food'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomModal visible={visible} title="AI Scanner" onClose={() => {}}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <View
            style={{
              height: Dimension1.height * 0.32,
              width: Dimension1.width * 0.92,
              backgroundColor: Colors.WHITE,
              borderRadius: 20,
              alignItems: 'center',
              paddingTop: '7%',
            }}
          >
            <Text
              style={{
                fontSize: FontSize.TWENTY,
                fontFamily: Fonts.Poppins.SemiBold,
                color: Colors.BLACK,
              }}
            >
              AI Scanner
            </Text>

            <View style={{ height: '10%' }} />

            <ModalButtons
              onPress={() => {
                setPickerVisible(true);
                setIsFood(true);
              }}
              title="Scan Food"
              Icon={Fitst}
              color="#4FAF5A"
            />

            <View style={{ height: '5%' }} />

            <ModalButtons
              onPress={() => {
                setPickerVisible(true);
                setIsFood(false);
              }}
              title="Scan Receipt"
              Icon={Second}
              color="#444444"
            />
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

export default AiScannerScreen;
const styles = StyleSheet.create({
  dismiss: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#aaa',
    alignSelf: 'center',
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
    // soft shadow like mock
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
    position: 'absolute',
    zIndex: 10,
    right: 6,
    top: 6,
  },
  dismissX: {
    fontSize: 18,
    color: 'white',
    fontFamily: Fonts.WorkSans.SemiBold,
  },
});
