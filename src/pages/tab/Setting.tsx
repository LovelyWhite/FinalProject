import React from 'react';
import {Text} from 'react-native';
import {withNavigationFocus} from 'react-navigation';

class SettingScreen extends React.Component<any, any> {
  render() {
    return this.props.isFocused && <Text>设置</Text>;
  }
}
export default withNavigationFocus(SettingScreen);
