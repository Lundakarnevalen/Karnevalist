import React, { Component } from 'react';
import { View, Dimensions, ScrollView, Text, Keyboard } from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { setLanguage, setToken, setEmail, setUserinfo } from '../../actions';
import { Input, SuperAgileAlert, BackgroundImage, Toast, CustomButton } from '../common';
import Loading from '../common/Loading';
import { LOGIN_URL, FORGOT_PASSWORD_URL } from '../../helpers/Constants';
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
      resetPasswordError: ' ',
      showToast: false
    };
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
    const strings = this.getStrings();
    axios
      .post(FORGOT_PASSWORD_URL, {
        email: this.state.forgotPasswordEmail
      })
      .then(response => {
        if (!response.data.success) {
          this.setState({ resetPasswordError: strings.responseFail });
        } else {
          this.setState({
            alertVisible: false,
            forgotPasswordEmail: '',
            resetPasswordError: ' ',
            showToast: true
          });
        }
      })
      .catch(error => {
        const msg = handleErrorMsg(error, strings);
        this.setState({ resetPasswordError: msg });
      });
  }

  getAlertButtons(message) {
    const strings = this.getStrings();
    switch (message) {
      case strings.emailError:
      case strings.passwordError:
        return [{ text: strings.ok, onPress: () => this.setState({ alertVisible: false }) }];
      case strings.passwordPopupInfo:
        return [
          {
            text: strings.cancel,
            onPress: () =>
              this.setState({
                alertVisible: false,
                resetPasswordError: '',
                forgotPasswordEmail: ''
              })
          },
          { text: strings.resetPassword, onPress: () => this.handleResetPassword() }
        ];
      default:
        return [{ text: strings.ok, onPress: () => this.setState({ alertVisible: false }) }];
    }
  }

  handleLogin() {
    Keyboard.dismiss();
    const strings = this.getStrings();
    const { email, password } = this.state;
    if (email === '') {
      this.setState({
        alertVisible: true,
        message: strings.emailError,
        alertHeader: strings.error
      });
    } else if (password === '') {
      this.setState({
        alertVisible: true,
        message: strings.passwordError,
        alertHeader: strings.error
      });
    } else {
      this.setState({ loading: true, loadingComplete: false });
      axios
        .post(LOGIN_URL, {
          email,
          password
        })
        .then(res => {
          const { accessToken, userinfo } = res.data;
          const allUserinfo = Object.assign({}, userinfo, userinfo.KarnevalistInfo);
          this.props.setToken(accessToken);
          this.props.setEmail(email);
          this.props.setUserinfo(allUserinfo);
          saveItem('email', email);
          saveItem('accessToken', accessToken);
          this.setState({ loadingComplete: true });
        })
        .catch(error => {
          const msg = handleErrorMsg(error, strings);
          this.setState({ loading: false, loadingComplete: false });
          this.setState({
            alertVisible: true,
            message: msg,
            alertHeader: strings.error
          });
        });
    }
  }

  render() {
    const { containerStyle, container1, errorTextStyle } = styles;
    const {
      email,
      password,
      loading,
      loadingComplete,
      forgotPasswordEmail,
      alertVisible,
      resetPasswordError,
      message
    } = this.state;
    const strings = this.getStrings();
    return (
      <View style={containerStyle}>
        <BackgroundImage pictureNumber={4} />
        <ScrollView keyboardShouldPersistTaps="handled" scrollEnabled={false}>
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
              autoCapitalize="none"
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
              text={strings.createProfile}
              width={WIDTH}
              onPress={() => {
                this.props.navigation.navigate('RegistrationScreen');
              }}
              style="standardButton"
            />
            <CustomButton
              text={strings.forgotPassword}
              onPress={() => {
                this.setState({
                  alertVisible: true,
                  message: strings.passwordPopupInfo,
                  alertHeader: strings.passwordPopupHeader
                });
              }}
              style="textButton"
            />
            <SuperAgileAlert
              alertVisible={alertVisible}
              setAlertVisible={visible => this.setState({ alertVisible: visible })}
              buttonsIn={this.getAlertButtons(message)}
              header={this.state.alertHeader || ''}
              info={this.state.message || ''}
            >
              {message === strings.passwordPopupInfo ? (
                <View>
                  <Input
                    placeholder={strings.email}
                    width={Dimensions.get('window').width / 1.2}
                    underlineColorAndroid={'transparent'}
                    onChangeText={text =>
                      this.setState({ forgotPasswordEmail: text, resetPasswordError: ' ' })
                    }
                    value={forgotPasswordEmail}
                    returnKeyType={'done'}
                    onSubmitEditing={() => this.handleResetPassword()}
                  />
                  <Text style={errorTextStyle}>{resetPasswordError}</Text>
                </View>
              ) : null}
            </SuperAgileAlert>
          </View>
        </ScrollView>
        <Toast
          showToast={this.state.showToast}
          onClose={() => this.setState({ showToast: false })}
          message={strings.resetPasswordComplete}
        />
        {loading ? (
          <Loading
            loadingComplete={loadingComplete}
            redirect={() => {
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'MyPageNavbarScreen' })],
                key: null
              });
              this.setState({ loading: false, loadingComplete: false, password: '' });
              this.props.navigation.dispatch(resetAction);
            }}
          />
        ) : null}
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
  errorTextStyle: {
    textAlign: 'center',
    fontFamily: 'Avenir Next Medium',
    color: 'red'
  }
};

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, { setLanguage, setToken, setEmail, setUserinfo })(
  LoginScreen
);
