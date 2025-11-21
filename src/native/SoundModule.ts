// SoundService.ts
import { NativeModules } from 'react-native';

// Type definition for native module
interface ISoundModule {
  playUrls(urls: string[]): Promise<string>;
  play(): Promise<string>;
  pause(): Promise<string>;
  stop(): Promise<string>;
  next(): Promise<string>;
  previous(): Promise<string>;
  seekTo(position: number): Promise<string>;

  // 🔊 Added volume & fade controls
  volumeUp(): Promise<string>;
  volumeDown(): Promise<string>;
  fadeIn(): Promise<string>;
  fadeOut(): Promise<string>;
  setVolume(value:number):Promise<string>;
  
}

// Type-safe access
const { AudioModule } = NativeModules;
export const soundModule = AudioModule as ISoundModule;

//
// 🎵 Playlist control
//
export const setPlaylist = async (urls: string[]): Promise<void> => {
  try {
    await soundModule.playUrls(urls);
    console.log('✅ Playlist set:', urls);
  } catch (error) {
    console.error('❌ Error setting playlist:', error);
  }
};

//
// ▶️ Playback controls
//
export const playAudio = async (): Promise<void> => {
  try {
    await soundModule.play();
    console.log('▶️ Playing audio');
  } catch (error) {
    console.error('❌ Error playing audio:', error);
  }
};

export const pauseAudio = async (): Promise<void> => {
  try {
    await soundModule.pause();
    console.log('⏸️ Paused audio');
  } catch (error) {
    console.error('❌ Error pausing audio:', error);
  }
};

export const stopAudio = async (): Promise<void> => {
  try {
    await soundModule.stop();
    console.log('⏹️ Stopped audio');
  } catch (error) {
    console.error('❌ Error stopping audio:', error);
  }
};

export const nextAudio = async (): Promise<void> => {
  try {
    await soundModule.next();
    console.log('⏭️ Next track');
  } catch (error) {
    console.error('❌ Error skipping to next track:', error);
  }
};

export const previousAudio = async (): Promise<void> => {
  try {
    await soundModule.previous();
    console.log('⏮️ Previous track');
  } catch (error) {
    console.error('❌ Error skipping to previous track:', error);
  }
};

export const seekAudio = async (position: number): Promise<void> => {
  try {
    await soundModule.seekTo(position);
    console.log(`⏩ Seeked to ${position} ms`);
  } catch (error) {
    console.error('❌ Error seeking audio:', error);
  }
};

//
// 🔊 Independent Volume controls
//
export const volumeUp = async (): Promise<void> => {
  try {
    await soundModule.volumeUp();
    console.log('🔊 Volume increased');
  } catch (error) {
    console.error('❌ Error increasing volume:', error);
  }
};

export const volumeDown = async (): Promise<void> => {
  try {
    await soundModule.volumeDown();
    console.log('🔉 Volume decreased');
  } catch (error) {
    console.error('❌ Error decreasing volume:', error);
  }
};

//
// 🌈 Smooth Fade controls
//
export const fadeInAudio = async (): Promise<void> => {
  try {
    await soundModule.fadeIn();
    console.log('🌅 Fade-in started');
  } catch (error) {
    console.error('❌ Error during fade-in:', error);
  }
};

export const fadeOutAudio = async (): Promise<void> => {
  try {
    await soundModule.fadeOut();
    console.log('🌇 Fade-out started');
  } catch (error) {
    console.error('❌ Error during fade-out:', error);
  }
};

export const setVolumeSound = async (value: number): Promise<void> => {
  try {
    await soundModule.setVolume(value);
    console.log(`🎚️ Volume set to: ${(value * 100).toFixed(0)}%`);
  } catch (error) {
    console.error('❌ Error setting volume:', error);
  }
};