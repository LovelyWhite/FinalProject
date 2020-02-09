import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {serverAdress} from '../../app.json';
import WebView from 'react-native-webview';
import {
  request as requestPermission,
  PERMISSIONS,
} from 'react-native-permissions';
import * as GpsInfo from '../../custom/GpsInfo/index';
import {sendMessageToWebview} from '../../utils';

export default class PositionScreen extends React.Component<any, any> {
  webview: React.ReactInstance | null;
  constructor(props: any) {
    super(props);
    this.webview = null;
    this.state = {
      reGeo: false,
      geo: {
        latitude: 0,
        longitude: 0,
        provider: '',
        time: 0,
      },
    };
  }
  componentDidMount() {}
  detectPosition() {
    Promise.all([
      requestPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION),
      requestPermission(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION),
    ]).then(([a, b]) => {
      if (a === 'granted' && b === 'granted') {
        //权限获取成功
      GpsInfo.startListen(
          'gps',
          3000,
          0,
          new GpsInfo.LocationListener('gps',event => {
            sendMessageToWebview(this.webview, event, 'updatePosition');
          }),
        ).then(res=>{
          console.log(res)
        }).catch(res=>{
          Alert.alert("提示",""+res)
         })
      }
    });
  }
  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <WebView
          ref={'webview'}
          source={{uri: serverAdress + 'page/bd-map'}}
          onLoadEnd={() => {
            this.webview = this.refs.webview;
          }}
        />
        <Button
          style={style.controlerButton}
          onPress={this.detectPosition.bind(this)}
          loading={this.state.reGeo}
          icon={<Icon name="ios-sync" size={23} color="#FFFFFF" />}
        />
        <View style={style.controler}>
          <Text>Longitude:{this.state.geo.longitude}</Text>
          <Text>Latitude:{this.state.geo.latitude}</Text>
          <Text>Provider:{this.state.geo.provider}</Text>
          <Text>Time:{this.state.geo.time}</Text>
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
