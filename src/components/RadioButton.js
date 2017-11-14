import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


class RadioButton extends Component {

  renderRadioButton() {
      return (
        <TouchableOpacity
        style={[styles.radioStyle, { height: this.props.size, width: this.props.size }]}
        onPress={this.props.onPress}
        >
        <Ionicons
        name={this.getIconName()}
        size={23}
        color={'#FF00FF'}
        style={{ backgroundColor: 'transparent' }}
        />
        </TouchableOpacity>
      )
    }

  getIconName() {
    if (this.props.isPressed) {
      return 'ios-radio-button-on';
    }
    return 'ios-radio-button-off';
  }

  render() {
    return (
      <View
      style={{
        flexDirection: 'row',
        margin: 4,
        alignItems: 'center'
      }}
      >
      {this.renderRadioButton()}
      <Text
      style={{ fontSize: 15 }}
      >
      {this.props.name}
      </Text>
      </View>
    );
  }
}

const styles = {
  radioStyle: {
    borderRadius: 20
  }
};

export default RadioButton;
