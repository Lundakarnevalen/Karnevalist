import React, { Component } from 'react';
import { BlurView } from 'expo';
import { View, Text, Modal, Dimensions, TouchableOpacity } from 'react-native';

class SuperAgileAlert extends Component {
  getBorderLeftRadius(index) {
    if (index === 0) {
      return 5;
    }
  }

  getBorderRightRadius(index) {
    if (index === 1) {
      return 5;
    }
  }
  getRightMargin(index) {
    if (index === 0) {
      return 1;
    }
    return 0;
  }

  createButtons() {
    const { buttonsIn } = this.props;
    const { buttonStyle, buttonTextStyle } = styles;
    const toReturn = [];
    for (let i = 0; i < buttonsIn.length; i++) {
      toReturn.push(
        <TouchableOpacity
          key={i}
          onPress={() => buttonsIn[i].onPress()}
          style={[
            buttonStyle,
            {
              borderBottomLeftRadius: this.getBorderLeftRadius(i),
              borderBottomRightRadius: this.getBorderRightRadius(i),
              marginRight: this.getRightMargin(i),
              backgroundColor: '#F7A021'
            }
          ]}
        >
          <Text style={buttonTextStyle}>{buttonsIn[i].text}</Text>
        </TouchableOpacity>
      );
    }
    return toReturn;
  }

  render() {
    const {
      outerViewStyle,
      headerTextStyle,
      infoTextStyle,
      alertBoxStyle,
      buttonContainerStyle
    } = styles;
    const { alertVisible, header = '', info = '', setAlertVisible, children = null } = this.props;
    return (
      <Modal transparent visible={alertVisible} onRequestClose={() => setAlertVisible(false)}>
        <BlurView tint={'dark'} intensity={70} style={outerViewStyle}>
          <View style={alertBoxStyle}>
            <Text style={headerTextStyle}>{header}</Text>
            <Text style={infoTextStyle}>{info}</Text>
            {children}
            <View style={buttonContainerStyle}>{this.createButtons()}</View>
          </View>
        </BlurView>
      </Modal>
    );
  }
}

const styles = {
  outerViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  alertBoxStyle: {
    alignItems: 'center',
    flexDirection: 'column',
    width: Dimensions.get('window').width / 1.1,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#F7A021',
    overflow: 'hidden'
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderColor: 'white',
    width: Dimensions.get('window').width / (1.1 * 2)
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Avenir Next Medium'
  },
  headerTextStyle: {
    textAlign: 'center',
    fontFamily: 'Avenir Next Bold',
    color: '#F7A021',
    marginTop: 10
  },
  infoTextStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Avenir Next Medium',
    color: '#F7A021',
    marginTop: 10,
    marginBottom: 10
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    marginTop: 10
  }
};

export default SuperAgileAlert;
