import React, { Component } from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;

class CustomButton extends Component {
  getUnderlineButtonText() {
    const color = '#ffffff';
    return {
      color,
      textDecorationLine: 'underline',
      fontFamily: 'Avenir Next Medium'
    };
  }

  getStandardButtonText() {
    const color = 'white';
    return {
      color,
      fontSize: 16,
      fontFamily: 'Avenir Next Medium'
    };
  }
  getTintStandardButtonText() {
    const color = 'rgba(255, 255, 255, 0.5)';
    return {
      color,
      fontSize: 16,
      fontFamily: 'Avenir Next Medium'
    };
  }

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
          name={'ios-arrow-dropdown'}
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
        return this.getUnderlineButtonText();
      case 'standardButton':
        return this.getStandardButtonText();
      case 'tintStandardButton':
        return this.getTintStandardButtonText();
      case 'acceptButton':
        return styles.whiteText;
      case 'alertButton':
        return styles.whiteText;
      case 'dropDownButton':
        return this.getStandardButtonText();
      default:
        return styles.button;
    }
  }

  render() {
    const { onPress, text, width = WIDTH / 1.5 } = this.props;
    const { button } = styles;
    return (
      <TouchableOpacity onPress={onPress} style={[this.getStyle(), button, { width }]}>
        <Text style={[this.getTextStyle()]}>{text}</Text>
        {this.isDropDownButton()}
      </TouchableOpacity>
    );
  }
}

const styles = {
  button: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  textButton: {
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  acceptButton: {
    backgroundColor: 'green',
    height: 44
  },
  alertButton: {
    height: Dimensions.get('window').height / (4 * 4),
    backgroundColor: '#f4376d',
    borderRadius: 0,
    margin: 0,
    marginLeft: 0.4,
    marginRight: 0.4
  },
  dropDownButton: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteText: {
    color: '#f4376d',
    fontSize: 16,
    fontFamily: 'Avenir Next Medium'
  },
  blackText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Avenir Next Medium'
  }
};

export default CustomButton;
