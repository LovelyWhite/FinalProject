/* eslint-disable react-native/no-inline-styles */
import { createStackNavigator } from 'react-navigation-stack';
import PositionScreen from '../pages/Position';
import SettingScreen from '../pages/Setting';
import RecodingScreen from '../pages/Recoding';
// import Icon from 'react-native-vector-icons/Ionicons';
// import React from 'react';
const StackNavigator = createStackNavigator({
  Position: {
    screen: PositionScreen,
  },
  Recoding: {
    screen: RecodingScreen,
  },
  Setting: {
    screen: SettingScreen,
  }
});

export default StackNavigator;
