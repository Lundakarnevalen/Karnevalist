import React, { Component } from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;

class CustomButton extends Component {
  getStyle() {
    switch (this.props.style) {
      case 'textButton':
        return styles.textButton;
      case 'standardButton':
        return styles.standardButton;
      case 'acceptButton':
        return styles.acceptButton;
      case 'alertButton':
        return styles.alertButton;
      default:
        return styles.button;
    }
  }

  getTextStyle() {
    switch (this.props.style) {
      case 'textButton':
        return styles.underlineText;
      case 'standardButton':
        return styles.whiteText;
      case 'acceptButton':
        return styles.whiteText;
      case 'alertButton':
        return styles.whiteText;
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
      </TouchableOpacity>
    );
  }
}

const styles = {
  button: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'black',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  standardButton: {
    backgroundColor: '#fff',
    padding: 10
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
  whiteText: {
    color: '#f4376d',
    fontSize: 20,
    fontFamily: 'Avenir Next Medium'
  },
  underlineText: {
    color: 'rgb(138, 71, 151)',
    textDecorationLine: 'underline',
    fontFamily: 'Avenir Next Medium'
  },
  blackText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Avenir Next Medium'
  }
};

export default CustomButton;
