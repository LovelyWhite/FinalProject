/* eslint-disable react-native/no-inline-styles */
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import PositionScreen from '../pages/tab/Position';
import SettingScreen from '../pages/tab/Setting';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const TabNavigator = createBottomTabNavigator(
  {
    Position: {
      screen: PositionScreen,
    },
    Setting: {
      screen: SettingScreen,
    },
  },
  {
    lazy: true,
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName = '';
        if (routeName === 'Position') {
          iconName = 'ios-pin';
        } else if (routeName === 'Setting') {
          iconName = 'ios-settings';
        }
        let badgeCount = 1;
        return (
          <View>
            <Icon name={iconName} size={30} color={tintColor} />
            <View style={style.badge}>
              <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
                {badgeCount}
              </Text>
            </View>
          </View>
        );
      },
      tabBarLabel: () => {
        const {routeName} = navigation.state;
        if (routeName === 'Position') {
          return <Text style={style.tabBar}>位置</Text>;
        } else if (routeName === 'Setting') {
          return <Text style={style.tabBar}>设置</Text>;
        }
      },
    }),
  },
);
const StackNavigator = createStackNavigator(
  {
    a: TabNavigator,
  },
  {
    initialRouteName: 'Home',
  },
);
const style = StyleSheet.create({
  tabBar: {
    textAlign: 'center',
    color: '#99A9BF',
    fontSize: 13,
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export {StackNavigator, TabNavigator};
