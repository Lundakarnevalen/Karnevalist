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
import BackgroundImage from '../common/BackgroundImage';
import Loading from '../common/Loading';
import { REGISTRATION_SCREEN_STRINGS } from '../../helpers/LanguageStrings';
import { handleErrorMsg } from '../../helpers/ApiManager';

const width = Dimensions.get('window').width - 32;
const height = Dimensions.get('window').height;

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
      postNumber: '',
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
    const { language } = this.props;
    const { fields } = REGISTRATION_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = REGISTRATION_SCREEN_STRINGS[field][language]));
    return strings;
  }

  renderPickerForPlatform(defaultTitle, tagArray, title, tag) {
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
          {this.renderPickerArray(tag, tagArray)}
        </Picker>
      </View>
    );
  }

  renderPickerArray(tag, tagArray) {
    if (tag === 'shirt') {
      return tagArray.map(item => {
        return <Picker.Item key={item} label={item} value={item} />;
      });
    }
    return tagArray.map(item => {
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
    const strings = this.getStrings();
    const { flexHorizontal } = styles;
    const {
      firstName,
      lastName,
      email,
      confirmedEmail,
      address,
      postNumber,
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
          <Input
            placeholder={strings.firstName}
            onChangeText={firstNameInput => {
              this.setState({ firstName: firstNameInput });
            }}
            value={firstName}
            restriction={'onlyLetters'}
          />
          <Input
            placeholder={strings.lastName}
            onChangeText={lastNameInput => {
              this.setState({ lastName: lastNameInput });
            }}
            value={lastName}
            restriction={'onlyLetters'}
          />
          <Input
            placeholder={strings.email}
            keyboardType="email-address"
            onChangeText={emailInput => {
              this.setState({ email: emailInput });
            }}
            value={email}
            restriction={'isEmail'}
          />
          <Input
            placeholder={strings.confirmEmail}
            keyboardType="email-address"
            onChangeText={emailInput => {
              this.setState({ confirmedEmail: emailInput });
            }}
            value={confirmedEmail}
            restriction={'isEmail'}
          />
          <Input
            placeholder={strings.password}
            onChangeText={text => {
              this.setState({ password: text });
            }}
            value={password}
            restriction={'isValidPwd'}
            secureText
          />
          <Input
            placeholder={strings.confirmPassword}
            onChangeText={text => {
              this.setState({ confirmedPassword: text });
            }}
            value={confirmedPassword}
            restriction={'isValidPwd'}
            secureText
          />
          <Input
            placeholder={strings.address}
            onChangeText={addressInput => {
              this.setState({ address: addressInput });
            }}
            value={address}
            restriction={(adress) => adress.length < 40}
          />
          <View style={flexHorizontal}>
            <Input
              placeholder={strings.postNumber}
              keyboardType="numeric"
              onChangeText={postNumberInput => {
                this.setState({ postNumber: postNumberInput });
              }}
              width={width / 2 - 4}
              extraContainerStyle={{ marginRight: 8 }}
              value={postNumber}
              restriction={'onlyDigits'}
            />
            <Input
              placeholder={strings.city}
              onChangeText={cityInput => {
                this.setState({ city: cityInput });
              }}
              width={width / 2 - 4}
              value={city}
              restriction={'onlyLetters'}
            />
          </View>
          <Input
            placeholder={strings.phoneNumber}
            keyboardType="phone-pad"
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
            restriction={'onlyLetters'}
          />
          {this.renderPickerForPlatform(
            strings.shirtSize,
            strings.shirtSizeArray,
            shirtSize,
            'shirt'
          )}
          {this.renderPickerForPlatform(
            strings.studentUnion,
            strings.studentUnionArray,
            studentUnion,
            'union'
          )}
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
                Alert.alert(strings.error, strings.errorFirstName);
              } else if (lastName === '') {
                Alert.alert(strings.error, strings.errorLastName);
              } else if (email === '') {
                Alert.alert(strings.error, strings.errorEmail);
              } else if (confirmedEmail === '') {
                Alert.alert(strings.error, strings.errorConfirmEmail);
              } else if (address === '') {
                Alert.alert(strings.error, strings.errorAddress);
              } else if (postNumber === '') {
                Alert.alert(strings.error, strings.errorPostNumber);
              } else if (city === '') {
                Alert.alert(strings.error, strings.errorCity);
              } else if (phoneNbr === '') {
                Alert.alert(strings.error, strings.errorPhoneNumber);
              } else if (password === '') {
                Alert.alert(strings.error, strings.errorPassword);
              } else if (confirmedPassword === '') {
                Alert.alert(strings.error, strings.errorConfirmPassword);
              } else if (email !== confirmedEmail) {
                Alert.alert(strings.error, strings.errorEmailMatch);
              } else if (password !== confirmedPassword) {
                Alert.alert(strings.error, strings.errorPasswordMatch);
              } else {
                this.setState({ loadingComplete: false, loading: true });
                axios
                  .post('https://api.10av10.com/register', {
                    email,
                    password,
                    postNumber,
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
                    const msg = handleErrorMsg(error.message, strings);
                    this.setState({ loadingComplete: false, loading: false });
                    Alert.alert(strings.error, msg);
                  });
              }
            }}
          />
        </ScrollView>
        {this.renderDKBackgroundCloser()}
        <DKPicker
          onValueChange={newValue => this.setState({ shirtSize: newValue })}
          items={strings.shirtSizeArray}
          value={shirtSize}
          isShowing={showShirtPicker}
          close={() => this.setState({ showShirtPicker: false })}
        />
        <DKPicker
          onValueChange={newValue => this.setState({ studentUnion: newValue })}
          items={strings.studentUnionArray}
          value={studentUnion}
          isShowing={showStudentUnionPicker}
          close={() => this.setState({ showStudentUnionPicker: false })}
        />
        {loading ? (
          <Loading
            loadingComplete={loadingComplete}
            redirect={() => {
              this.props.navigation.navigate('LoginScreen');
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

const mapStateToProps = ({ currentTheme, userInformation, currentLanguage }) => {
  const { theme } = currentTheme;
  const { picture } = userInformation;
  const { language } = currentLanguage;
  return { theme, picture, language };
};

export default connect(mapStateToProps, null)(RegistrationScreen);
