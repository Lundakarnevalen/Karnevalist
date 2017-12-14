import React, { Component } from 'react';
import { BlurView } from 'expo';
import { View, Text, Modal, Dimensions, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';

class SuperAgileAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalNbrOfButtons: this.props.buttonsIn.length,
      buttonWidth: 0
    };
  }

  componentDidMount() {
      this.setState({ buttonWidth: ((Dimensions.get('window').width /
          (this.state.totalNbrOfButtons * 1.1)) - ((0.4 *
          (this.props.buttonsIn.length - 1)) / this.props.buttonsIn.length)) })
    }

  createButtons() {
    const { buttonsIn } = this.props;
    const buttonsToReturn = [];
    for (let index = 0; index < buttonsIn.length; index++) {
      const item = this.createSingleButton(index, buttonsIn.length);
      buttonsToReturn.push(item);
    }
    return buttonsToReturn;
  }

  createSingleButton(index) {
    const { buttonsIn } = this.props;
    const { buttonWidth } = this.state;

    if (buttonsIn.length === 1) {
      return (
        <CustomButton
          onPress={buttonsIn[index].onPress}
          text={buttonsIn[index].text}
          style={'alertButton'}
          width={this.state.buttonWidth}
        />
      );
    }
    if (index === 0) {
      return (
        <CustomButton
          onPress={buttonsIn[index].onPress}
          text={buttonsIn[index].text}
          style={'alertButton'}
        />
      );
    }
    if (index === buttonsIn.length - 1) {
      return (
        <CustomButton
          onPress={buttonsIn[index].onPress}
          text={buttonsIn[index].text}
          style={'alertButton'}
        />
      );
    }
    return (
      <CustomButton
        onPress={buttonsIn[index].onPress}
        text={buttonsIn[index].text}
        style={['alertButton', { width: buttonWidth }]}
      />
    );
  }
  render() {
    return (
      <Modal transparent visible={this.props.alertVisible}>
        <BlurView tint="dark" intensity={70} style={StyleSheet.absoluteFill}>
          <View style={styles.outerViewStyle} transparent={false}>
            <View style={styles.alertBoxStyle}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1
                }}
              >
                <View
                  style={{ justifyContent: 'flex-top', margin: 10, flex: 1 }}
                >
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {this.props.header}
                  </Text>
                </View>
                <View style={{ flex: 5 }}>
                  <Text style={{ textAlign: 'center', margin: 7 }}>
                    {this.props.info}
                  </Text>
                </View>
              </View>
              <View style={{ position: 'absolute', bottom: 0 }}>
                {this.createButtons()}
              </View>
            </View>
          </View>
        </BlurView>
      </Modal>
    );
  }
}

const styles = {
  outerViewStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 16
  },
  alertBoxStyle: {
    alignItems: 'center',
    flexDirection: 'column',
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').height / 3.5,
    borderRadius: 5,
    backgroundColor: '#ffbbcc'
  }
};

export default SuperAgileAlert;
