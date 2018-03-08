import React, { Component } from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { HEIGHT, WIDTH } from 'helpers/Constants';

class CustomButton extends Component {
  getStandardButton() {
    const borderWidth = 0;
    const backgroundColor = '#F7A021';
    return {
      backgroundColor,
      padding: 10,
      borderWidth
    };
  }

  getTintStandardButton() {
    const borderWidth = 0;
    const backgroundColor = 'rgba(247, 160, 33, 0.8)';
    return {
      backgroundColor,
      padding: 10,
      borderWidth
    };
  }

  isDropDownButton() {
    if (this.props.style === 'dropDownButton') {
      return (
        <Ionicons
          style={{ position: 'absolute', right: 10 }}
          name="ios-arrow-dropdown"
          size={25}
          color={this.getStandardButtonText().color}
        />
      );
    }
  }

  getStyle() {
    switch (this.props.style) {
      case 'textButton':
        return styles.textButton;
      case 'standardButton':
        return this.getStandardButton();
      case 'tintStandardButton':
        return this.getTintStandardButton();
      case 'acceptButton':
        return styles.acceptButton;
      case 'alertButton':
        return styles.alertButton;
      case 'dropDownButton':
        return this.getStandardButton();
      default:
        return styles.button;
    }
  }

  getTextStyle() {
    switch (this.props.style) {
      case 'textButton':
        return styles.underlineButtonText;
      case 'standardButton':
        return styles.standardButtonText;
      case 'tintStandardButton':
        return styles.tintStandardButtonText;
      case 'acceptButton':
        return styles.whiteText;
      case 'alertButton':
        return styles.whiteText;
      case 'dropDownButton':
        return styles.standardButtonText;
      default:
        return styles.button;
    }
  }

  render() {
    const { onPress, text, width = WIDTH / 1.5, style = '' } = this.props;
    const { button } = styles;
    return (
      <TouchableOpacity
        disabled={style === 'tintStandardButton'}
        onPress={onPress}
        style={[this.getStyle(), button, { width }]}
      >
        <Text style={[this.getTextStyle()]}>{text}</Text>
        {this.isDropDownButton()}
      </TouchableOpacity>
    );
  }
}

export { CustomButton };
