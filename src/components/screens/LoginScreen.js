import React, { Component } from 'react';
import { Image, Text, View, Dimensions } from 'react-native';
import CustomButton from '../common/CustomButton';
import Input from '../common/Input';

const WIDTH = Dimensions.get('window').width * 0.9;

class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alertVisible: false,
      socSecNbr: '',
      password: ''
    }
  }

  render() {
    return (
      <Image
        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
        source={require('../../../res/Flicka_Tuba_Byggnader.png')}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: '#8A4797',
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            opacity: 0.7
          }}
        />
        <View style={styles.container1}>
          <Image
            source={require('../../../res/LK2018logga.png')}
          />
          <Input
            placeholder='Personnummer'
            title='Personnummer'
            width={WIDTH}
            viewStyle={{ marginBottom: 2 }}
            textInputStyle={styles.textInputStyle}
            headerTextStyle={styles.inputHeaderTextStyle}
            underlineColorAndroid='transparent'
            onChangeText={
              text => {
                return this.setState(() => {
                  return { socSecNbr: { text } }
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
              this.props.navigation.navigate('MyPageNavbarScreen')
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
            width={WIDTH}
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
  }
};

export default HomeScreen;