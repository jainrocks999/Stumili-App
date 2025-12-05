import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {
    heightPercent as hp,
    widthPrecent as wp,
} from '../../components/atoms/responsive'
const SuggestImprovementScreen = () => {
    const navigation = useNavigation();
    const [suggestion, setSuggestion] = useState('');
    const [images, setImages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const handleImagePick = (fromCamera) => {
        const options = {
            mediaType: 'photo',
            maxWidth: 1024,
            maxHeight: 1024,
            quality: 1,
        };
        const picker = fromCamera ? launchCamera : launchImageLibrary;
        picker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                setImages([...images, response.assets[0].uri]);
            }
        });
        setModalVisible(false);
    };
    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Suggest an Improvement</Text>
            </View>
            <View style={styles.centeredContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Your suggestion"
                    placeholderTextColor="#888"
                    multiline
                    value={suggestion}
                    onChangeText={setSuggestion}
                />
            </View>
            <TouchableOpacity style={styles.uploadButton} onPress={() => setModalVisible(true)}>
                <Icon name="image-outline" size={24} color="white" />
                <Text style={styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>
            {images.length > 0 && (
                <FlatList
                    data={images}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.imageList}
                    renderItem={({ item, index }) => (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item }} style={styles.previewImage} />
                            <TouchableOpacity style={styles.deleteButton} onPress={() => removeImage(index)}>
                                <Icon name="close-circle" size={30} color="red" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
            <TouchableOpacity
                disabled={!suggestion}
                style={styles.submitButtonContainer}
            >
                <LinearGradient
                    colors={['#D485D1', '#B72658']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                        styles.submitButton,
                        !suggestion && { opacity: 0.6 },
                    ]}
                >
                    <Text style={styles.submitText}>Submit</Text>
                </LinearGradient>
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.modalOption} onPress={() => handleImagePick(true)}>
                            <Icon name="camera" size={24} color="white" />
                            <Text style={styles.modalText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={() => handleImagePick(false)}>
                            <Icon name="image" size={24} color="white" />
                            <Text style={styles.modalText}>Choose from Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        marginLeft: '8%',
    },
    centeredContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        marginTop: wp(20),
        backgroundColor: '#2E2E2E',
        color: '#FFF',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        width: '100%',
        minHeight: 100,
        textAlignVertical: 'top',
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#444',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        marginLeft: 8,
    },
    imageList: {
        flexDirection: 'row',
        marginTop: 10,
    },
    imageContainer: {
        position: 'relative',
        marginRight: 10,
    },
    previewImage: {
        marginTop: wp(5),
        width: wp(45),
        height: wp(45),
        borderRadius: 10,
    },
    deleteButton: {
        position: 'absolute',
        top: 3,
        right: -8,
    },
    submitButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    submitButton: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    submitText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#555',
    },
    modalText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    modalCancel: {
        padding: 15,
        width: '100%',
        alignItems: 'center',
    },
    modalCancelText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default SuggestImprovementScreen;
