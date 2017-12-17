import React, { Component } from 'react';
import { Alert, View, Dimensions, ScrollView, StatusBar } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import CustomButton from '../common/CustomButton';
import { setTheme } from '../../actions';
import Input from '../common/Input';
import PasswordPopUp from '../common/PasswordPopUp';
import BackgroundImage from '../common/BackgroundImage';
import Loading from '../common/Loading';

const WIDTH = Dimensions.get('window').width * 0.9;
const HEIGHT = Dimensions.get('window').height;

class HomeScreen extends Component {
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

  render() {
    const { containerStyle } = styles;
    const { email, password, loading, loadingComplete, forgotPasswordEmail } = this.state;
    return (
      <View style={containerStyle}>
        <BackgroundImage pictureNumber={4} />
        <ScrollView>
          <View style={styles.container1}>
            <Input
              value={email}
              placeholder="Email address"
              width={WIDTH}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              value={password}
              placeholder="Lösenord"
              width={WIDTH}
              secureText
              onChangeText={text => this.setState({ password: text })}
            />
            <CustomButton
              text="Logga in"
              onPress={() => {
                if (email === '') {
                  Alert.alert('Error', 'The email field is required');
                } else if (password === '') {
                  Alert.alert('Error', 'The password field is required');
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
                        msg = 'Wrong email or password';
                      } else if (error.message.includes('401')) {
                        msg = 'Wrong email or password';
                      } else if (error.message.includes('404')) {
                        msg = 'Something went wrong...';
                      } else {
                        msg = 'Internal error, please try again later';
                      }
                      this.setState({ loading: false, loadingComplete: false });
                      Alert.alert('Error', msg);
                    });
                }
              }}
              style={'standardButton'}
              width={WIDTH}
            />
            <CustomButton
              text="Glömt lösenord?"
              onPress={() => {
                this.setState({ alertVisible: true });
              }}
              style="textButton"
            />
            <CustomButton
              text="Skapa profil"
              width={WIDTH}
              onPress={() => {
                this.props.navigation.navigate('RegistrationScreen');
              }}
              style="standardButton"
            />
            <CustomButton
              text="Läs mer om registreringen"
              onPress={() => {
                this.props.navigation.navigate('RegistrationInfo');
              }}
              style="textButton"
            />
            <PasswordPopUp
              alertVisible={this.state.alertVisible}
              setAlertVisible={() => this.setState({ alertVisible: true })}
              buttonsIn={[
                {
                  text: 'Cancel',
                  onPress: () => {
                    console.log('cancel');
                    this.setState({ alertVisible: false });
                  }
                },
                {
                  text: 'Reset password',
                  onPress: () => {
                    console.log('reset');
                    this.setState({ alertVisible: false });
                  }
                }
              ]}
              header={'Forgot password?'}
              info={'Please, fill in your email address below and you will receive a new password'}
              onChangeText={text => this.setState({ forgotPasswordEmail: text })}
              inputValue={forgotPasswordEmail}
            />
          </View>
        </ScrollView>
        {loading ? (
          <Loading
            loadingComplete={loadingComplete}
            redirect={() => {
              this.props.navigation.navigate('MyPageNavbarScreen');
              this.setState({ loading: false, loadingComplete: false, password: '' });
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

export default connect(null, { setTheme })(HomeScreen);
