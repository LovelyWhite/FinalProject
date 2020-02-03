import React from 'react';
import {
  MapView,
  MapTypes,
  Geolocation,
  Overlay,
  MapApp,
} from 'react-native-baidu-map';
import {withNavigationFocus} from 'react-navigation';

import {StyleSheet, Alert, Button} from 'react-native';
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
class PositionScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      geo: {
        latitude: 0,
        longitude: 0,
      },
    };
  }

  componentDidMount() {
    this.detectPosition();
  }

  detectPosition() {
    Geolocation.getCurrentPosition('bd09ll')
      .then((res: GeoResult) => {
        if (res.latitude === 5e-324) {
          throw Error('定位失败');
        }
        Alert.alert('提示', '位置加载成功', [{text: '确定'}], {
          cancelable: false,
        });
        this.setState({geo: res});
      })
      .catch((res: GeoResult) => {
        Alert.alert(
          '提示',
          '位置加载失败，请检查GPS是否开启，重新加载？',
          [{text: '确定', onPress: () => this.detectPosition()}],
          {cancelable: false},
        );
      });
  }
  render() {
    return (
      <>
        <Button onPress={this.detectPosition.bind(this)} title={'点击'} />
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
      </>
    );
  }
}
const style = StyleSheet.create({
  mapStyle: {
    width: '100%',
    height: '100%',
  },
});
export default withNavigationFocus(PositionScreen);
