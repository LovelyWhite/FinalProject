import React from "react";
import { Overlay } from "react-native-elements";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Animated, Easing, View } from "react-native";
export default class Loading extends React.Component<{ text: string | undefined; visiable: boolean }, { rotateValue: Animated.Value }>
{
  constructor(props: Readonly<{ text: string | undefined; visiable: boolean }>) {
    super(props);
    this.state = {
      rotateValue: new Animated.Value(0),
    };
  }
  componentDidMount() {
    this.state.rotateValue.setValue(0);
    Animated.timing(this.state.rotateValue, {
      toValue: 360000,
      duration: 800000,
      easing: Easing.linear
    }).start();
  }
  render() {
    return (
      <Overlay width={80} height={80} overlayStyle={{ justifyContent: "center", alignItems: "center" }} isVisible={this.props.visiable}>
        <Animated.View style={{
          width: 30,
          height: 30,
          transform: [{
            rotateZ: this.state.rotateValue.interpolate({
              inputRange: [0, 360000],
              outputRange: ['0deg', '360000deg']
            })
          }]
        }} >
          <AntDesign style={{ width: 30, height: 30 }} name={'loading2'} size={30} ></AntDesign>
        </Animated.View>
      </Overlay>
    )
  }
}