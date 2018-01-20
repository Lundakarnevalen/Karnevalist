import React, { Component } from 'react';
import {
  Alert,
  ScrollView,
  View,
  Dimensions,
  Picker,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setToken, setEmail } from '../../actions';
import Header from '../common/Header';
import Input from '../common/Input';
import DKPicker from '../common/DKPicker';
import CustomButton from '../common/CustomButton';
import ButtonChoiceManager from '../common/ButtonChoiceManager';
import BackgroundImage from '../common/BackgroundImage';
import Loading from '../common/Loading';
import { REGISTRATION_SCREEN_STRINGS, ERROR_MSG_INPUT_FIELD } from '../../helpers/LanguageStrings';
import { handleErrorMsg } from '../../helpers/ApiManager';
import { saveItem } from '../../helpers/LocalSave';

const WIDTH = Dimensions.get('window').width - 32;
const HEIGHT = Dimensions.get('window').height;
let zipCodePosition = 0;

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: ['', '', '', '', '', '', '', '', '', '', '', '', ''],
      shirtSize: '',
      studentUnion: '',
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      confirmedEmailError: false,
      passwordError: false,
      confirmedPasswordError: false,
      socialSecurityNbrError: false,
      postNumberError: false,
      cityError: false,
      phoneNbrError: false,
      foodPreferencesError: false,
      showShirtPicker: false,
      showStudentUnionPicker: false,
      loading: false,
      loadingComplete: false,
      keyboardHeight: 0,
      listToTrim: []
    };
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    } else {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowSub.remove();
    } else {
      this.keyboardDidShowListener.remove();
    }
  }

  keyboardWillShow = event => {
    this.setState({ keyboardHeight: event.endCoordinates.height });
  };

  keyboardDidShow = event => {
    this.setState({ keyboardHeight: event.endCoordinates.height });
  };

  scrollToInput(inputPosition) {
    const dy = HEIGHT - this.state.keyboardHeight - 64;
    const scrollTo = dy - inputPosition;
    if (scrollTo < 0) {
      this.refs.scrollView.scrollTo({
        y: inputPosition - dy,
        animated: true
      });
    }
  }

  isEmail(toTest) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      toTest
    );
  }

  containsOnlyLetters(toTest) {
    return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
      toTest
    );
  }

  isValidPhoneNbr(toTest) {
    return /^\+?\d+$/.test(toTest) && toTest.length >= 7 && toTest.length <= 20;
  }

  containsOnlyDigits(text) {
    return /^\d+$/.test(text);
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = REGISTRATION_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = REGISTRATION_SCREEN_STRINGS[field][language]));
    return strings;
  }

  getErrorStrings() {
    const { language } = this.props;
    const { fields } = ERROR_MSG_INPUT_FIELD;
    const strings = {};
    fields.forEach(field => (strings[field] = ERROR_MSG_INPUT_FIELD[field][language]));
    return strings;
  }

  anyEmpty() {
    const {
      firstName,
      lastName,
      email,
      confirmedEmail,
      address,
      postNumber,
      city,
      phoneNbr,
      password,
      confirmedPassword,
      socialSecurityNumber,
      studentUnion,
      shirtSize
    } = this.state;
    return (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      confirmedEmail === '' ||
      address === '' ||
      postNumber === '' ||
      city === '' ||
      phoneNbr === '' ||
      password === '' ||
      confirmedPassword === '' ||
      socialSecurityNumber === '' ||
      shirtSize === '' ||
      studentUnion === '' ||
      shirtSize === 'Välj tröjstorlek' ||
      studentUnion === 'Välj nation'
    );
  }

  trimValues() {
    const { inputs } = this.state;
    const trimmedList = inputs;
    trimmedList.forEach(input => input.trim());
    this.setState({ inputs: trimmedList });
  }

  renderPickerForPlatform(defaultTitle, tagArray, title, tag) {
    const { shirtSize, studentUnion } = this.state;
    if (Platform.OS === 'ios') {
      return (
        <CustomButton
          text={title === '' ? defaultTitle : title}
          style="dropDownButton"
          width={WIDTH}
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
              width: WIDTH + 32,
              height: HEIGHT,
              backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }}
          />
        </TouchableWithoutFeedback>
      );
    }
  }

  render() {
    const strings = this.getStrings();
    const errorStrings = this.getErrorStrings();
    const { flexHorizontal } = styles;
    const {
      inputs,
      loading,
      loadingComplete,
      shirtSize,
      firstNameError,
      lastNameError,
      emailError,
      confirmedEmailError,
      passwordError,
      confirmedPasswordError,
      socialSecurityNbrError,
      postNumberError,
      cityError,
      phoneNbrError,
      foodPreferencesError,
      showShirtPicker,
      studentUnion,
      showStudentUnionPicker
    } = this.state;

    const closeButton = (
      <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
        <MaterialCommunityIcons size={30} name="close" color={'white'} />
      </TouchableOpacity>
    );

    return (
      <View>
        <BackgroundImage pictureNumber={5} />
        <Header title={strings.header} rightIcon={closeButton} />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={{ height: HEIGHT - 64 }}
          ref={'scrollView'}
        >
          <Input
            placeholder={strings.firstName}
            onChangeText={text => {
              inputs[0] = text;
              this.setState({ inputs, firstNameError: !this.containsOnlyLetters(text) });
            }}
            value={inputs[0]}
            onSubmitEditing={() => this.refs.secondInput.focus()}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            autoFocus
            hasError={firstNameError}
            warningMessage={errorStrings.errorMsgOnlyLetters}
          />
          <Input
            ref={'secondInput'}
            onSubmitEditing={() => this.refs.thirdInput.focus()}
            placeholder={strings.lastName}
            onChangeText={text => {
              inputs[1] = text;
              this.setState({ inputs, lastNameError: !this.containsOnlyLetters(text) });
            }}
            value={inputs[1]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            hasError={lastNameError}
            warningMessage={errorStrings.errorMsgOnlyLetters}
          />
          <Input
            ref={'thirdInput'}
            onSubmitEditing={() => this.refs.fourthInput.focus()}
            placeholder={strings.socialSecurityNumber}
            onChangeText={text => {
              inputs[2] = text;
              this.setState({
                inputs,
                socialSecurityNbrError: !(text.length === 10 && /^[a-zA-Z0-9_]+$/.test(text))
              });
            }}
            value={inputs[2]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            hasError={socialSecurityNbrError}
            warningMessage={errorStrings.errorMsgSocialSecurity}
          />
          <Input
            ref={'fourthInput'}
            onSubmitEditing={() => this.refs.fifthInput.focus()}
            placeholder={strings.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => {
              inputs[3] = text;
              this.setState({ inputs, emailError: !this.isEmail(text), confirmedEmailError: text !== inputs[4] });
            }}
            value={inputs[3]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            hasError={emailError}
            warningMessage={errorStrings.errorMsgInvalidEmail}
          />
          <Input
            ref={'fifthInput'}
            onSubmitEditing={() => this.refs.sixthInput.focus()}
            placeholder={strings.confirmEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => {
              inputs[4] = text;
              this.setState({ inputs, confirmedEmailError: text !== inputs[3] });
            }}
            value={inputs[4]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            hasError={confirmedEmailError}
            warningMessage={errorStrings.errorMsgNoMatchEmail}
          />
          <Input
            ref={'sixthInput'}
            onSubmitEditing={() => this.refs.seventhInput.focus()}
            placeholder={strings.password}
            onChangeText={text => {
              inputs[5] = text;
              this.setState({ inputs, passwordError: text.length < 5 });
            }}
            value={inputs[5]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            secureText
            hasError={passwordError}
            warningMessage={errorStrings.errorMsgPwd}
          />
          <Input
            ref={'seventhInput'}
            onSubmitEditing={() => this.refs.eigthInput.focus()}
            placeholder={strings.confirmPassword}
            onChangeText={text => {
              inputs[6] = text;
              this.setState({ inputs, confirmedPasswordError: text !== inputs[5] });
            }}
            value={inputs[6]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            secureText
            hasError={confirmedPasswordError}
            warningMessage={errorStrings.errorMsgNoMatchPassword}
          />
          <Input
            ref={'eigthInput'}
            onSubmitEditing={() => this.refs.ninthInput.focus()}
            placeholder={strings.address}
            onChangeText={text => {
              inputs[7] = text;
              this.setState({ inputs });
            }}
            value={inputs[7]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
          />
          <View
            style={flexHorizontal}
            ref={'horizontalInputView'}
            onLayout={event => {
              zipCodePosition = event.nativeEvent.layout.y;
            }}
          >
            <Input
              ref={'ninthInput'}
              onSubmitEditing={() => this.refs.tenthInput.focus()}
              placeholder={strings.postNumber}
              keyboardType="numeric"
              onChangeText={text => {
                inputs[8] = text;
                this.setState({
                  inputs,
                  postNumberError: text.length !== 5 || !this.containsOnlyDigits(text)
                });
              }}
              width={(WIDTH / 2) - 4}
              extraContainerStyle={{ marginRight: 8 }}
              value={inputs[8]}
              returnKeyType={'next'}
              scrollToInput={() => this.scrollToInput(100 + zipCodePosition)}
              hasError={postNumberError}
              warningMessage={errorStrings.errorMsgZipCode}
            />
            <Input
              ref={'tenthInput'}
              onSubmitEditing={() => this.refs.eleventhInput.focus()}
              placeholder={strings.city}
              onChangeText={text => {
                inputs[9] = text;
                this.setState({ inputs, cityError: !this.containsOnlyLetters(text) });
              }}
              width={(WIDTH / 2) - 4}
              value={inputs[9]}
              returnKeyType={'next'}
              scrollToInput={() => this.scrollToInput(100 + zipCodePosition)}
              hasError={cityError}
              warningMessage={errorStrings.errorMsgCity}
            />
          </View>
          <Input
            ref={'eleventhInput'}
            onSubmitEditing={() => this.refs.twelthInput.focus()}
            placeholder={strings.phoneNumber}
            keyboardType="phone-pad"
            onChangeText={text => {
              inputs[10] = text;
              this.setState({
                inputs,
                phoneNbrError: !this.isValidPhoneNbr(text)
              });
            }}
            value={inputs[10]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            hasError={phoneNbrError}
            warningMessage={errorStrings.errorMsgPhoneNbr}
          />
          <Input
            ref={'twelthInput'}
            placeholder={strings.foodPreferences}
            onChangeText={text => {
              inputs[11] = text;
              this.setState({
                inputs,
                foodPreferencesError: !/^[a-zåäöA-ZÅÄÖ., ]+$/.test(text)
              });
            }}
            value={inputs[11]}
            returnKeyType={'done'}
            autoCapitalize="sentences"
            scrollToInput={y => this.scrollToInput(y)}
            hasError={foodPreferencesError}
            warningMessage={[errorStrings.errorMsgFoodPreference]}
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
              color={'white'}
            />
            <ButtonChoiceManager
              buttonInputVector={[strings.driversLicense]}
              multipleChoice
              size={30}
              color={'white'}
            />
          </View>
          <CustomButton
            text={strings.register}
            style={'standardButton'}
            width={WIDTH}
            onPress={() => {
              this.trimValues();
              if (
                firstNameError ||
                lastNameError ||
                emailError ||
                confirmedEmailError ||
                passwordError ||
                confirmedPasswordError ||
                socialSecurityNbrError ||
                postNumberError ||
                cityError ||
                phoneNbrError ||
                foodPreferencesError ||
                this.anyEmpty()
              ) {
                Alert.alert(errorStrings.errorMsgWrongInput);
              } else {
                this.setState({ loadingComplete: false, loading: true });
                axios
                  .post('https://api.10av10.com/register', {
                    firstName: inputs[0],
                    lastName: inputs[1],
                    personalNumber: inputs[2],
                    email: inputs[3],
                    password: inputs[5],
                    address: inputs[7],
                    postNumber: inputs[8],
                    city: inputs[9],
                    phoneNumber: inputs[10],
                    foodPreferences: inputs[11],
                  })
                  .then(response => {
                    const { accessToken } = response.data;
                    this.props.setToken(accessToken);
                    this.props.setEmail(inputs[3]);
                    saveItem('email', inputs[3]);
                    saveItem('accessToken', accessToken);
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
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'MyPageNavbarScreen' })],
                key: null
              });
              this.setState({ loading: false, loadingComplete: false });
              this.props.navigation.dispatch(resetAction);
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

export default connect(mapStateToProps, { setToken, setEmail })(RegistrationScreen);
