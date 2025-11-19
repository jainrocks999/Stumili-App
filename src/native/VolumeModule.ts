import {NativeEventEmitter, NativeModules} from 'react-native';

interface VolumeEvent {
  volume: number;
}

interface VolumeModuleType {
  setVolume: (level: number) => void;
  getVolume: () => Promise<number>;
  startListening: () => void;
  stopListening: () => void;
}

const {VolumeModule} = NativeModules;

const emitter = new NativeEventEmitter(VolumeModule);

export const VolumeEvents = {
  addListener: (cb: (data: VolumeEvent) => void) => emitter.addListener('onVolumeChanged', cb),
  removeAllListeners: () => emitter.removeAllListeners('onVolumeChanged'),
};

export default VolumeModule as VolumeModuleType;
