import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import { Button, ButtonGroup } from 'react-native-elements';
import { View, Text, TouchableHighlight, Alert, StatusBar } from 'react-native';
import { serverAdress } from '../app.json';
import WebView from 'react-native-webview';
import { sendMessageToWebview } from '../utils';
import MenuButton from '../components/MenuButton';

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
  //sendMessageToWebview(this.webview, event, 'updatePosition');
  constructor(props: any) {
    super(props);
    this.webview = null;
    this.state = {
      selectedIndex: 0,
      workState: FLAGS.PLAY,
      geo: {
        latitude: 0,
        longitude: 0,
        provider: '',
        time: 0,
      },
    };
    this.updateIndex = this.updateIndex.bind(this)
    this.listenStateSwitch = this.listenStateSwitch.bind(this)
  }
  componentDidMount() { }
  listenStateSwitch() {
    if (this.state.workState === FLAGS.PLAY) {
      this.setState({
        workState: FLAGS.SYNC
      })

    }
    else {
    }
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
        <StatusBar translucent={true} backgroundColor="#E5E9F2AA" barStyle="dark-content" />
        <WebView
          ref={'webview'}
          source={{ uri: serverAdress + 'page/bd-map' }}
          onLoadEnd={() => {
            this.webview = this.refs.webview;
          }}
        />
        <View style={{
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
        </View>
        <View style={{
          position: 'absolute',
          bottom: 40,
          left: 15,
        }}>
          <Button
            containerStyle={{ elevation: 1 }}
            disabledStyle={{ backgroundColor: '#FFFFFF' }}
            disabled={this.state.workState === FLAGS.SYNC}
            buttonStyle={{ backgroundColor: '#FFFFFF', width: 40, height: 40 }}
            onPress={this.listenStateSwitch}
            loadingProps={{ color: '#000' }}
            loading={this.state.workState === FLAGS.SYNC}
            icon={() => {
              let { workState } = this.state;
              if (workState === FLAGS.PLAY) {
                return < Icon name="ios-play" size={20} color="#000" />
              }
              else if (workState === FLAGS.PAUSE) {
                return < Icon name="ios-pause" size={20} color="#000" />
              }
            }}
          />
        </View>
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
            containerStyle={{ height: 160, width: 40, flexDirection: "column", backgroundColor: '#FFFFFF' }}
          />
        </View>
      </View>
    );
  }
}

