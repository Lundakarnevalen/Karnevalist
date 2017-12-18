import React, { Component } from 'react';
import {
  Alert,
  ScrollView,
  View,
  Dimensions,
  Picker,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../common/Header';
import Input from '../common/Input';
import DKPicker from '../common/DKPicker';
import CustomButton from '../common/CustomButton';
import ButtonChoiceManager from '../common/ButtonChoiceManager';
import CameraButton from '../common/CameraButton';
import BackgroundImage from '../common/BackgroundImage';
import Loading from '../common/Loading';
import { REGISTRATION_SCREEN_STRINGS } from '../../helpers/LangStrings'

const width = Dimensions.get('window').width - 32;
const height = Dimensions.get('window').height;

const shirtSizeArray = ['Choose shirt size', 'Small', 'Medium', 'Large'];
const studentUnionArray = ['Select a nation', 'Lunds Nation', 'Göteborgs Nation', 'Malmös Nation'];

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      confirmedEmail: '',
      password: '',
      confirmedPassword: '',
      address: '',
      postcode: '',
      city: '',
      phoneNbr: '',
      foodPreferences: '',
      shirtSize: '',
      studentUnion: '',
      showShirtPicker: false,
      showStudentUnionPicker: false,
      loading: false,
      loadingComplete: false
    };
  }

  getColor() {
    return this.props.theme === 'day' ? 'rgb(138, 71, 151)' : 'white';
  }

  getStrings() {
    const { lang } = this.props
    const { fields } = REGISTRATION_SCREEN_STRINGS
    const strings = {}
    fields.forEach(field => strings[field] = REGISTRATION_SCREEN_STRINGS[field][lang])
    return strings
  }

  renderPickerForPlatform(defaultTitle, title, tag) {
    const { shirtSize, studentUnion } = this.state;
    if (Platform.OS === 'ios') {
      return (
        <CustomButton
          text={title === '' ? defaultTitle : title}
          style="dropDownButton"
          width={width}
          onPress={() => {
            return tag === 'shirt'
              ? this.setState({ showShirtPicker: true })
              : this.setState({ showStudentUnionPicker: true });
          }}
        />
      );
    }
    return (
      <View>
        <Picker
          onValueChange={itemValue => {
            return tag === 'shirt'
              ? this.setState({ shirtSize: itemValue })
              : this.setState({ studentUnion: itemValue });
          }}
          selectedValue={tag === 'shirt' ? shirtSize : studentUnion}
          style={styles.androidPicker}
        >
          {this.renderPickerArray(tag)}
        </Picker>
      </View>
    );
  }

  renderPickerArray(tag) {
    if (tag === 'shirt') {
      return shirtSizeArray.map(item => {
        return <Picker.Item key={item} label={item} value={item} />;
      });
    }
    return studentUnionArray.map(item => {
      return <Picker.Item key={item} label={item} value={item} />;
    });
  }

  renderDKBackgroundCloser() {
    const { showShirtPicker, showStudentUnionPicker } = this.state;
    if (showShirtPicker || showStudentUnionPicker) {
      return (
        <TouchableWithoutFeedback
          style={{ position: 'absolute' }}
          onPress={() => this.setState({ showShirtPicker: false, showStudentUnionPicker: false })}
        >
          <View
            style={{
              position: 'absolute',
              width: width + 32,
              height,
              backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }}
          />
        </TouchableWithoutFeedback>
      );
    }
  }

  render() {
    const strings = this.getStrings()
    const { flexHorizontal } = styles;
    const {
      firstName,
      lastName,
      email,
      confirmedEmail,
      address,
      postcode,
      city,
      phoneNbr,
      foodPreferences,
      password,
      confirmedPassword,
      loading,
      loadingComplete,
      shirtSize,
      showShirtPicker,
      studentUnion,
      showStudentUnionPicker
    } = this.state;

    const closeButton = (
      <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
        <MaterialCommunityIcons size={30} name="close" color={this.getColor()} />
      </TouchableOpacity>
    );

    return (
      <View>
        <BackgroundImage pictureNumber={5} />
        <Header title={strings.header} rightIcon={closeButton} />
        <ScrollView contentContainerStyle={styles.contentContainer} style={{ height: height - 64 }}>
          <CameraButton
            onPress={() => this.props.navigation.navigate('CameraScreen')}
            source={this.props.picture}
          />
          <Input
            placeholder={strings.firstName}
            onChangeText={firstNameInput => {
              this.setState({ firstName: firstNameInput });
            }}
            value={firstName}
          />
          <Input
            placeholder={strings.lastName}
            onChangeText={lastNameInput => {
              this.setState({ lastName: lastNameInput });
            }}
            value={lastName}
          />
          <Input
            placeholder={strings.email}
            onChangeText={emailInput => {
              this.setState({ email: emailInput });
            }}
            value={email}
          />
          <Input
            placeholder={strings.confirmEmail}
            onChangeText={emailInput => {
              this.setState({ confirmedEmail: emailInput });
            }}
            value={confirmedEmail}
          />
          <Input
            placeholder={strings.password}
            onChangeText={text => {
              this.setState({ password: text });
            }}
            value={password}
            secureText
          />
          <Input
            placeholder={strings.confirmPassword}
            onChangeText={text => {
              this.setState({ confirmedPassword: text });
            }}
            value={confirmedPassword}
            secureText
          />
          <Input
            placeholder={strings.address}
            onChangeText={addressInput => {
              this.setState({ address: addressInput });
            }}
            value={address}
          />
          <View style={flexHorizontal}>
            <Input
              placeholder={strings.postcode}
              onChangeText={postcodeInput => {
                this.setState({ postcode: postcodeInput });
              }}
              width={width / 2 - 4}
              extraContainerStyle={{ marginRight: 8 }}
              value={postcode}
            />
            <Input
              placeholder={strings.city}
              onChangeText={cityInput => {
                this.setState({ city: cityInput });
              }}
              width={width / 2 - 4}
              value={city}
            />
          </View>
          <Input
            placeholder={strings.phoneNumber}
            onChangeText={phoneNbrInput => {
              this.setState({ phoneNbr: phoneNbrInput });
            }}
            value={phoneNbr}
          />
          <Input
            placeholder={strings.foodPreferences}
            onChangeText={foodPreferencesInput => {
              this.setState({ foodPreferences: foodPreferencesInput });
            }}
            value={foodPreferences}
          />
          {this.renderPickerForPlatform(strings.shirtSize, shirtSize, 'shirt')}
          {this.renderPickerForPlatform(strings.studentUnion, studentUnion, 'union')}
          <View style={{ right: 3 }}>
          <ButtonChoiceManager
            buttonInputVector={[strings.activeKarneval]}
            multipleChoice
            size={30}
            color={this.getColor()}
          />
          <ButtonChoiceManager
            buttonInputVector={[strings.driversLicense]}
            multipleChoice
            size={30}
            color={this.getColor()}
          />
          </View>
          <CustomButton
            text={strings.register}
            style={'standardButton'}
            width={width}
            onPress={() => {
              if (firstName === '') {
                Alert.alert('Error', 'First name is required.');
              } else if (lastName === '') {
                Alert.alert('Error', 'Last name is required.');
              } else if (email === '') {
                Alert.alert('Error', 'Email is required.');
              } else if (confirmedEmail === '') {
                Alert.alert('Error', 'Please confirm your email.');
              } else if (address === '') {
                Alert.alert('Error', 'Address is required.');
              } else if (postcode === '') {
                Alert.alert('Error', 'Postcode is required.');
              } else if (city === '') {
                Alert.alert('Error', 'City is required.');
              } else if (phoneNbr === '') {
                Alert.alert('Error', 'Phone number is required.');
              } else if (password === '') {
                Alert.alert('Error', 'Password is required.');
              } else if (confirmedPassword === '') {
                Alert.alert('Error', 'Please confirm your password.');
              } else if (email !== confirmedEmail) {
                Alert.alert('Error', "Your emails doesn't match.");
              } else if (password !== confirmedPassword) {
                Alert.alert('Error', "Your passwords doesn't match.");
              } else {
                this.setState({ loadingComplete: false, loading: true });
                axios
                  .post('https://api.10av10.com/register', {
                    email,
                    password,
                    postNumber: postcode,
                    firstName,
                    lastName,
                    phoneNumber: phoneNbr,
                    address,
                    city,
                    foodPreferences
                  })
                  .then(() => {
                    this.setState({ loadingComplete: true });
                  })
                  .catch(error => {
                    let msg;
                    if (error.message.includes('400')) {
                      msg = 'Invalid email or password';
                    } else if (error.message.includes('401')) {
                      msg = 'Invalid email or password';
                    } else if (error.message.includes('404')) {
                      msg = 'Something went wrong...';
                    } else {
                      msg = 'Internal error, please try again later';
                    }
                    this.setState({ loadingComplete: false, loading: false });
                    Alert.alert('Error', msg);
                  });
              }
            }}
          />
        </ScrollView>
        {this.renderDKBackgroundCloser()}
        <DKPicker
          onValueChange={newValue => this.setState({ shirtSize: newValue })}
          items={shirtSizeArray}
          value={shirtSize}
          isShowing={showShirtPicker}
          close={() => this.setState({ showShirtPicker: false })}
        />
        <DKPicker
          onValueChange={newValue => this.setState({ studentUnion: newValue })}
          items={studentUnionArray}
          value={studentUnion}
          isShowing={showStudentUnionPicker}
          close={() => this.setState({ showStudentUnionPicker: false })}
        />
        {loading ? (
          <Loading
            loadingComplete={loadingComplete}
            redirect={() => {
              this.props.navigation.navigate('HomeScreen');
              this.setState({ loading: false, loadingComplete: false });
            }}
          />
        ) : null}
      </View>
    );
  }
}

const styles = {
  titelTextStyle: {
    fontSize: 40
  },
  flexHorizontal: {
    flexDirection: 'row'
  },
  contentContainer: {
    paddingTop: 32,
    paddingRight: 16,
    paddingBottom: 64,
    paddingLeft: 16
  },
  androidPicker: {
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'black',
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderWidth: 1
  }
};

const mapStateToProps = ({ currentTheme, userInformation, currentLang }) => {
  const { theme } = currentTheme;
  const { picture } = userInformation;
  const { lang } = currentLang
  return { theme, picture, lang };
};

export default connect(mapStateToProps, null)(RegistrationScreen);
