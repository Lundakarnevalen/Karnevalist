import React, { Component } from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;

class CustomButton extends Component {
  getUnderlineButtonText() {
    let color;
    switch (this.props.theme) {
      case 'morning':
        color = '#ffffff';
        break;
      case 'day':
        color = 'rgb(138, 71, 151)';
        break;
      default:
        color = '#ffffff';
    }
    return {
      color,
      textDecorationLine: 'underline',
      fontFamily: 'Avenir Next Medium'
    };
  }

  getStandardButtonText() {
    let color;
    switch (this.props.theme) {
      case 'morning':
        color = '#F7A021';
        break;
      case 'day':
        color = '#f4376d';
        break;
      default:
        color = 'white';
    }
    return {
      color,
      fontSize: 20,
      fontFamily: 'Avenir Next Medium'
    };
  }

  getStandardButton() {
    let borderWidth = 1;
    let backgroundColor;
    let borderColor;
    switch (this.props.theme) {
      case 'morning':
        backgroundColor = 'white';
        borderColor = '#F7A021';
        break;
      case 'day':
        backgroundColor = 'white';
        borderColor = '#f4376d';
        break;
      default:
        backgroundColor = '#F7A021';
        borderWidth = 0;
    }
    return {
      backgroundColor,
      padding: 10,
      borderWidth,
      borderColor
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
    fontSize: 20,
    fontFamily: 'Avenir Next Medium'
  },
  blackText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Avenir Next Medium'
  }
};

const mapStateToProps = ({ currentTheme }) => {
  const { theme } = currentTheme;
  return { theme };
};

export default connect(mapStateToProps, null)(CustomButton);
