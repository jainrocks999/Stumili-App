import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  
  ScrollView,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const ScanWithAIScreen = ({ navigation }: any) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const handleDeleteImage = () => setImageUri(null);

  const handleSend = () => {
    console.log("Send to AI:", { imageUri, description });
    // Your send logic here (API call)
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan with AI</Text>
        <View style={{ width: 24 }} /> 
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Image Picker */}
        <TouchableOpacity
          style={[styles.imageContainer, !imageUri && styles.placeholder]}
          onPress={handleSelectImage}
          activeOpacity={0.8}
        >
          {imageUri ? (
            <>
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeleteImage}
              >
                <Icon name="close" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.placeholderContent}>
              <Icon name="camera-outline" size={48} color="#AFAFAF" />
              <Text style={styles.placeholderText}>
                Tap to Select or Capture Image
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Input */}
        <TextInput
          style={styles.input}
          placeholder="Add context, ask a question, or describe what you want the AI to do..."
          placeholderTextColor="#AFAFAF"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendText}>Send to AI</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ScanWithAIScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
    backgroundColor:'green'
  },
  headerTitle: {
    color: "#FFFFFF",
    fontFamily: "Inter-Bold",
    fontSize: 20,
  },
  content: {
    padding: 16,
    flexGrow: 1,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: "hidden",
    minHeight: 220,
    marginBottom: 16,
  },
  placeholder: {
    backgroundColor: "#1E1E1E",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#3A3A3A",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 48,
  },
  placeholderText: {
    color: "#AFAFAF",
    fontSize: 16,
    fontFamily: "Inter-Regular",
    marginTop: 8,
    textAlign: "center",
  },
  imagePreview: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
  deleteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(18,18,18,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "lightgrey",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 8,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter-Regular",
    padding: 16,
    textAlignVertical: "top",
    minHeight: 120,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#1E1E1E",
    backgroundColor: "#fff",
  },
  sendBtn: {
    backgroundColor: "#00A3FF",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  sendText: {
    color: "#FFFFFF",
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
  },
  cancelBtn: {
    alignItems: "center",
    marginBottom: 4,
  },
  cancelText: {
    color: "#AFAFAF",
    fontFamily: "Inter-Regular",
    fontSize: 16,
  },
});
