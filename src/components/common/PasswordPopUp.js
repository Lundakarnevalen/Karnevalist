import React, { Component } from 'react';
import { BlurView } from 'expo';
import {
  View,
  Text,
  Modal,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
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
    this.setState({
      buttonWidth: Dimensions.get('window').width / this.props.buttonsIn.length
    });
  }

  getColor() {
    return this.props.theme === 'day' ? '#f4376d' : '#F7A021';
  }

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
  getOnPress(index) {
    const { emailAddress } = this.state;
    console.log(emailAddress);
    if (index === 1) {
      axios
        .post('http://146.185.173.31:3000/login/forgotpassword', {
          email: this.state.emailAddress
        })
        .then(response => {
          if (!response.data.success) {
            Alert.alert('Please enter a valid email address');
          } else {
            Alert.alert('Thank you, check your inbox for your new password');
          }
        })
        .catch(error => {
          let msg;
          if (error.message.includes('400')) {
            msg = 'Wrong email or password';
          } else if (error.message.includes('401')) {
            msg = 'Wrong email or password';
          } else if (error.message.includes('404')) {
            msg = 'Something went wrong...';
          } else {
            msg = 'Internal error, please try again later';
          }
          Alert.alert('Error', msg);
        });
    } else {
      this.props.setAlertVisible(false);
    }
  }

  createButtons() {
    const { buttonsIn } = this.props;
    const { buttonStyle, buttonTextStyle } = styles;
    const toReturn = [];
    for (let i = 0; i < 2; i++) {
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
              backgroundColor: this.getColor()
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
      innerViewStyle,
      headerTextStyle,
      infoTextStyle,
      buttonViewStyle,
      alertBoxStyle
    } = styles;
    const { alertVisible, header, info, inputValue, setAlertVisible } = this.props;
    return (
      <Modal transparent visible={alertVisible} onRequestClose={() => setAlertVisible(false)}>
        <BlurView tint="dark" intensity={70} style={StyleSheet.absoluteFill}>
          <View style={outerViewStyle} transparent={false}>
            <View style={[alertBoxStyle, { borderColor: this.getColor() }]}>
              <View style={innerViewStyle}>
                <Text style={[headerTextStyle, { color: this.getColor() }]}>{header}</Text>
                <View style={{ height: 15, top: 10, width: Dimensions.get('window').width / 1.2 }}>
                  <Text style={[infoTextStyle, { color: this.getColor() }]}>{info}</Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: Platform.OS === 'ios' ? 68 : 73,
                    width: Dimensions.get('window').width / 1.2
                  }}
                >
                  <Input
                    placeholder="Enter your email address"
                    title="E-mail"
                    width={Dimensions.get('window').width / 1.2}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.props.onChangeText(text)}
                    value={inputValue}
                  />
                </View>
                <View style={buttonViewStyle}>{this.createButtons()}</View>
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
    height: 220,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: 'white'
  },
  innerViewStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    marginTop: 17,
    marginBottom: 0
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
    fontFamily: 'Avenir Next Bold'
  },
  infoTextStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Avenir Next Medium'
  },
  buttonViewStyle: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 50
  }
};

const mapStateToProps = ({ currentTheme }) => {
  const { theme } = currentTheme;
  return { theme };
};

export default connect(mapStateToProps, null)(PasswordPopUp);
