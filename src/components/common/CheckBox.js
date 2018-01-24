import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false
    };
  }

  getIconName() {
    if (this.props.value) {
      return 'check-box';
    }
    return 'check-box-outline-blank';
  }

  render() {
    const { size, color, onPress } = this.props;
    const { textStyle, checkBoxStyle } = styles;
    return (
      <TouchableOpacity style={checkBoxStyle} onPress={onPress}>
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
  checkBoxStyle: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  textStyle: {
    fontSize: 16,
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Medium'
  }
};

export { CheckBox };
