import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: true
    };
  }

  getIconName() {
    if (this.props.isPressed) {
      return 'check-box';
    }
    return 'check-box-outline-blank';
  }

  render() {
    const { size, onPress, color } = this.props;
    const { textStyle, multipleChoiceStyle } = styles;
    return (
      <TouchableOpacity style={multipleChoiceStyle} onPress={onPress}>
        <MaterialIcons
          name={this.getIconName()}
          size={size}
          color={color}
          style={{ backgroundColor: 'transparent' }}
        />
        <Text style={[textStyle, { color }]}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  multipleChoiceStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  textStyle: {
    fontSize: 16,
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold'
  }
};

export { CheckBox };
