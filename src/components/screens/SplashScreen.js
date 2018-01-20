import React, { Component } from 'react';
import { Animated, Dimensions, View, Image, Text, StatusBar, Easing } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { getItem } from '../../helpers/LocalSave';
import { BackgroundImage } from '../common';
import { TOKEN_URL, SECTION_URL, IMAGE_URL } from '../../helpers/Constants';
import { setSections, setToken, setEmail } from '../../actions';

const WIDTH = Dimensions.get('window').width;

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
    axios.get(SECTION_URL).then(response => {
      response.data.forEach(item => {
        const strippedContent = item.content.rendered.replace(/(<([^>]+)>)/gi, '');
        const imgId = item.featured_media;
        const imgUrl = IMAGE_URL + imgId;
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
  }
};

<<<<<<< HEAD
export default connect(null, { setTheme, setSections, setToken, setEmail })(SplashScreen);
=======
export default connect(null, { setSections, setToken, setEmail })(SplashScreen);
>>>>>>> 3219536e4dc1c1b13e51f04c07da2601328f06c3
