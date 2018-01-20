import React, { Component } from 'react';
import { Alert, View, Dimensions, ScrollView, Text, Image, Animated, Easing } from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import CustomButton from '../common/CustomButton';
import { setLanguage, setToken, setEmail } from '../../actions';
import Input from '../common/Input';
import SuperAgileAlert from '../common/SuperAgileAlert';
import BackgroundImage from '../common/BackgroundImage';
import { saveItem } from '../../helpers/LocalSave';
import { handleErrorMsg } from '../../helpers/ApiManager';
import { LOGIN_SCREEN_STRINGS } from '../../helpers/LanguageStrings';

const WIDTH = Dimensions.get('window').width * 0.9;
const HEIGHT = Dimensions.get('window').height;

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
      email: '',
      password: '',
      loading: false,
      loadingComplete: false,
      forgotPasswordEmail: '',
      spinValue: new Animated.Value(0)
    };
  }

  spin() {
    this.state.spinValue.setValue(0);
    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }).start(() => this.spin());
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = LOGIN_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = LOGIN_SCREEN_STRINGS[field][language]));
    return strings;
  }

  changeLang() {
    const language = this.props.language === 'SE' ? 'EN' : 'SE';
    this.props.setLanguage(language);
    saveItem('language', language);
  }

  handleResetPassword() {
    const url = 'https://api.10av10.com/login/forgotpassword';
    const strings = this.getStrings();
    axios
      .post(url, {
        email: this.state.forgotPasswordEmail
      })
      .then(response => {
        if (!response.data.success) {
          Alert.alert(strings.responseFail);
        } else {
          Alert.alert(strings.responseSuccess);
        }
      })
      .catch(error => {
        const msg = handleErrorMsg(error.message, strings);
        Alert.alert(strings.error, msg);
      });
    this.setState({ alertVisible: false, forgotPasswordEmail: '' });
  }

  handleLogin() {
    const url = 'https://api.10av10.com/login/email';
    const strings = this.getStrings();
    const { email, password } = this.state;
    if (email === '') {
      Alert.alert(strings.error, strings.emailError);
    } else if (password === '') {
      Alert.alert(strings.error, strings.passwordError);
    } else {
      this.setState({ loading: true, loadingComplete: false });
      this.spin();
      axios
        .post(url, {
          email,
          password
        })
        .then(res => {
          const { accessToken } = res.data;
          this.props.setToken(accessToken);
          this.props.setEmail(email);
          saveItem('email', email);
          saveItem('accessToken', accessToken);
          this.setState({ loadingComplete: true });
        })
        .catch(error => {
          const msg = handleErrorMsg(error.message, strings);
          this.setState({ loading: false, loadingComplete: false });
          Alert.alert(strings.error, msg);
        });
    }
  }

  render() {
    const {
      email,
      password,
      loading,
      loadingComplete,
      forgotPasswordEmail,
      alertVisible
    } = this.state;
    if (loadingComplete) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'MyPageNavbarScreen' })],
        key: null
      });
      this.setState({ loading: false, loadingComplete: false, password: '' });
      this.props.navigation.dispatch(resetAction);
    }
    if (loading) {
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
    const { containerStyle, container1 } = styles;
    const strings = this.getStrings();
    return (
      <View style={containerStyle}>
        <BackgroundImage pictureNumber={4} />
        <ScrollView>
          <View style={container1}>
            <View style={{ alignSelf: 'flex-start' }}>
              <CustomButton
                width={170}
                text={strings.languageButton}
                onPress={() => this.changeLang()}
                style="textButton"
              />
            </View>
            <Input
              value={email}
              keyboardType={'email-address'}
              placeholder={strings.email}
              width={WIDTH}
              onChangeText={text => this.setState({ email: text })}
              returnKeyType={'next'}
              onSubmitEditing={() => this.refs.secondInput.focus()}
            />
            <Input
              ref={'secondInput'}
              value={password}
              placeholder={strings.password}
              width={WIDTH}
              secureText
              onChangeText={text => this.setState({ password: text })}
              returnKeyType={'done'}
              onSubmitEditing={() => this.handleLogin()}
            />
            <CustomButton
              text={strings.loginButton}
              onPress={() => this.handleLogin()}
              style={'standardButton'}
              width={WIDTH}
            />
            <CustomButton
              text={strings.forgotPassword}
              onPress={() => {
                this.setState({ alertVisible: true });
              }}
              style="textButton"
            />
            <CustomButton
              text={strings.createProfile}
              width={WIDTH}
              onPress={() => {
                this.props.navigation.navigate('RegistrationScreen');
              }}
              style="standardButton"
            />
            <CustomButton
              text={strings.readMore}
              onPress={() => {
                this.props.navigation.navigate('RegistrationInfo');
              }}
              style="textButton"
            />
            <SuperAgileAlert
              alertVisible={alertVisible}
              setAlertVisible={visible => this.setState({ alertVisible: visible })}
              buttonsIn={[
                { text: strings.cancel, onPress: () => this.setState({ alertVisible: false }) },
                { text: strings.resetPassword, onPress: () => this.handleResetPassword() }
              ]}
              header={strings.passwordPopupHeader}
              info={strings.passwordPopupInfo}
            >
              <Input
                placeholder={strings.inputPlaceholder}
                title={strings.inputTitle}
                width={Dimensions.get('window').width / 1.2}
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ forgotPasswordEmail: text })}
                value={forgotPasswordEmail}
              />
            </SuperAgileAlert>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container1: {
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
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
  containerStyle: {
    width: Dimensions.get('window').width,
    height: HEIGHT
  },
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

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, { setLanguage, setToken, setEmail })(LoginScreen);
