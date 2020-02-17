import React from 'react';
import { Text, StatusBar } from 'react-native';

export default class SettingScreen extends React.Component<any, any> {
  render() {
    return (<><StatusBar translucent={true} backgroundColor="#00000000" barStyle="dark-content" />
      <Text>设置</Text>
    </>
    );
  }
}

