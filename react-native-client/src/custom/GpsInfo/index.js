import { NativeModules, NativeEventEmitter } from 'react-native';

const { GpsInfo } = NativeModules;

export class LocationListener {
  constructor(name, onLocationChanged) {
    this.onLocationChanged = onLocationChanged;
    this.name = name;
  }
}
function addListener(locationListener){
  let eventEmitter = new NativeEventEmitter(GpsInfo);
  eventEmitter = eventEmitter.addListener(
    'onLocationChanged',
    locationListener.onLocationChanged,
  );
};
export function startListen(provider, minTime, minDistance, locationListener) {
  addListener(locationListener);
  return GpsInfo.startListen(provider, locationListener.name, minTime, minDistance);
}
export function stopListen(locationListener) {
  let eventEmitter = new NativeEventEmitter(GpsInfo);
  eventEmitter = eventEmitter.removeListener('onLocationChanged')
  return GpsInfo.stopListen(locationListener.name);
}
export function isListening() {
  return GpsInfo.isListening();
}
export function getAllProviders() {
  return GpsInfo.getAllProviders();
}
