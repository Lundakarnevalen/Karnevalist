import React, { Component } from 'react';
import { Animated, View, Image, Text, StatusBar, Easing } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { getItem, getPopoverStatus } from '../../helpers/LocalSave';
import { BackgroundImage } from '../common';
import { TOKEN_URL } from '../../helpers/Constants';
import {
  setSections,
  setToken,
  setEmail,
  setSectionScreenPopover,
  setHomeScreenPopover
} from '../../actions';
import { fetchSections } from '../../helpers/ApiManager';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0)
    };
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content', true);
    this.spin();
    this.authorize();
    getPopoverStatus('homeScreenPopover', bool => this.props.setHomeScreenPopover(bool));
    getPopoverStatus('sectionScreenPopover', bool => this.props.setSectionScreenPopover(bool));
    fetchSections(sections => this.props.setSections(sections));
  }

  authorize() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
      key: null
    });
    setTimeout(
      () =>
        getItem('email', email => {
          if (email !== null) {
            getItem('accessToken', token => {
              const headers = {
                Authorization: 'Bearer ' + token,
                'content-type': 'application/json'
              };
              axios
                .post(TOKEN_URL, {}, { headers })
                .then(response => {
                  const { success } = response.data;
                  if (success) {
                    resetAction.actions = [
                      NavigationActions.navigate({ routeName: 'MyPageNavbarScreen' })
                    ];
                    this.props.setToken(token);
                    this.props.setEmail(email);
                    this.props.navigation.dispatch(resetAction);
                  } else this.props.navigation.dispatch(resetAction);
                })
                .catch(error => {
                  console.log(error.message);
                  this.props.navigation.dispatch(resetAction);
                });
            });
          } else {
            this.props.navigation.dispatch(resetAction);
          }
        }),
      2000
    );
  }

  spin() {
    this.state.spinValue.setValue(0);
    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }).start(() => this.spin());
  }

  render() {
    const { container, text, image } = styles;
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={container}>
        <BackgroundImage picture={4} />
        <Animated.View style={[container, { transform: [{ rotate: spin }] }]}>
          <Text style={text}> LOADING </Text>
          <Image style={image} source={require('../../../res/Monstergubbe.png')} />
        </Animated.View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 227,
    height: 200,
    resizeMode: 'contain'
  },
  text: {
    marginTop: 50,
    fontSize: 30,
    color: 'white',
    fontFamily: 'Avenir Next Medium',
    backgroundColor: 'transparent'
  },
  rowImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8
  }
};

export default connect(null, {
  setSections,
  setToken,
  setEmail,
  setSectionScreenPopover,
  setHomeScreenPopover
})(SplashScreen);
