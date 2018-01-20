import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  View,
  Image,
  Text,
  StatusBar,
  Easing
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { getItem } from '../../helpers/LocalSave';
import BackgroundImage from '../common/BackgroundImage';
import { setTheme, setSections, setToken, setEmail } from '../../actions';

const baseURL = 'https://api.10av10.com/api/hello/';
const WIDTH = Dimensions.get('window').width;

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0)
    };
  }

  componentWillMount() {
    this.setCurrenTheme();
    this.spin();
    this.authorize();
    this.getSectionInfo();
  }

  getImage(url, section) {
    const tempSection = section;
    axios
      .get(url)
      .then(r => {
        const image = (
          <Image
            style={{ width: WIDTH - 10, height: WIDTH - 50 }}
            source={{ uri: r.data.source_url }}
            defaultSource={require('../../../res/Monstergubbe.png')}
          />
        );

        tempSection.imguri = r.data.source_url;
        tempSection.image = image;
        this.props.setSections(tempSection);
        return tempSection;
      })
      .catch(error => {
        console.error(error);
      });
  }

  getSectionInfo() {
    const url = 'http://lundakarnevalen.se/wp-json/wp/v2/lksektion/';
    axios.get(url).then(response => {
      response.data.forEach(item => {
        const strippedContent = item.content.rendered.replace(
          /(<([^>]+)>)/gi,
          ''
        );
        const imgId = item.featured_media;
        const imgUrl = 'http://lundakarnevalen.se/wp-json/wp/v2/media/' + imgId;
        const section = {
          key: item.id,
          id: item.id,
          title: item.title.rendered,
          info: strippedContent
        };
        this.getImage(imgUrl, section);
      });
    });
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
                .post(baseURL, {}, { headers })
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

  setCurrenTheme() {
    StatusBar.setBarStyle('light-content', true);
    this.props.setTheme('night');
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
          <Image
            style={image}
            source={require('../../../res/Monstergubbe.png')}
          />
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
  }
};

export default connect(null, { setTheme, setSections, setToken, setEmail })(
  SplashScreen
);
