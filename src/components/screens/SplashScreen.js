import React, { Component } from 'react'
import { Animated, Dimensions, StyleSheet, View, Image, Text, StatusBar, Easing } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { getItem } from '../../helpers/LocalSave';
import BackgroundImage from '../common/BackgroundImage';
import { setTheme, setSections, setToken, setEmail } from '../../actions';

const baseURL = 'https://api.10av10.com/api/user/'

class SplashScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
          spinValue: new Animated.Value(0)
        }
    }

    componentWillMount() {
      this.setCurrenTheme()
      this.spin()
      this.authorize()
    }

    authorize() {
      setTimeout(() =>
        getItem('email', (email) => {
        if (email !== null) {
          getItem('accessToken', (token) => {
            const url = baseURL + email
            const headers = {
              Authorization: 'Bearer ' + token,
              'content-type': 'application/json'
            }
            axios.get(url, { headers })
            .then((response) => {
              const { success } = response.data
              if (success) {
                this.props.navigation.navigate('MyPageNavbarScreen')
                this.props.setToken(token)
                this.props.setEmail(email)
              } else
                this.props.navigation.navigate('LoginScreen')
            })
            .catch((error) => {
              // const msg = handleErrorMsg(error.message)
              console.log(error.message);
            });
          })
        } else {
          this.props.navigation.navigate('LoginScreen')
        }
      }), 3000)
    }
    setCurrenTheme() {
      let currentTheme = 'day';
      const currentHour = new Date().getHours();
      if (currentHour < 9) {
        currentTheme = 'morning';
        StatusBar.setBarStyle('dark-content', true);
      } else if (currentHour < 18) {
        currentTheme = 'day';
        StatusBar.setBarStyle('dark-content', true);
      } else {
        currentTheme = 'night';
        StatusBar.setBarStyle('light-content', true);
      }
      this.props.setTheme(currentTheme);
    }

    spin() {
      this.state.spinValue.setValue(0)
      Animated.timing(
        this.state.spinValue,
        {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear
        }
      ).start(() => this.spin())
    }

    render() {
      const { container, text, image } = styles
      const spin = this.state.spinValue.interpolate({
         inputRange: [0, 1],
         outputRange: ['0deg', '360deg']
       })
      return (
        <View style={container}>
          <BackgroundImage picture={4} />
          <Animated.View style={[container, { transform: [{ rotate: spin }] }]}>
            <Text style={text}> LOADING </Text>
            <Image
              style={image}
              source={require('../../../res/Monstergubbe.png')}
            />
          </Animated.View>
        </View>
      )
    }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 227,
    height: 200,
    resizeMode: 'contain'
  },
  text: {
    marginTop: 50,
    fontSize: 30,
    color: '#1A1A1A',
    fontFamily: 'Avenir Next Medium'
  }
}

export default connect(null, { setTheme, setSections, setToken, setEmail })(SplashScreen);
