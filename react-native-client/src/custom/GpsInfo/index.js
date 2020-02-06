import { NativeModules, NativeEventEmitter, Alert } from 'react-native';

const { GpsInfo } = NativeModules;

export function addLocationChangedListener(fun) {

   return new Promise((reslove, reject) => {
        GpsInfo.isListening().then(res => {
            if (res === true) {
                let eventEmitter = new NativeEventEmitter(NativeModules.GpsInfo);
                eventEmitter = eventEmitter.addListener('onLocationChanged', fun)
                reslove("add locationChangedListener success")
            }
            else {
                reject("please startListen first")
            }
        })
    }
    )
}

export default GpsInfo;
