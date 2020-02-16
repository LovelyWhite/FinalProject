import React from 'react';
import { Text, StatusBar } from 'react-native';
import { Divider } from 'react-native-elements';

export default class SettingScreen extends React.Component<any, any> {
  render() {
    return (<><StatusBar translucent={true} backgroundColor="#FFF" barStyle="dark-content" />
      <Text>设置</Text>
    </>
    );
  }
}

