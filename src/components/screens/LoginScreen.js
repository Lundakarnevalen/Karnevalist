import React, { Component } from 'react';
import { Alert, View, Dimensions, ScrollView, Text } from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import CustomButton from '../common/CustomButton';
import { setLanguage, setToken, setEmail } from '../../actions';
import Input from '../common/Input';
import SuperAgileAlert from '../common/SuperAgileAlert';
import BackgroundImage from '../common/BackgroundImage';
import Loading from '../common/Loading';
import Toast from '../common/Toast';
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
    const url = 'https://api.10av10.com/login/forgotpassword';
    const strings = this.getStrings();
    axios
      .post(url, {
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
        const msg = handleErrorMsg(error.message, strings);
        this.setState({ resetPasswordError: msg });
      });
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
    const { containerStyle, container1, errorTextStyle } = styles;
    const {
      email,
      password,
      loading,
      loadingComplete,
      forgotPasswordEmail,
      alertVisible,
      resetPasswordError
    } = this.state;
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
                {
                  text: strings.cancel,
                  onPress: () => this.setState({ alertVisible: false, resetPasswordError: ' ' })
                },
                { text: strings.resetPassword, onPress: () => this.handleResetPassword() }
              ]}
              header={strings.passwordPopupHeader}
              info={strings.passwordPopupInfo}
            >
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

export default connect(mapStateToProps, { setLanguage, setToken, setEmail })(LoginScreen);
