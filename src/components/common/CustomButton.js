import React, { Component } from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';

const width = Dimensions.get('window').width

class CustomButton extends Component {

  getStyle() {
      switch (this.props.style) {
        case 'textButton':
          return styles.textButton;
        case 'standardButton':
          return styles.standardButton;
        case 'acceptButton':
          return styles.acceptButton;
        default:
            return styles.button;
      }
  }

  getTextStyle() {
    switch (this.props.style) {
      case 'textButton':
        return styles.blueText;
      case 'standardButton':
        return styles.whiteText;
      case 'acceptButton':
        return styles.whiteText;
      default:
          return styles.button;
    }
  }

  render() {
    const { onPress, text } = this.props;
    const { button } = styles;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          this.getStyle(),
          button
        ]}
      >
        <Text style={[this.getTextStyle()]}>
          {text}
        </Text>
      </TouchableOpacity>);
    }
  }

  const styles = {
    button: {
      marginTop: 10,
      marginBottom: 10,
      borderColor: 'black',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textButton: {
      backgroundColor: 'transparent',
      borderWidth: 0
    },
    standardButton: {
      backgroundColor: '#f4376d',
      padding: 10,
      width: width / 1.5
    },
    acceptButton: {
      backgroundColor: 'green',
      height: 44
    },
    whiteText: {
      color: 'white',
      fontSize: 20
    },
    blueText: {
      color: 'blue',
      textDecorationLine: 'underline'
    },
    blackText: {
      color: 'black',
      fontSize: 20
    }
  };

  export default CustomButton;
