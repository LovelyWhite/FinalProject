import React from 'react';
import { Text, StatusBar } from 'react-native';
import { List } from 'react-native-paper';

export default class SettingScreen extends React.Component<any, any> {
  state = {
    expanded: true
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });
  render() {
    return (<><StatusBar translucent={true} backgroundColor="#00000000" barStyle="dark-content" />
      <List.Section title="Accordions">
        <List.Accordion
          title="Uncontrolled Accordion"
          left={props => <List.Icon {...props} icon="folder" />}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>

        <List.Accordion
          title="Controlled Accordion"
          left={props => <List.Icon {...props} icon="folder" />}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
    </>
    );
  }
}

