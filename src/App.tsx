import AppNavigator from './navigator/AppNavigator';
import {createAppContainer} from 'react-navigation';
import React from 'react';

export default class App extends React.Component {
  render() {
    let NavigationContainer = createAppContainer(AppNavigator);
    return <NavigationContainer />;
  }
}
