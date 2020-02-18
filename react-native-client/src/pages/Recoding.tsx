import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';

export default class RecodingScreen extends React.Component<any, any> {
  static navigationOptions = {
    animationTypeForReplace: 'pop'
  }
  constructor(props: any) {
    super(props);
  }
  render() {
    return (<><StatusBar translucent={true} backgroundColor="#00000000" barStyle="dark-content" />
    </>
    );
  }
}
