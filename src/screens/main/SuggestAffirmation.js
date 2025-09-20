import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
const SuggestAffirmationScreen = () => {
    const navigation = useNavigation();
    const [affirmation, setAffirmation] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Suggest an Affirmation</Text>
            </View>
            <View style={styles.centeredContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Write your affirmation..."
                    placeholderTextColor="#888"
                    multiline
                    value={affirmation}
                    onChangeText={setAffirmation}
                />
            </View>
            <TouchableOpacity
                disabled={!affirmation}
                style={styles.submitButtonContainer}
            >
                <LinearGradient
                    colors={['#D485D1', '#B72658']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                        styles.submitButton,
                        !affirmation && { opacity: 0.6 },
                    ]}
                >
                    <Text style={styles.submitText}>Submit</Text>
                </LinearGradient>
            </TouchableOpacity>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#2E2E2E',
        color: '#FFF',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        width: '100%',
        minHeight: 100,
        textAlignVertical: 'top',
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
});
export default SuggestAffirmationScreen;
