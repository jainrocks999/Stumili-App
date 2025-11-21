import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { playAudio, pauseAudio, stopAudio, seekAudio,setPlaylist } from './src/native/SoundModule';
import { SafeAreaView } from 'react-native-safe-area-context';

const AudioPlayer: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [position, setPosition] = useState<string>('0');

  const handleSeek = () => {
    const pos = parseInt(position, 10);
    if (!isNaN(pos)) {
      seekAudio(pos);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Audio URL"
        value={url}
        onChangeText={setUrl}
      />
      <Button
        title="Play"
        onPress={async () => {
            try {
              const sample1 = require('./sample.mp3');
              const sample2 = require('./sample1.mp3');
          
              const uri1 = Image.resolveAssetSource(sample1).uri;
              const uri2 = Image.resolveAssetSource(sample2).uri;
          
              // Set playlist in native module
              await setPlaylist([uri1, uri2]);
          
              // Start playing
              await playAudio();
            } catch (err) {
              console.error('Error playing playlist:', err);
            }
          }}
      />
      <Button title="Pause" onPress={pauseAudio} />
      <Button title="Stop" onPress={stopAudio} />

      <TextInput
        style={styles.input}
        placeholder="Seek Position (ms)"
        value={position}
        onChangeText={setPosition}
        keyboardType="numeric"
      />
      <Button title="Seek" onPress={handleSeek} />
    </SafeAreaView>
  );
};

export default AudioPlayer;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
});
