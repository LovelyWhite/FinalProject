import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import { StyleSheet, Alert, View, Text, NativeEventEmitter, NativeModules } from 'react-native';
import { serverAdress } from '../../app.json';
import WebView from 'react-native-webview'
import { request as requestPermission, PERMISSIONS } from 'react-native-permissions';
import GpsInfo,{addLocationChangedListener} from '../../custom/GpsInfo/index'
import { event } from 'react-native-reanimated';

export default class PositionScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      reGeo: false,
      geo: {
        longitude: 0,
        latitude: 0,
      },
    };
  }
  componentDidMount() {
  }
  detectPosition() {
    Promise.all([
      requestPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION),
      requestPermission(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION),
    ]).then(([a, b]) => {
      if (a === 'granted' && b === 'granted') {
        GpsInfo.startListen('gps').then(res => {
         addLocationChangedListener((event)=>{
            Alert.alert("aa",event)
          })
        });
      }
    });


  }
  toNumber(num: number) {
    let numStr = num.toString();
    let temp: string[] = numStr.toUpperCase().split('E+');
    if (!temp[1]) {
      return numStr;
    }
    let tempNumStr: string = '1';
    for (let i = 0; i < parseInt(temp[1], 10); i++) {
      tempNumStr += '0';
    }
    return tempNumStr;
  }
  render() {
    console.log(serverAdress)
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <WebView
          source={{ uri: serverAdress + 'page/bd-map' }}
        >

        </WebView>
        <Button
          style={style.controlerButton}
          onPress={this.detectPosition.bind(this)}
          loading={this.state.reGeo}
          icon={<Icon name="ios-sync" size={23} color="#FFFFFF" />}
        />
        <View style={style.controler}>
          <Text>address:{this.state.geo.address}</Text>
          <Text>longitude:{this.toNumber(this.state.geo.longitude)}</Text>
          <Text>latitude:{this.toNumber(this.state.geo.latitude)}</Text>
          <Text>cityCode:{this.state.geo.cityCode}</Text>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  mapStyle: {
    width: '100%',
    height: '100%',
    zIndex: -10,
  },
  controler: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#E5E9F2AA',
  },
  controlerButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#E5E9F2AA',
  },
});

