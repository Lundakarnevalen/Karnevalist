import React, { Component } from 'react';
import {
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
import {
  Header,
  Input,
  DKPicker,
  CustomButton,
  CheckBox,
  BackgroundImage,
  SuperAgileAlert
} from '../common';
import Loading from '../common/Loading';
import { REGISTER_URL } from '../../helpers/Constants';
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
      inputs: ['', '', '', '', '', '', '', '', '', '', ''],
      shirtSize: '',
      studentUnion: '',
      activeCarneval2014: false,
      driversLicense: false,
      foodPreference: '',
      errors: [false, false, false, false, false, false, false, false, false, false],
      showShirtPicker: false,
      showStudentUnionPicker: false,
      foodPreferenceError: false,
      loading: false,
      loadingComplete: false,
      keyboardHeight: 0,
      listToTrim: [],
      alertVisible: false,
      message: '',
      gdpr1: false,
      gdpr2: false,
      gdpr3: false,
      gdpr4: false
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
    const { inputs, studentUnion, shirtSize } = this.state;
    if (
      inputs.indexOf('') !== -1 ||
      shirtSize === 'Välj tröjstorlek' ||
      shirtSize === 'Choose shirt size' ||
      shirtSize === '' ||
      studentUnion === 'Välj nation' ||
      studentUnion === 'Choose student union' ||
      studentUnion === ''
    )
      return true;
    return false;
  }

  anyErrors() {
    const { errors, foodPreferenceError, foodPreference } = this.state;
    return errors.indexOf(true) !== -1 || (foodPreferenceError && foodPreference !== '');
  }

  trimValues() {
    const { inputs } = this.state;
    const trimmedList = inputs;
    for (let i = 0; i < trimmedList.length; i++) {
      if (!(i === 5 || i === 6)) {
        trimmedList[i] = inputs[i].trim();
      }
    }
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
            Keyboard.dismiss();
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
    const { flexHorizontal, rightIconStyle } = styles;
    const {
      inputs,
      errors,
      foodPreference,
      foodPreferenceError,
      loading,
      loadingComplete,
      shirtSize,
      showShirtPicker,
      studentUnion,
      showStudentUnionPicker,
      alertVisible,
      message,
      activeCarneval2014,
      driversLicense,
      gdpr1,
      gdpr2,
      gdpr3,
      gdpr4
    } = this.state;

    const closeButton = (
      <TouchableOpacity style={rightIconStyle} onPress={() => this.props.navigation.goBack(null)}>
        <MaterialCommunityIcons size={30} name="close" color={'white'} />
      </TouchableOpacity>
    );

    return (
      <View>
        <BackgroundImage pictureNumber={5} />
        <Header title={strings.header} rightIcon={closeButton} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.contentContainer}
          style={{ height: HEIGHT - 64 }}
          ref={'scrollView'}
        >
          <Input
            placeholder={strings.firstName}
            onChangeText={text => {
              inputs[0] = text;
              errors[0] = !this.containsOnlyLetters(text);
              this.setState({ inputs, errors });
            }}
            value={inputs[0]}
            onSubmitEditing={() => this.refs.secondInput.focus()}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            autoFocus
            hasError={errors[0]}
            warningMessage={errorStrings.errorMsgOnlyLetters}
          />
          <Input
            ref={'secondInput'}
            onSubmitEditing={() => this.refs.thirdInput.focus()}
            placeholder={strings.lastName}
            onChangeText={text => {
              inputs[1] = text;
              errors[1] = !this.containsOnlyLetters(text);
              this.setState({ inputs, errors });
            }}
            value={inputs[1]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            hasError={errors[1]}
            warningMessage={errorStrings.errorMsgOnlyLetters}
          />
          <Input
            ref={'thirdInput'}
            onSubmitEditing={() => this.refs.fourthInput.focus()}
            placeholder={strings.socialSecurityNumber}
            onChangeText={text => {
              inputs[2] = text;
              errors[2] = !(text.length === 10 && /^[a-zA-Z0-9_]+$/.test(text));
              this.setState({ inputs, errors });
            }}
            value={inputs[2]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            hasError={errors[2]}
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
              errors[3] = !this.isEmail(text);
              errors[4] = text !== inputs[4];
              this.setState({
                inputs,
                errors
              });
            }}
            value={inputs[3]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            hasError={errors[3]}
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
              errors[4] = text !== inputs[3];
              this.setState({ inputs, errors });
            }}
            value={inputs[4]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            hasError={errors[4]}
            warningMessage={errorStrings.errorMsgNoMatchEmail}
          />
          <Input
            ref={'sixthInput'}
            onSubmitEditing={() => this.refs.seventhInput.focus()}
            placeholder={strings.password}
            onChangeText={text => {
              inputs[5] = text;
              errors[5] = text.length < 5;
              errors[6] = text !== inputs[6];
              this.setState({ inputs, errors });
            }}
            value={inputs[5]}
            hasError={errors[5]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            secureText
            warningMessage={errorStrings.errorMsgPwd}
          />
          <Input
            ref={'seventhInput'}
            onSubmitEditing={() => this.refs.eigthInput.focus()}
            placeholder={strings.confirmPassword}
            onChangeText={text => {
              inputs[6] = text;
              errors[6] = text !== inputs[5];
              this.setState({ inputs, errors });
            }}
            value={inputs[6]}
            hasError={errors[6]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            secureText
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
                errors[8] = text.length !== 5 || !this.containsOnlyDigits(text);
                this.setState({
                  inputs,
                  errors
                });
              }}
              width={WIDTH / 2 - 4}
              extraContainerStyle={{ marginRight: 8 }}
              value={inputs[8]}
              returnKeyType={'next'}
              scrollToInput={() => this.scrollToInput(100 + zipCodePosition)}
              hasError={errors[8]}
              warningMessage={errorStrings.errorMsgZipCode}
            />
            <Input
              ref={'tenthInput'}
              onSubmitEditing={() => this.refs.eleventhInput.focus()}
              placeholder={strings.city}
              onChangeText={text => {
                inputs[9] = text;
                errors[9] = !this.containsOnlyLetters(text);
                this.setState({ inputs, errors });
              }}
              width={WIDTH / 2 - 4}
              value={inputs[9]}
              returnKeyType={'next'}
              scrollToInput={() => this.scrollToInput(100 + zipCodePosition)}
              hasError={errors[9]}
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
              errors[10] = !this.isValidPhoneNbr(text);
              this.setState({
                inputs,
                errors
              });
            }}
            value={inputs[10]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            hasError={errors[10]}
            warningMessage={errorStrings.errorMsgPhoneNbr}
          />
          <Input
            ref={'twelthInput'}
            placeholder={strings.foodPreference}
            onChangeText={text => {
              this.setState({
                foodPreference: text,
                foodPreferenceError: !/^[a-zåäöA-ZÅÄÖ., ]+$/.test(text)
              });
            }}
            value={foodPreference}
            returnKeyType={'done'}
            autoCapitalize="sentences"
            scrollToInput={y => this.scrollToInput(y)}
            hasError={foodPreferenceError}
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
            <CheckBox
              name={strings.activeKarneval}
              size={30}
              onPress={() => this.setState({ activeCarneval2014: !activeCarneval2014 })}
              value={activeCarneval2014}
              color={'white'}
            />
            <CheckBox
              name={strings.driversLicense}
              size={30}
              onPress={() => this.setState({ driversLicense: !driversLicense })}
              value={driversLicense}
              color={'white'}
            />
          </View>
          <View style={{ right: 3 }}>
            <CheckBox
              name={strings.gdpr1}
              size={30}
              onPress={() => this.setState({ gdpr1: !gdpr1 })}
              value={gdpr1}
              color={'white'}
            />
            <CheckBox
              name={strings.gdpr2}
              size={30}
              onPress={() => this.setState({ gdpr2: !gdpr2 })}
              value={gdpr2}
              color={'white'}
            />
            <CheckBox
              name={strings.gdpr3}
              size={30}
              onPress={() => this.setState({ gdpr3: !gdpr3 })}
              value={gdpr3}
              color={'white'}
            />
            <CheckBox
              name={strings.gdpr4}
              size={30}
              onPress={() => this.setState({ gdpr4: !gdpr4 })}
              value={gdpr4}
              color={'white'}
            />
          </View>
          <CustomButton
            text={strings.register}
            style={'standardButton'}
            width={WIDTH}
            onPress={() => {
              this.trimValues();
              if (this.anyEmpty()) {
                this.setState({
                  alertVisible: true,
                  message: errorStrings.errorMsgAnyEmpty
                });
              } else if (this.anyErrors()) {
                this.setState({
                  alertVisible: true,
                  message: errorStrings.errorMsgWrongInput
                });
              } else {
                this.setState({ loadingComplete: false, loading: true });
                axios
                  .post(REGISTER_URL, {
                    firstName: inputs[0],
                    lastName: inputs[1],
                    personalNumber: inputs[2],
                    email: inputs[3],
                    password: inputs[5],
                    address: inputs[7],
                    postNumber: inputs[8],
                    city: inputs[9],
                    phoneNumber: inputs[10],
                    foodPreference,
                    driversLicense,
                    pastInvolvement: activeCarneval2014,
                    shirtSize,
                    studentUnion
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
                    const msg = handleErrorMsg(error, strings);
                    this.setState({
                      loadingComplete: false,
                      loading: false,
                      alertVisible: true,
                      message: msg
                    });
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
        <SuperAgileAlert
          alertVisible={alertVisible}
          setAlertVisible={visible => this.setState({ alertVisible: visible })}
          buttonsIn={[{ text: strings.ok, onPress: () => this.setState({ alertVisible: false }) }]}
          header={strings.error}
          info={message || ''}
        />
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
  },
  rightIconStyle: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: 60,
    paddingRight: 0
  }
};

const mapStateToProps = ({ userInformation, currentLanguage }) => {
  const { picture } = userInformation;
  const { language } = currentLanguage;
  return { picture, language };
};

export default connect(mapStateToProps, { setToken, setEmail })(RegistrationScreen);
