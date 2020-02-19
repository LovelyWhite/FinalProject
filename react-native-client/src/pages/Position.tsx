import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, ButtonGroup, Tooltip, Overlay } from 'react-native-elements';
import { View, Text, TouchableHighlight, Alert, StatusBar, TouchableWithoutFeedback, Animated, Easing, Surface, ScrollView, GestureResponderEvent } from 'react-native';
import { serverAdress } from '../app.json';
import WebView from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen'
import {
  request as requestPermission,
  PERMISSIONS,
} from 'react-native-permissions';
import * as GpsInfo from '../custom/GpsInfo/index';
import { sendMessageToWebview } from '../utils';
import MenuButton from '../components/MenuButton';
import { Searchbar, Chip } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import Loading from '../components/Loading';
enum FLAGS {
  PLAY,
  PAUSE,
  SYNC
}

export default class PositionScreen extends React.Component<any, any> {
  static navigationOptions = {
    headerShown: false,
  }
  static statusHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 15
  webview: any;
  RBSheet: any;
  searchBar: any;
  locationListener: GpsInfo.LocationListener;
  touchXY: number;
  touchTime: number;
  constructor(props: any) {
    super(props);
    this.locationListener = new GpsInfo.LocationListener('app', event => {
      this.setState({
        geo: event
      })
      sendMessageToWebview(this.webview, event, 'updatePosition');
    })
    this.touchXY = 0
    this.touchTime = 0
    this.state = {
      show: true,
      disappearDistance: new Animated.Value(0),
      disappearOpacity: new Animated.Value(1),
      ready: true,//地图是否加载
      selectedIndex: 0,
      workState: FLAGS.PLAY,//传感器工作状态
      mapSync: FLAGS.SYNC,//地图状态
      firstQuery: '',
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
    this.pressIn = this.pressIn.bind(this)
    this.pressOut = this.pressOut.bind(this)
  }
  componentDidMount() {
    SplashScreen.hide();
  }
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
      else {
        Alert.alert("提示", "未授权")
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
    this.setState({
      mapSync: FLAGS.SYNC
    })
    this.webview && this.webview.reload()
  }
  updateIndex(selectedIndex: number) {
    this.setState({ selectedIndex })
    switch (selectedIndex) {
      case 0: { // 数据
        this.props.navigation.navigate('Recoding')
      } break;
      case 1: { //图层
        this.RBSheet.open();
      } break;
      case 2: { //设置
        this.props.navigation.navigate('Setting')
      }
    }
  }
  //定义移入操作
  pressIn(r: GestureResponderEvent) {
    this.touchTime = r.nativeEvent.timestamp
    this.touchXY = Math.pow(r.nativeEvent.pageX, 2) + Math.pow(r.nativeEvent.pageY, 2)
  }
  pressOut(r: GestureResponderEvent) {
    if (this.searchBar.isFocused()) {
      this.searchBar.blur()
    }
    else {
      if (this.state.ready) {
        if (Math.abs(this.touchXY - (Math.pow(r.nativeEvent.pageX, 2) + Math.pow(r.nativeEvent.pageY, 2))) < 0.00000001) {
          this.state.disappearDistance.stopAnimation()
          this.state.disappearOpacity.stopAnimation()
          Animated.parallel([
            Animated.timing(this.state.disappearDistance, {
              toValue: this.state.show ? -20 : 0,
              duration: 100,
              easing: Easing.linear,
            }),
            Animated.timing(this.state.disappearOpacity, {
              toValue: this.state.show ? 0 : 1,
              duration: 50,
              easing: Easing.linear,
            })
          ]).start(() => {
            this.setState({
              show: !this.state.show
            })
          });
        }
        else {
        }
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
        <TouchableWithoutFeedback
          onPressIn={this.pressIn}
          onPressOut={this.pressOut}
        >
          <WebView ref={ref => {
            this.webview = ref
          }}
            onLoadEnd={() => {
              this.setState({
                mapSync: FLAGS.PLAY
              })
            }}
            scalesPageToFit={false}
            source={{ uri: serverAdress + 'page/bd-map' }}
            startInLoadingState={true}
            onError={() => { this.setState({ ready: false }) }}
            renderError={() =>
              <TouchableWithoutFeedback
                onPressIn={this.pressIn}
                onPressOut={this.pressOut}>
                <View style={{ position: 'absolute', flex: 1, backgroundColor: '#FFFFFF', width: '100%', height: '100%', justifyContent: "center", alignItems: "center" }}>
                  <MaterialIcons name={'error-outline'} size={35} />
                  <Text style={{ fontSize: 12 }}>地图加载失败</Text>
                </View>
              </TouchableWithoutFeedback>}
            renderLoading={() => <Loading />}
          />
        </TouchableWithoutFeedback>
        <RBSheet
          closeOnDragDown={true}
          animationType={'slide'}
          ref={ref => {
            this.RBSheet = ref;
          }}
          customStyles={{
            wrapper: { backgroundColor: '#00000000' },
          }}
          height={200}
          duration={200}>
          <ScrollView
            contentContainerStyle={{ flexDirection: "row", flexWrap: 'wrap' }}
            alwaysBounceVertical={true}>
            <Chip style={{ margin: 3, paddingHorizontal: 3 }} icon={'crosshairs-gps'} onPress={() => console.log(111)}>显示坐标</Chip>
          </ScrollView>

        </RBSheet>
        <Animated.View
          pointerEvents={this.state.show ? 'box-none' : 'none'}
          style={{ top: this.state.disappearDistance, position: 'absolute', width: '100%', height: '50%', backgroundColor: '#00000000', opacity: this.state.disappearOpacity }}>
          <Searchbar
            ref={ref => {
              this.searchBar = ref
            }}
            inputStyle={{ fontSize: 15 }}
            style={{ marginTop: 10 + PositionScreen.statusHeight, marginHorizontal: 10 }}
            placeholder="搜索"
            onChangeText={query => { this.setState({ firstQuery: query }); }}
            value={this.state.firstQuery}
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

          <Button
            containerStyle={{
              borderColor: '#e3e3e3',
              borderWidth: 1,
              borderRadius: 3,
              backgroundColor: '#fff',
              width: 40,
              height: 40,
              marginTop: 5,
              position: 'absolute',
              top: 90,
              right: 10
            }}
            disabledStyle={{ backgroundColor: '#AAAAAA' }}
            disabled={this.state.workState === FLAGS.SYNC}
            buttonStyle={{ backgroundColor: '#FFFFFF', width: 38, height: 38 }}
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
            }} />
          <Button
            containerStyle={{
              borderColor: '#e3e3e3',
              borderWidth: 1,
              borderRadius: 3,
              backgroundColor: '#fff',
              width: 40,
              height: 40,
              position: 'absolute',
              top: 137,
              right: 10
            }}
            disabled={this.state.mapSync === FLAGS.SYNC}
            disabledStyle={{ backgroundColor: '#AAAAAA' }}
            buttonStyle={{ backgroundColor: '#FFFFFF', width: 38, height: 38 }}
            onPress={this.reloadMap}
            icon={< Ionicons name="md-sync" size={18} color="#000" />}
          />
        </Animated.View>
        <Animated.View
          pointerEvents={this.state.show ? 'box-none' : 'none'}
          style={{ bottom: this.state.disappearDistance, position: 'absolute', opacity: this.state.disappearOpacity, flexDirection: 'column-reverse', width: '100%', height: '50%', backgroundColor: '#00000000' }}>
          <ButtonGroup
            underlayColor={'#AAA'}
            Component={TouchableHighlight}
            textStyle={{ color: 'white', fontSize: 13 }}
            innerBorderStyle={{ width: 0 }}
            selectedButtonStyle={{ backgroundColor: '#FFFFFF' }}
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{ position: "absolute", right: 10, bottom: 10, marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0, height: 180, width: 40, flexDirection: "column", backgroundColor: '#FFFFFF' }}
            buttonStyle={{ margin: 0 }}
          />
        </Animated.View>
      </View >
    );
  }
}

