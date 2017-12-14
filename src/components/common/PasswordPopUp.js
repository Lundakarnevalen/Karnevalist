import React, { Component } from 'react';
import { BlurView } from 'expo';
import { View, Text, Modal, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
import Input from '../common/Input';

class PasswordPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonWidth: 0,
      emailAddress: ''
    };
  }

  componentDidMount() {
      this.setState({ buttonWidth: ((Dimensions.get('window').width /
        this.props.buttonsIn.length)) })
    }

  createButtons() {
    const { buttonsIn } = this.props;
    const { buttonWidth } = this.state;
    const toReturn = []
    for (let index = 0; index < 2; index++) {
      if (index === 0) {
      toReturn.push(
        <TouchableOpacity
          onPress={buttonsIn[index].onPress}
          style={[styles.buttonStyle, { borderBottomLeftRadius: 5, borderRightWidth: 0.5, borderColor: 'white' }]}
        >
          <Text style={styles.buttonTextStyle}>
            {buttonsIn[index].text}
          </Text>
        </TouchableOpacity>
      );
    } else {
      toReturn.push(
        <TouchableOpacity
          onPress={buttonsIn[index].onPress}
          style={[styles.buttonStyle, { borderBottomRightRadius: 5, borderLeftWidth: 0.5, borderColor: 'white' }]}
        >
          <Text style={styles.buttonTextStyle}>
            {buttonsIn[index].text}
          </Text>
        </TouchableOpacity>
      )
    }
    }
    return toReturn;
    }

  render() {
    return (
      <Modal transparent visible={this.props.alertVisible}>
        <BlurView tint="dark" intensity={70} style={StyleSheet.absoluteFill}>
          <View style={styles.outerViewStyle} transparent={false}>
            <View style={styles.alertBoxStyle}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  marginTop: 15,
                  marginBottom: 0,

                }}
              >
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {this.props.header}
                  </Text>

                <View style={{ height: 15, top: 10, width: Dimensions.get('window').width / 1.2 }}>
                  <Text style={{ justifyContent: 'center', textAlign: 'center' }}>
                    {this.props.info}
                  </Text>
                </View>
                <View style={{ position: 'absolute', bottom: 30, width: Dimensions.get('window').width / 1.2 }}>
                <Input
                  placeholder='Enter your email address'
                  title='E-mail'
                  width={Dimensions.get('window').width / 1.2}
                  viewStyle={{ marginBottom: 2 }}
                  textInputStyle={styles.textInputStyle}
                  headerTextStyle={styles.inputHeaderTextStyle}
                  underlineColorAndroid='transparent'
                  onChangeText={
                    text => {
                      return this.setState(() => {
                        return { emailAddress: { text } }
                      });
                    }
                  }
                />

                </View>
                <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', height: 30 }}>
                  {this.createButtons()}
                </View>
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
  alertBoxStyle: {
    alignItems: 'center',
    flexDirection: 'column',
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').height / 3.2,
    borderRadius: 5,
    backgroundColor: '#ffbbcc'
  },
  textInputStyle: {
    borderRadius: 0,
    borderWidth: 0
  },
  inputHeaderTextStyle: {
    color: 'white',
    fontSize: 12
  },
  buttonStyle: {
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4376d',
    height: 40,
    marginTop: 15,
    width: (Dimensions.get('window').width) / (1.1 * 2)
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 14,
  }
};

export default PasswordPopUp;
