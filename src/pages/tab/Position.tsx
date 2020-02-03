import React from 'react';
import {
  MapView,
  MapTypes,
  Geolocation,
  Overlay,
  MapApp,
} from 'react-native-baidu-map';
import {withNavigationFocus} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import {Button, Card} from 'react-native-elements';
import {StyleSheet, Alert, View, Text} from 'react-native';
interface GeoResult {
  address: String;
  altitude: number;
  buildingId: null;
  buildingName: null;
  city: String;
  cityCode: String;
  country: String;
  countryCode: String;
  direction: number;
  district: String;
  latitude: number;
  longitude: number;
  province: String;
  radius: number;
  speed: number;
  street: String;
  streetNumber: String;
}
class PositionScreen extends React.Component<
  any,
  {geo: GeoResult | {}; reGeo: boolean}
> {
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

  componentDidMount() {
    this.detectPosition();
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
      <>
        <View>
          {this.props.isFocused && (
            <MapView
              style={style.mapStyle}
              center={{
                latitude: this.state.geo.latitude,
                longitude: this.state.geo.longitude,
              }}
              zoom={16}
              zoomControlsVisible={false}
              scrollGesturesEnabled={false}
              showsUserLocation={true}
              zoomGesturesEnabled={false}
              mapType={1}
            />
          )}
        </View>
        <Card
          containerStyle={style.controler}
          titleStyle={style.controlerTitle}
          title={'控制台'}>
          <Text>address:{this.state.geo.address}</Text>
          <Text>longitude:{this.toNumber(this.state.geo.longitude)}</Text>
          <Text>latitude:{this.toNumber(this.state.geo.latitude)}</Text>
          <Text>cityCode:{this.state.geo.cityCode}</Text>
          <Button
            onPress={this.detectPosition.bind(this)}
            loading={this.state.reGeo}
            icon={<Icon name="ios-sync" size={23} color="#FFFFFF" />}
          />
        </Card>
      </>
    );
  }
}
const style = StyleSheet.create({
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  controler: {
    position: 'absolute',
    top: 4,
    right: 5,
    backgroundColor: '#E5E9F2AA',
    width: '60%',
    height: '50%',
    margin: 3,
    padding: 3,
  },
  controlerTitle: {
    fontSize: 13,
    color: '#99A9BF',
    marginBottom: 0,
    padding: 0,
  },
});
export default withNavigationFocus(PositionScreen);
