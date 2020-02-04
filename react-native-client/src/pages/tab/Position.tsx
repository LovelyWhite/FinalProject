import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import {StyleSheet, Alert, View, Text} from 'react-native';

class PositionScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      reGeo: false,
      geo: {
        longitude: 0,
        latitude: 0,
      },
    };
  }
  detectPosition() {
    this.setState({
      reGeo: true,
    });
    Geolocation.getCurrentPosition('bd09ll')
      .then((res: GeoResult) => {
        if (res.latitude === 5e-324) {
          throw Error('定位失败');
        }
        Alert.alert('提示', '位置加载成功', [{text: '确定'}], {
          cancelable: false,
        });
        this.setState({geo: res}, () => {
          console.log(res);
        });
      })
      .catch((res: GeoResult) => {
        Alert.alert(
          '提示',
          '位置加载失败，请检查GPS是否开启，重新加载？',
          [{text: '确定', onPress: () => this.detectPosition()}],
          {cancelable: false},
        );
      })
      .finally(() => {
        this.setState({
          reGeo: false,
        });
      });
  }
  toNumber(num: number) {
    let numStr = num.toString();
    let temp: string[] = numStr.toUpperCase().split('E+');
    if (!temp[1]) {
      return numStr;
    }
    let tempNumStr: string = '1';
    for (let i = 0; i < parseInt(temp[1], 10); i++) {
      tempNumStr += '0';
    }
    return tempNumStr;
  }
  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Button
          style={style.controlerButton}
          onPress={this.detectPosition.bind(this)}
          loading={this.state.reGeo}
          icon={<Icon name="ios-sync" size={23} color="#FFFFFF" />}
        />
        <View style={style.controler}>
          <Text>address:{this.state.geo.address}</Text>
          <Text>longitude:{this.toNumber(this.state.geo.longitude)}</Text>
          <Text>latitude:{this.toNumber(this.state.geo.latitude)}</Text>
          <Text>cityCode:{this.state.geo.cityCode}</Text>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  mapStyle: {
    width: '100%',
    height: '100%',
    zIndex: -10,
  },
  controler: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#E5E9F2AA',
  },
  controlerButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#E5E9F2AA',
  },
});
export default PositionScreen;
