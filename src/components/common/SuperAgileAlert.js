import React, { Component } from 'react';
import { View, Text, Modal, TouchableHighlight } from 'react-native';
import CustomButton from './CustomButton';

class SuperAgileAlert extends Component {

  constructor(props) {
  super(props);
  this.state = {
    visible: false
  }
}

onPress(visible) {
  this.setState({ modalVisible: visible });
}

  render() {
    console.log(this.props.alertVisible)
    return (
      <Modal
      transparent
      visible={this.props.alertVisible}
      >
        <View
        style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        transparent={false}
        >
        <View
        style={{ width: 300, height: 300, backgroundColor: '#000' }}
        >
          <Text>{this.props.header}</Text>
          <Text>{this.props.info}</Text>
          <CustomButton
          onPress={this.onPress}
          text={'Ja'}
          />
          <CustomButton
          onPress={this.onPress}
          text={'Nej'}
          />
          </View>
        </View>
      </Modal>
    );
  }
}

export default SuperAgileAlert;
