import React from 'react';
import {Magnetometer} from 'expo-sensors';
import {Subscription} from '@unimodules/core';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class RecodingScreen extends React.Component<any, any> {
  _subscription: Subscription | null;
  constructor(props: any) {
    super(props);
    this._subscription = null;
    this.state = {
      MagnetometerData: {
        x: 0,
        y: 0,
        z: 0,
      },
    };
  }
  _subscribe = () => {
    this._subscription = Magnetometer.addListener(result => {
      this.setState({MagnetometerData: result});
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };
  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };

  _slow = () => {
    Magnetometer.setUpdateInterval(1000);
  };

  _fast = () => {
    Magnetometer.setUpdateInterval(16);
  };

  render() {
    let {x, y, z} = this.state.MagnetometerData;

    return (
      <View style={styles.sensor}>
      <Text>磁力计:</Text>
      <Text>x: {x}</Text>
      <Text>y: {y}</Text>
      <Text>z: {z}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={this._toggle} style={styles.button}>
          <Text>切换</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this._slow}
          style={[styles.button, styles.middleButton]}>
          <Text>低速</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._fast} style={styles.button}>
          <Text>高速</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});
