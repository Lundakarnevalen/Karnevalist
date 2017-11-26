import React, { Component } from 'react';
import { Image, Text, View, Dimensions } from 'react-native';
import CustomButton from '../common/CustomButton';
import Input from '../common/Input';

class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alertVisible: false
    }
  }

  render() {
    return (
      <Image 
        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
        source={require('../../../res/HomeScreenBackground.jpg')}
      >
        <View style={styles.container2}>
          <CustomButton
            text='Change to English'
            textStyle={{
              color: 'blue'
            }}
            buttonStyle={styles.transparentButtonStyle}
          />
        </View>
        <View style={styles.container1}>
          <Input
            title='Personnummer'
            width={Dimensions.get('window').width * 0.9}
            viewStyle={{ marginBottom: 10 }}
          />
          <Input
            title='Lösenord'
            width={Dimensions.get('window').width * 0.9}
            secureText={true}
            viewStyle={{ marginBottom: 10 }}
          />
          <CustomButton
            text='Logga in'
            onPress={() => {
              this.props.navigation.navigate('MyPageNavbarScreen')
            }}
            textStyle={{
              color: 'white',
              fontSize: 20
            }}
            buttonStyle={[styles.normalButtonStyle, { marginBottom: 30 }]}
          />
          <Text>
            Har du ingen profil?
          </Text>
          <CustomButton
            text='Skapa profil'
            textStyle={{
              color: 'white',
              fontSize: 20
            }}
            buttonStyle={styles.normalButtonStyle}
          />
          <CustomButton
            text='Läs mer om registreringen'
            textStyle={{
              color: 'blue'
            }}
            buttonStyle={styles.transparentButtonStyle}
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
    alignItems: 'flex-start'
  },
  normalButtonStyle: {
    backgroundColor: '#f4376d',
    padding: 10,
    width: Dimensions.get('window').width * 0.9
  },
  transparentButtonStyle: {
    marginTop: 30,
    backgroundColor: 'transparent',
    borderWidth: 0
  }
};

export default HomeScreen;
