import React, { Component } from 'react';
import { View, ScrollView, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { setLanguage, setToken, setEmail, setUserinfo } from '~/src/actions';
import {
  Input,
  SuperAgileAlert,
  BackgroundImage,
  Toast,
  CustomButton,
  Loading
} from '~/src/components/common';
import { LOGIN_URL, FORGOT_PASSWORD_URL, WIDTH } from '~/src/helpers/Constants';
import { saveItem } from '~/src/helpers/LocalSave';
import { getStrings } from '~/src/helpers/functions';
import { handleErrorMsg } from '~/src/helpers/ApiManager';
import { LOGIN_SCREEN_STRINGS } from '~/src/helpers/LanguageStrings';
import { styles } from './styles';

const COMPONENT_WIDTH = WIDTH * 0.9;

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
      resetPasswordError: '',
      showToast: false
    };
  }

  getLanguageStrings() {
    return getStrings(this.props.language, LOGIN_SCREEN_STRINGS);
  }

  getAlertButtons(message) {
    const strings = this.getLanguageStrings();
    switch (message) {
      case strings.emailError:
      case strings.passwordError:
        return [
          {
            text: strings.ok,
            onPress: () => this.setState({ alertVisible: false })
          }
        ];
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
          {
            text: strings.resetPassword,
            onPress: () => this.handleResetPassword()
          }
        ];
      default:
        return [
          {
            text: strings.ok,
            onPress: () => this.setState({ alertVisible: false })
          }
        ];
    }
  }

  handleResetPassword() {
    const strings = this.getLanguageStrings();
    const forgotPasswordEmail = this.state.forgotPasswordEmail.trim();
    this.setState({ forgotPasswordEmail });
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
            resetPasswordError: '',
            showToast: true
          });
        }
      })
      .catch(error => {
        const msg = handleErrorMsg(error, strings);
        this.setState({ resetPasswordError: msg });
      });
  }

  changeLang() {
    const language = this.props.language === 'SE' ? 'EN' : 'SE';
    this.props.setLanguage(language);
    saveItem('language', language);
  }

  handleLogin() {
    Keyboard.dismiss();
    const strings = this.getLanguageStrings();
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
          this.props.setToken(accessToken);
          this.props.setEmail(email);
          this.props.setUserinfo(userinfo);
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
    const { containerStyle, container1 } = styles;
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
    const strings = this.getLanguageStrings();
    return (
      <View style={containerStyle}>
        <BackgroundImage pictureNumber="background-login" />
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
              keyboardType="email-address"
              placeholder={strings.email}
              autoCapitalize="none"
              width={COMPONENT_WIDTH}
              onChangeText={text => this.setState({ email: text })}
              returnKeyType="next"
              onSubmitEditing={() => this.refs.secondInput.focus()}
            />
            <Input
              ref="secondInput"
              value={password}
              placeholder={strings.password}
              width={COMPONENT_WIDTH}
              secureText
              onChangeText={text => this.setState({ password: text })}
              returnKeyType="done"
              onSubmitEditing={() => this.handleLogin()}
            />
            <CustomButton
              text={strings.loginButton}
              onPress={() => this.handleLogin()}
              style="standardButton"
              width={COMPONENT_WIDTH}
            />
            <CustomButton
              text={strings.createProfile}
              width={COMPONENT_WIDTH}
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
              setAlertVisible={visible =>
                this.setState({ alertVisible: visible })
              }
              buttonsIn={this.getAlertButtons(message)}
              header={this.state.alertHeader || ''}
              info={this.state.message || ''}
            >
              {message === strings.passwordPopupInfo ? (
                <View>
                  <Input
                    placeholder={strings.email}
                    width={WIDTH / 1.2}
                    underlineColorAndroid="transparent"
                    onChangeText={text =>
                      this.setState({
                        forgotPasswordEmail: text,
                        resetPasswordError: ''
                      })
                    }
                    value={forgotPasswordEmail}
                    returnKeyType="done"
                    onSubmitEditing={() => this.handleResetPassword()}
                    hasError={resetPasswordError !== ''}
                    warningMessage={resetPasswordError}
                  />
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
                actions: [
                  NavigationActions.navigate({
                    routeName: 'MyPageNavRouter'
                  })
                ],
                key: null
              });
              this.setState({
                loading: false,
                loadingComplete: false,
                password: ''
              });
              this.props.navigation.dispatch(resetAction);
            }}
          />
        ) : null}
      </View>
    );
  }
}

LoginScreen.propTypes = {
  language: PropTypes.string.isRequired,
  navigation: PropTypes.shape().isRequired,
  setEmail: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  setUserinfo: PropTypes.func.isRequired
};
const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, {
  setLanguage,
  setToken,
  setEmail,
  setUserinfo
})(LoginScreen);
