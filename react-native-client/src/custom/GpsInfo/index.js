import { NativeModules, NativeEventEmitter } from 'react-native';

const { GpsInfo } = NativeModules;

export class LocationListener {
  constructor(name, onLocationChanged) {
    this.onLocationChanged = onLocationChanged;
    this.name = name;
  }
}

export async function startListen(provider, minTime, minDistance, locationListener) {
  let result;
  let t = true;
  await GpsInfo.startListen(provider, locationListener.name, minTime, minDistance).then(res => {
    result = res;
    let eventEmitter = new NativeEventEmitter(GpsInfo);
    eventEmitter = eventEmitter.addListener(
      'onLocationChanged',
      locationListener.onLocationChanged,
    );
  }).catch(res => {
    t = false
    result = res;
  });

  return new Promise((resolve, reject) => {
    if (t)
      resolve(result)
    else
      reject(result)
  });
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
