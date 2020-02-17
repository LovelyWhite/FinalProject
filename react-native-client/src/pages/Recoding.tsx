import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';

export default class RecodingScreen extends React.Component<any, any> {
  render() {
    return (<><StatusBar translucent={true} backgroundColor="#FFF" barStyle="dark-content" />
      <Text>设置</Text>
    </>
    );
  }
}
