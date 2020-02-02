/* eslint-disable react-native/no-inline-styles */
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
import {Text, Button, View} from 'react-native';
import Page1 from '../pages/page1';
import Page2 from '../pages/page2';
import {createAppContainer} from 'react-navigation';
class HomePage extends React.Component<{navigation: any}> {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>HomePage</Text>
        <Button
          title="Go to Page1"
          onPress={() => this.props.navigation.navigate('Page1')}
        />
        <Button
          title="Go to Page2"
          onPress={() => this.props.navigation.navigate('Page2')}
        />
      </View>
    );
  }
}
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: () => ({
        title: 'home',
      }),
    },
    Page1: {
      screen: Page1,
      navigationOptions: () => ({
        title: 'page1',
        headerBackTitleVisible: true,
      }),
    },
    Page2: {
      screen: Page2,
      navigationOptions: props => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;
        return {
          title: params && params.title ? params.title : 'abc',
          headerRight: () => (
            <Button
              title={params && params.mode === 'edit' ? '保存' : '编辑'}
              onPress={() =>
                setParams({
                  mode: params && params.mode === 'edit' ? '' : '保存',
                })
              }
            />
          ),
        };
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);
export default createAppContainer(AppNavigator);
