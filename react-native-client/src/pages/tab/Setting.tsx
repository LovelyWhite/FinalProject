import React from 'react';
import {Text} from 'react-native';

class SettingScreen extends React.Component<any, any> {
  render() {
    return this.props.isFocused && <Text>设置</Text>;
  }
}
export default SettingScreen;
