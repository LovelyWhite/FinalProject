import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, ButtonGroup } from 'react-native-elements';
import { View, Text, TouchableHighlight, Alert, StatusBar } from 'react-native';
import { serverAdress } from '../app.json';
import WebView from 'react-native-webview';
import {
  request as requestPermission,
  PERMISSIONS,
} from 'react-native-permissions';
import * as GpsInfo from '../custom/GpsInfo/index';
import { sendMessageToWebview } from '../utils';
import MenuButton from '../components/MenuButton';
import { Searchbar } from 'react-native-paper';

enum FLAGS {
  PLAY,
  PAUSE,
  SYNC
}

export default class PositionScreen extends React.Component<any, any> {
  static navigationOptions = {
    headerShown: false,
  }
  webview: React.ReactInstance | null;
  locationListener: GpsInfo.LocationListener
  constructor(props: any) {
    super(props);
    this.webview = null;
    this.locationListener = new GpsInfo.LocationListener('app', event => {
      this.setState({
        geo: event
      })
      sendMessageToWebview(this.webview, event, 'updatePosition');
    })
    this.state = {
      ready: true,//地图是否加载
      selectedIndex: 0,
      workState: FLAGS.PLAY, firstQuery: '',
      geo: {
        latitude: 0,
        longitude: 0,
        provider: '',
        time: 0,
      },
    };
    this.updateIndex = this.updateIndex.bind(this)
    this.listenStateSwitch = this.listenStateSwitch.bind(this)
    this.reloadMap = this.reloadMap.bind(this)

  }
  componentDidMount() { }
  async listenStateSwitch() {
    if (this.state.workState === FLAGS.PLAY) {
      let [a, b] = await Promise.all([
        requestPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION),
        requestPermission(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION),
      ]);
      if (a === 'granted' && b === 'granted') {
        this.setState({
          workState: FLAGS.SYNC
        })
        //权限获取成功
        GpsInfo.startListen(
          'gps',
          3000,
          0,
          this.locationListener,
        ).then(res => {
          this.setState({
            workState: FLAGS.PAUSE
          })
        }).catch(res => {
          this.setState({
            workState: FLAGS.PLAY
          })
          Alert.alert("提示", "" + res)
        })
      }
    }
    else {
      GpsInfo.stopListen(this.locationListener).then(res => {
        this.setState({
          workState: FLAGS.PLAY
        })
      }).catch(res => {
        Alert.alert("提示", "" + res)
      })
    }
  }
  reloadMap() {
    this.webview && this.webview.reload()
  }
  updateIndex(selectedIndex: number) {
    this.setState({ selectedIndex })
    switch (selectedIndex) {
      case 0: { // 数据
        this.props.navigation.navigate('Recoding')
      } break;
      case 1: { //图层

      } break;
      case 2: { //设置
        this.props.navigation.navigate('Setting')
      }
    }
  }
  render() {
    const buttons = [
      { element: () => <MenuButton icon="ios-cube" description="数据" /> },
      { element: () => <MenuButton icon="ios-apps" description="图层" /> },
      { element: () => <MenuButton icon="ios-build" description="设置" /> }]
    const { selectedIndex } = this.state
    return (
      <View style={{
        width: '100%',
        height: '100%',
      }}>
        <StatusBar translucent={true} backgroundColor="#00000000" barStyle="dark-content" />
        <WebView
          ref={'webview'}
          scalesPageToFit={false}
          source={{ uri: serverAdress + 'page/bd-map' }}
          startInLoadingState={true}
          onLoadEnd={() => {
            this.webview = this.refs.webview;
          }}
          onError={() => {
            this.setState({
              ready: false
            })
          }}
          renderError={() =>
            <View
              style={{ backgroundColor: '#FFF', width: '100%', height: '100%', justifyContent: "center", alignItems: "center" }}>
              <MaterialIcons name={'error-outline'} size={40} />
              <Text style={{ fontSize: 12 }}>地图加载失败</Text>
            </View>}
        />
        {/* <View style={{
          position: 'absolute',
          width: '100%',
          top: StatusBar.currentHeight,
          left: 0,
          padding: 5,
          backgroundColor: '#E5E9F2AA',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <View>
            <Text>经度:{this.state.geo.longitude}</Text>
            <Text>纬度:{this.state.geo.latitude}</Text>
            <Text>时间:{new Date(this.state.geo.time).toUTCString()}</Text>
          </View>
          <Text style={{ fontSize: 14, color: '#AAA' }}>{this.state.geo.provider}</Text>
        </View> */}

        <View style={{
          position: 'absolute',
          bottom: 40,
          left: 15,
        }}>
          <Button
            containerStyle={{ borderColor: '#CCC', borderWidth: 1 }}
            disabledStyle={{ backgroundColor: '#AAAAAA' }}
            disabled={this.state.workState === FLAGS.SYNC}
            buttonStyle={{ backgroundColor: '#FFFFFF', width: 40, height: 40 }}
            onPress={this.listenStateSwitch}
            loadingProps={{ color: '#000' }}
            loading={this.state.workState === FLAGS.SYNC}
            icon={() => {
              let { workState } = this.state;
              if (workState === FLAGS.PLAY) {
                return < Ionicons name="ios-play" size={20} color="#000" />
              }
              else if (workState === FLAGS.PAUSE) {
                return < Ionicons name="ios-pause" size={20} color="#000" />
              }
            }}
          />
        </View>
        {!this.state.ready && <View style={{
          position: 'absolute',
          bottom: 85,
          left: 15,
        }}>
          <Button
            containerStyle={{ borderColor: '#CCC', borderWidth: 1 }}
            disabledStyle={{ backgroundColor: '#AAAAAA' }}
            buttonStyle={{ backgroundColor: '#FFFFFF', width: 40, height: 40 }}
            onPress={this.reloadMap}
            icon={< Ionicons name="md-sync" size={20} color="#000" />}
            type="clear"
          />
        </View>}
        <View style={{
          position: 'absolute',
          bottom: 40,
          right: 10,
        }}>
          <ButtonGroup
            underlayColor={'#AAA'}
            Component={TouchableHighlight}
            textStyle={{ color: 'white', fontSize: 13 }}
            innerBorderStyle={{ width: 0 }}
            selectedButtonStyle={{ backgroundColor: '#FFFFFF' }}
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{ height: 180, width: 45, flexDirection: "column", backgroundColor: '#FFFFFF' }}
          />
        </View>
        <View style={{ position: 'absolute', top: (15 + StatusBar.currentHeight), left: 20, right: 20 }}>
          <Searchbar
            inputStyle={{ fontSize: 15 }}
            style={{ opacity: 0.9 }}
            placeholder="搜索"
            onChangeText={query => { this.setState({ firstQuery: query }); }}
            value={this.state.firstQuery}
          />
        </View>
      </View >
    );
  }
}

