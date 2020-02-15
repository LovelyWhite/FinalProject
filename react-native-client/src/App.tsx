import StackNavigator from './navigator/AppNavigator';
import {createAppContainer} from 'react-navigation';
import React from 'react';

export default class App extends React.Component {
  render() {
    let StackNavigationContainer = createAppContainer(StackNavigator);
    debugger
    return <StackNavigationContainer/>;
  }
}
