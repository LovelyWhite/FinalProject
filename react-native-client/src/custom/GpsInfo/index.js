import { NativeModules,NativeEventEmitter, Alert } from 'react-native';

const { GpsInfo } = NativeModules;

export function addLocationChangedListener(fun)
{
    let eventEmitter = new NativeEventEmitter(NativeModules.GpsInfo);
    eventEmitter = eventEmitter.addListener('onLocationChanged',fun)
    Alert.alert("aa","成功")
}

export default GpsInfo;
