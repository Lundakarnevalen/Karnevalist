import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class CheckBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPressed: true
    };
  }

  renderCheckbox() {
    const { size, onPress, color } = this.props
      return (
        <TouchableOpacity
        style={[styles.multipleChoiceStyle, { height: size, width: size }]}
        onPress={onPress}
        >
        <MaterialIcons
        name={this.getIconName()}
        size={size}
        color={color}
        style={{ backgroundColor: 'transparent' }}
        />
        </TouchableOpacity>
      );
  }

  getIconName() {
    if (this.props.isPressed) {
      return 'check-box';
    }
    return 'check-box-outline-blank';
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
      {this.renderCheckbox()}
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
  multipleChoiceStyle: {
    borderRadius: 5
  }
};

export default CheckBox;
