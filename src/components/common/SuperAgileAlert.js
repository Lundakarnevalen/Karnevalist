import React, { Component } from 'react';
import { View, Text, Modal, TouchableHighlight } from 'react-native';
import CustomButton from './CustomButton';

class SuperAgileAlert extends Component {

  constructor(props) {
  super(props);
  this.state = {
    modalIsVisable: true
  }
}

onPress() {
  console.log('pressed')
}

  render() {
    return (
      <Modal
      style={{ justifyContent: 'center' }}
      transparent
      visible={this.state.modalIsVisable}
      >
      <View
      style={{ alignItems: 'center' }}
      transparent={false}
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
      </Modal>
    );
  }
}

export default SuperAgileAlert;
