import React, { Component } from 'react';
import { BlurView } from 'expo';
import {
  View,
  Text,
  Modal,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
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
    const toReturn = [];
    for (let index = 0; index < 2; index++) {
      toReturn.push(
        <TouchableOpacity
          onPress={buttonsIn[index].onPress}
          style={[
            styles.buttonStyle,
            {
              borderBottomLeftRadius: this.getBorderLeftRadius(index),
              borderBottomRightRadius: this.getBorderRightRadius(index),
              marginRight: this.getRightMargin(index)
            }
          ]}
        >
          <Text style={styles.buttonTextStyle}>{buttonsIn[index].text}</Text>
        </TouchableOpacity>
      );
    }
    return toReturn;
  }

  render() {
    return (
      <Modal transparent visible={this.props.alertVisible}>
        <BlurView tint="dark" intensity={70} style={StyleSheet.absoluteFill}>
          <View style={styles.outerViewStyle} transparent={false}>
            <View style={styles.alertBoxStyle}>
              <View style={styles.innerViewStyle}>
                <Text style={styles.headerTextStyle}>{this.props.header}</Text>
                <View style={{ height: 15, top: 10, width: Dimensions.get('window').width / 1.2 }}>
                  <Text style={styles.infoTextStyle}>{this.props.info}</Text>
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
                    onChangeText={text => {
                      return this.setState(() => {
                        return { emailAddress: { text } };
                      });
                    }}
                  />
                </View>
                <View style={styles.buttonViewStyle}>{this.createButtons()}</View>
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
    backgroundColor: '#d999fa'
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
    backgroundColor: '#f4376d',
    height: 50,
    borderColor: 'white',
    width: Dimensions.get('window').width / (1.1 * 2)
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 14
  },
  headerTextStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff'
  },
  infoTextStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    color: '#ffffff'
  },
  buttonViewStyle: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 50
  }
};

export default PasswordPopUp;
