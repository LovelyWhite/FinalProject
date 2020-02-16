import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import { Button, ButtonGroup } from 'react-native-elements';
import { View, Text , TouchableHighlight, Alert, TimePickerAndroid } from 'react-native';
import { serverAdress } from '../app.json';
import WebView from 'react-native-webview';
import {
  request as requestPermission,
  PERMISSIONS,
} from 'react-native-permissions';
import * as GpsInfo from '../custom/GpsInfo/index';
import { sendMessageToWebview } from '../utils';
import MenuButton from '../components/MenuButton';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class PositionScreen extends React.Component<any, any> {
  static navigationOptions = {
    headerShown: false,
  }
  webview: React.ReactInstance | null;
  constructor(props: any) {
    super(props);
    this.webview = null;
    this.state = {
      selectedIndex: 0,
      workState: false,
      geo: {
        latitude: 0,
        longitude: 0,
        provider: '',
        time: 0,
      },
    };
    this.updateIndex = this.updateIndex.bind(this)
    this.detectPosition=this.detectPosition.bind(this)
  }
  componentDidMount() { }
  detectPosition() {
    this.setState({
      workState: true
    })
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
            new GpsInfo.LocationListener('app',event => {
              this.setState({
                geo:event
              })
              if(this.state.workState){
                this.setState({
                  workState: false
                })
              }
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
  updateIndex(selectedIndex: number) {
    this.setState({ selectedIndex })
  }
  render() {
    const buttons = [
      {element:()=><MenuButton icon="ios-cube" description="数据" />},
      {element:()=><MenuButton icon="ios-apps" description="图层" />},
      {element:()=><MenuButton icon="ios-build" description="设置" />}]
    const { selectedIndex } = this.state
    return (
      <View style={{
        width: '100%',
        height: '100%',
      }}>
        <WebView
          ref={'webview'}
          source={{ uri: serverAdress + 'page/bd-map' }}
          onLoadEnd={() => {
            this.webview = this.refs.webview;
          }}
        />
        <View style={{
          position: 'absolute',
          width:'100%',
          top: 0,
          left: 0,
          backgroundColor: '#E5E9F2AA',
        }}>
          <Text>经度:{this.state.geo.longitude}</Text>
          <Text>纬度:{this.state.geo.latitude}</Text>
          <Text>时间:{new Date(this.state.geo.time).toUTCString()}</Text>
          <Text>数据提供:{this.state.geo.provider}</Text>
        </View>
        <View style={{
          position: 'absolute',
          bottom: 50,
          left: 10,
        }}>
          <Button
            disabled={this.state.workState}
            buttonStyle={{ backgroundColor: '#00000044',width:40,height:40 }}
            onPress={this.detectPosition}
            loading={this.state.workState}
            icon={<Icon name="ios-sync" size={20} color="#FFFFFF" />}
          />
        </View>
        <View style={{
          position: 'absolute',
          top: 40,
          right: 10,
        }}>
          <ButtonGroup
            underlayColor={'#AAA'}
            Component={TouchableHighlight }
            textStyle={{color:'white',fontSize:13}}
            innerBorderStyle={{width:0}}
            selectedButtonStyle={{backgroundColor:'#FFFFFF'}}
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{height: 145, width: 35, flexDirection: "column",backgroundColor: '#FFFFFF'}}
          />
        </View>
      </View>
    );
  }
}

