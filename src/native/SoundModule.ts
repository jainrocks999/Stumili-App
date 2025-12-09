// SoundService.ts
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

let currentSound: Sound | null = null;
let playlist: string[] = [];
let currentIndex = 0;
let currentVolume = 1;

//
// 🎵 Set Playlist
//
export const setPlaylist = async (urls: string[]): Promise<void> => {
  try {
    playlist = urls;
    currentIndex = 0;
    console.log('✅ Playlist set:', playlist);
  } catch (error) {
    console.error('❌ Error setting playlist:', error);
  }
};

//
// 🔄 Load sound
//
const loadSound = (url: string): Promise<Sound> => {
  return new Promise((resolve, reject) => {
    const sound = new Sound(url, undefined, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(sound);
      }
    });
  });
};

//
// ▶️ Play
//
export const playAudio = async (): Promise<void> => {
  try {
    if (!playlist.length) return;

    if (currentSound) {
      currentSound.release();
    }

    const url = playlist[currentIndex];
    currentSound = await loadSound(url);

    currentSound.setVolume(currentVolume);
    currentSound.play((success) => {
      if (success) {
        console.log('✅ Finished playing');
      } else {
        console.error('❌ Playback failed');
      }
    });

    console.log('▶️ Playing audio');
  } catch (error) {
    console.error('❌ Error playing audio:', error);
  }
};

//
// ⏸️ Pause
//
export const pauseAudio = async (): Promise<void> => {
  try {
    currentSound?.pause();
    console.log('⏸️ Paused audio');
  } catch (error) {
    console.error('❌ Error pausing audio:', error);
  }
};

//
// ⏹️ Stop
//
export const stopAudio = async (): Promise<void> => {
  try {
    currentSound?.stop();
    console.log('⏹️ Stopped audio');
  } catch (error) {
    console.error('❌ Error stopping audio:', error);
  }
};

//
// ⏭️ Next
//
export const nextAudio = async (): Promise<void> => {
  try {
    if (!playlist.length) return;

    currentIndex = (currentIndex + 1) % playlist.length;
    await playAudio();
    console.log('⏭️ Next track');
  } catch (error) {
    console.error('❌ Error playing next track:', error);
  }
};

//
// ⏮️ Previous
//
export const previousAudio = async (): Promise<void> => {
  try {
    if (!playlist.length) return;

    currentIndex =
      (currentIndex - 1 + playlist.length) % playlist.length;
    await playAudio();
    console.log('⏮️ Previous track');
  } catch (error) {
    console.error('❌ Error playing previous track:', error);
  }
};

//
// ⏩ Seek
//
export const seekAudio = async (position: number): Promise<void> => {
  try {
    if (!currentSound) return;

    currentSound.setCurrentTime(position / 1000); // ms → sec
    console.log(`⏩ Seeked to ${position} ms`);
  } catch (error) {
    console.error('❌ Error seeking audio:', error);
  }
};

//
// 🔊 Volume Up
//
export const volumeUp = async (): Promise<void> => {
  try {
    currentVolume = Math.min(1, currentVolume + 0.1);
    currentSound?.setVolume(currentVolume);
    console.log('🔊 Volume increased');
  } catch (error) {
    console.error('❌ Error increasing volume:', error);
  }
};

//
// 🔉 Volume Down
//
export const volumeDown = async (): Promise<void> => {
  try {
    currentVolume = Math.max(0, currentVolume - 0.1);
    currentSound?.setVolume(currentVolume);
    console.log('🔉 Volume decreased');
  } catch (error) {
    console.error('❌ Error decreasing volume:', error);
  }
};

//
// 🌅 Fade In
//
export const fadeInAudio = async (): Promise<void> => {
  try {
    currentVolume = 0;
    currentSound?.setVolume(0);

    const interval = setInterval(() => {
      if (currentVolume >= 1) {
        clearInterval(interval);
      } else {
        currentVolume += 0.05;
        currentSound?.setVolume(currentVolume);
      }
    }, 200);

    console.log('🌅 Fade-in started');
  } catch (error) {
    console.error('❌ Error during fade-in:', error);
  }
};

//
// 🌇 Fade Out
//
export const fadeOutAudio = async (): Promise<void> => {
  try {
    const interval = setInterval(() => {
      if (currentVolume <= 0) {
        clearInterval(interval);
        currentSound?.stop();
      } else {
        currentVolume -= 0.05;
        currentSound?.setVolume(currentVolume);
      }
    }, 200);

    console.log('🌇 Fade-out started');
  } catch (error) {
    console.error('❌ Error during fade-out:', error);
  }
};

//
// 🎚️ Set Volume (0.0 to 1.0)
//
export const setVolumeSound = async (value: number): Promise<void> => {
  try {
    currentVolume = Math.max(0, Math.min(1, value));
    currentSound?.setVolume(currentVolume);
    console.log(`🎚️ Volume set to: ${(currentVolume * 100).toFixed(0)}%`);
  } catch (error) {
    console.error('❌ Error setting volume:', error);
  }
};
