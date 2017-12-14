import React, { Component } from 'react';
import { Alert, Image, Text, View, Dimensions } from 'react-native';
import axios from 'axios';
import CustomButton from '../common/CustomButton';
import Input from '../common/Input';

const WIDTH = Dimensions.get('window').width * 0.9;

class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alertVisible: false,
      email: '',
      password: ''
    }
  }

  render() {
    const { opacityStyle, imageStyle } = styles
    return (
      <Image
        style={imageStyle}
        source={require('../../../res/Flicka_Tuba_Byggnader.png')}
      >
        <View style={opacityStyle} />
        <View style={styles.container1}>
          <Input
            placeholder='Email address'
            title='Email address'
            width={WIDTH}
            viewStyle={{ marginBottom: 2 }}
            textInputStyle={styles.textInputStyle}
            headerTextStyle={styles.inputHeaderTextStyle}
            underlineColorAndroid='transparent'
            onChangeText={
              text => {
                return this.setState(() => {
                  return { email: { text } }
                });
              }
            }
          />
          <Input
            placeholder='Lösenord'
            title='Lösenord'
            width={WIDTH}
            secureText
            viewStyle={{ marginBottom: 11 }}
            textInputStyle={styles.textInputStyle}
            headerTextStyle={styles.inputHeaderTextStyle}
            underlineColorAndroid='transparent'
            onChangeText={
              text => {
                return this.setState(() => {
                  return { password: { text } }
                });
              }
            }
          />
          <CustomButton
            text='Logga in'
            onPress={() => {
              axios.post(
                'http://146.185.173.31:3000/login/email',
                {
                  email: this.state.email.text,
                  password: this.state.password.text
                }
              ).then((response) => {
                if (response.data.success) {
                  this.props.navigation.navigate('MyPageNavbarScreen')
                } else {
                  Alert.alert(
                    'Error',
                    response.data.message
                  );
                }
              }).catch((error) => {
                console.log(error);
                let msg = '';
                if (error.message.includes('400')) {
                  msg = 'Wrong email or password';
                } else if (error.message.includes('401')) {
                  msg = 'Wrong email or password';
                } else if (error.message.includes('404')) {
                  msg = 'Something went wrong...';
                } else if (error.message.includes('500')) {
                  msg = 'Internal error, please try again later';
                }
                Alert.alert(
                  'Error',
                  msg
                );
              })
            }}
            style='standardButton'
            width={WIDTH}
          />
          <Text
            style={{ color: 'white', fontSize: 12 }}
          >
            Har du ingen profil?
          </Text>
          <CustomButton
            text='Skapa profil'
            width={WIDTH}
            onPress={() => {
              this.props.navigation.navigate('RegistrationScreen')
            }}
            style='standardButton'
          />
          <CustomButton
            text='Läs mer om registreringen'
            onPress={() => {
              this.props.navigation.navigate('RegistrationInfo')
            }}
            style='textButton'
          />
        </View>
      </Image>
    );
  }
}

const styles = {
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2: {
    flex: 0,
    margin: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  textInputStyle: {
    borderRadius: 0,
    borderWidth: 0
  },
  inputHeaderTextStyle: {
    color: 'white',
    fontSize: 12
  },
  opacityStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#8A4797',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    opacity: 0.7
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
};

export default HomeScreen;
