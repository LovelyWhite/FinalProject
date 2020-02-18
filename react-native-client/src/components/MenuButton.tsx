import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text } from "react-native";

export default class MenuButton extends React.Component<{
    icon: string,
    description: string
}, any>{
    constructor(props: Readonly<{ icon: string; description: string; }>) {
        super(props);
    }
    render() {
        return (<View style={{ alignItems: "center" }}>
            <Ionicons name={this.props.icon} size={20}></Ionicons>
            <Text style={{ fontSize: 11, textAlign: "center" }}>{this.props.description}</Text>
        </View>)
    }
}