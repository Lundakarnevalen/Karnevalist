import React, { Component } from 'react';
import { Alert, View, Dimensions, ScrollView, StatusBar } from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import CustomButton from '../common/CustomButton';
import { setTheme, setLanguage } from '../../actions';
import Input from '../common/Input';
import PasswordPopUp from '../common/PasswordPopUp';
import BackgroundImage from '../common/BackgroundImage';
import Loading from '../common/Loading';
import { getItem, saveItem } from '../../helpers/LocalSave';
import { LOGIN_SCREEN_STRINGS } from '../../helpers/LanguageStrings'

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
      forgotPasswordEmail: ''
    };
  }

  componentWillMount() {
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

  getStrings() {
    const { language } = this.props
    const { fields } = LOGIN_SCREEN_STRINGS
    const strings = {}
    fields.forEach(field => (strings[field] = LOGIN_SCREEN_STRINGS[field][language]))
    return strings
  }

  changeLang() {
    const language = this.props.language === 'SE' ? 'EN' : 'SE'
    this.props.setLanguage(language)
    saveItem('language', language)
  }

  render() {
    const { containerStyle } = styles;
    const { email, password, loading, loadingComplete, forgotPasswordEmail } = this.state;
    const strings = this.getStrings()
    return (
      <View style={containerStyle}>
        <BackgroundImage pictureNumber={4} />
        <ScrollView>
          <View style={styles.container1}>
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
              placeholder={strings.email}
              width={WIDTH}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              value={password}
              placeholder={strings.password}
              width={WIDTH}
              secureText
              onChangeText={text => this.setState({ password: text })}
            />
            <CustomButton
              text={strings.loginButton}
              onPress={() => {
                if (email === '') {
                  Alert.alert(strings.error, strings.emailError);
                } else if (password === '') {
                  Alert.alert(strings.error, strings.passwordError);
                } else {
                  this.setState({ loading: true, loadingComplete: false });
                  axios
                    .post('https://api.10av10.com/login/email', {
                      email,
                      password
                    })
                    .then(() => {
                      this.setState({ loadingComplete: true });
                    })
                    .catch(error => {
                      let msg;
                      if (error.message.includes('400')) {
                        msg = strings.errorMsg400;
                      } else if (error.message.includes('401')) {
                        msg = strings.errorMsg401;
                      } else if (error.message.includes('404')) {
                        msg = strings.errorMsg404;
                      } else {
                        msg = strings.errorMsgInternal;
                      }
                      this.setState({ loading: false, loadingComplete: false });
                      Alert.alert(strings.error, msg);
                    });
                }
              }}
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
            <PasswordPopUp
              alertVisible={this.state.alertVisible}
              setAlertVisible={(visible) => this.setState({ alertVisible: visible })}
              buttonsIn={[
                {
                  text: strings.passwordPopupCancel,
                  onPress: () => {
                    this.setState({ alertVisible: false });
                  }
                },
                {
                  text: strings.passwordPopupResetPassword,
                  onPress: () => {
                    this.setState({ alertVisible: false });
                  }
                }
              ]}
              header={strings.passwordPopupHeader}
              info={strings.passwordPopupInfo}
              onChangeText={text => this.setState({ forgotPasswordEmail: text })}
              inputValue={forgotPasswordEmail}
            />
          </View>
        </ScrollView>
        {loading ? (
          <Loading
            loadingComplete={loadingComplete}
            redirect={() => {
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'MyPageNavbarScreen' }),
                ],
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
  }
};

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage
  return { language };
};

export default connect(mapStateToProps, { setTheme, setLanguage })(LoginScreen);
