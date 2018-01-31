import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  Picker,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Text
} from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setToken, setEmail, setUserinfo } from '../../actions';
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
      inputs: Array(12).fill(''),
      shirtSize: '',
      studentNation: '',
      driversLicense: '',
      previousInvolvement: '',
      foodPreference: '',
      co: '',
      other: '',
      errors: Array(11).fill(false),
      showShirtPicker: false,
      showDriversLicensePicker: false,
      showstudentNationPicker: false,
      foodPreferenceError: false,
      loading: false,
      loadingComplete: false,
      keyboardHeight: 0,
      alertVisible: false,
      alertHeader: '',
      corps: '',
      showCorpPicker: false,
      plenipotentiary: false,
      bff: '',
      bffError: false,
      //CheckBoxes
      groupLeader: false,
      wantToWorkWith: Array(17).fill(false),
      wantToLearn: Array(17).fill(false),
      smallAuditionCheckBoxes: [false, false, false],
      bigAuditionCheckBoxes: [false, false, false],
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
    const { inputs, studentNation, shirtSize, driversLicense, corps } = this.state;
    if (
      inputs.indexOf('') !== -1 ||
      shirtSize === '' ||
      studentNation === '' ||
      corps === '' ||
      driversLicense === ''
    )
      return true;
    return false;
  }

  anyErrors() {
    const {
      errors,
      foodPreferenceError,
      foodPreference,
      bffError,
      bff,
      gdpr1,
      gdpr2,
      gdpr3,
      gdpr4
    } = this.state;
    return (
      errors.indexOf(true) !== -1 ||
      (bffError && bff !== '') ||
      (foodPreferenceError && foodPreference !== '') ||
      gdpr1 === false ||
      gdpr2 === false ||
      gdpr3 === false ||
      gdpr4 === false
    );
  }

  getTrueValuesFromList(list, names) {
    const newList = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i] === true) {
        newList.push(names[i]);
      }
    }
    return newList;
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
    if (Platform.OS === 'ios') {
      return (
        <CustomButton
          text={title === '' ? defaultTitle + '*' : title}
          style="dropDownButton"
          width={WIDTH}
          onPress={() => {
            Keyboard.dismiss();
            switch (tag) {
              case 'shirt':
                this.setState({ showShirtPicker: true });
                if (title === '') this.setState({ shirtSize: tagArray[0] });
                break;
              case 'nation':
                this.setState({ showstudentNationPicker: true });
                if (title === '') this.setState({ studentNation: tagArray[0] });
                break;
              case 'driversLicense':
                this.setState({ showDriversLicensePicker: true });
                if (title === '') this.setState({ driversLicense: tagArray[0] });
                break;
              case 'corps':
                this.setState({ showCorpPicker: true });
                if (title === '') this.setState({ corps: tagArray[0] });
                break;
              default:
                break;
            }
          }}
        />
      );
    }
    return (
      <View>
        <Picker
          onValueChange={item => {
            switch (tag) {
              case 'shirt':
                this.setState({ shirtSize: item });
                break;
              case 'nation':
                this.setState({ studentNation: item });
                break;
              case 'driversLicense':
                this.setState({ driversLicense: item });
                break;
              case 'corps':
                this.setState({ corps: item });
                break;
              default:
                break;
            }
          }}
          selectedValue={title === '' ? defaultTitle : title}
          style={styles.androidPicker}
        >
          <Picker.Item label={defaultTitle} value={''} />
          {this.renderPickerArray(tag, tagArray)}
        </Picker>
      </View>
    );
  }

  renderCheckBoxes(names, listToWorkWith, setState) {
    const myListToWorkWith = listToWorkWith;
    const checkBoxes = [];
    for (let i = 0; i < names.length; i++) {
      checkBoxes.push(
        <CheckBox
          key={i}
          name={names[i]}
          size={30}
          onPress={() => {
            myListToWorkWith[i] = !listToWorkWith[i];
            setState(myListToWorkWith);
          }}
          value={listToWorkWith[i]}
          color={'white'}
        />
      );
    }
    return checkBoxes;
  }

  renderPickerArray(tag, tagArray) {
    return tagArray.map(item => {
      return <Picker.Item key={item} label={item} value={item} />;
    });
  }

  renderDKBackgroundCloser() {
    const {
      showShirtPicker,
      showstudentNationPicker,
      showDriversLicensePicker,
      showCorpPicker
    } = this.state;
    if (showShirtPicker || showstudentNationPicker || showDriversLicensePicker || showCorpPicker) {
      return (
        <TouchableWithoutFeedback
          style={{ position: 'absolute' }}
          onPress={() =>
            this.setState({
              showShirtPicker: false,
              showstudentNationPicker: false,
              showDriversLicensePicker: false,
              showCorpPicker: false
            })
          }
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

  renderAlertButtons(message) {
    const strings = this.getStrings();
    const errorStrings = this.getErrorStrings();
    switch (message) {
      case errorStrings.errorMsgAnyEmpty:
      case errorStrings.errorMsgWrongInput:
        return [{ text: strings.ok, onPress: () => this.setState({ alertVisible: false }) }];
      case strings.confirmRegister:
        return [
          { text: strings.cancel, onPress: () => this.setState({ alertVisible: false }) },
          {
            text: strings.ok,
            onPress: () => {
              this.handleRegister();
              this.setState({ alertVisible: false });
            }
          }
        ];
      default:
        return [{ text: strings.ok, onPress: () => this.setState({ alertVisible: false }) }];
    }
  }

  handleRegister() {
    const strings = this.getStrings();
    const {
      inputs,
      foodPreference,
      co,
      shirtSize,
      studentNation,
      driversLicense,
      other,
      plenipotentiary,
      previousInvolvement,
      corps,
      bff,
      groupLeader,
      wantToWorkWith,
      wantToLearn,
      smallAuditionCheckBoxes,
      bigAuditionCheckBoxes
    } = this.state;
    const smallPleasures = this.getTrueValuesFromList(
      smallAuditionCheckBoxes,
      REGISTRATION_SCREEN_STRINGS.auditionCheckboxes.EN
    );
    const bigPleasures = this.getTrueValuesFromList(
      bigAuditionCheckBoxes,
      REGISTRATION_SCREEN_STRINGS.auditionCheckboxes.EN
    );
    const interest = this.getTrueValuesFromList(
      wantToLearn,
      REGISTRATION_SCREEN_STRINGS.checkBoxNames.EN
    );
    const skills = this.getTrueValuesFromList(
      wantToWorkWith,
      REGISTRATION_SCREEN_STRINGS.checkBoxNames.EN
    );
    const postData = {
      firstName: inputs[0],
      lastName: inputs[1],
      personalNumber: inputs[2],
      email: inputs[3],
      password: inputs[5],
      address: inputs[7],
      co,
      postNumber: inputs[8],
      city: inputs[9],
      phoneNumber: inputs[10],
      foodPreference,
      driversLicense,
      pastInvolvement: previousInvolvement,
      shirtSize,
      corps,
      bff,
      studentNation,
      plenipotentiary,
      startOfStudies: inputs[11],
      misc: other,
      skills,
      interest,
      groupLeader,
      smallPleasures,
      bigPleasures
    };
    this.trimValues();
    this.setState({ loadingComplete: false, loading: true });
    axios
      .post(REGISTER_URL, postData)
      .then(response => {
        const { accessToken } = response.data;
        this.props.setToken(accessToken);
        this.props.setEmail(inputs[3]);
        saveItem('email', inputs[3]);
        saveItem('accessToken', accessToken);
        this.props.setUserinfo(postData);
        this.setState({ loadingComplete: true });
      })
      .catch(error => {
        const msg = handleErrorMsg(error, strings);
        this.setState({
          loadingComplete: false,
          loading: false,
          alertHeader: strings.error,
          alertVisible: true,
          message: msg
        });
      });
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
      co,
      loading,
      loadingComplete,
      showCorpPicker,
      shirtSize,
      showShirtPicker,
      studentNation,
      showstudentNationPicker,
      showDriversLicensePicker,
      alertHeader,
      alertVisible,
      message,
      driversLicense,
      other,
      plenipotentiary,
      previousInvolvement,
      corps,
      bff,
      bffError,
      groupLeader,
      wantToWorkWith,
      wantToLearn,
      gdpr1,
      gdpr2,
      gdpr3,
      gdpr4,
      smallAuditionCheckBoxes,
      bigAuditionCheckBoxes
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
            placeholder={strings.firstName + '*'}
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
            placeholder={strings.lastName + '*'}
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
            placeholder={strings.socialSecurityNumber + '*'}
            onChangeText={text => {
              inputs[2] = text;
              errors[2] = !(text.length === 10 && /^[a-zA-Z0-9_]+$/.test(text));
              this.setState({ inputs, errors });
            }}
            value={inputs[2]}
            keyboardType={'numeric'}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            hasError={errors[2]}
            warningMessage={errorStrings.errorMsgSocialSecurity}
            maxLength={10}
          />
          <Input
            ref={'fourthInput'}
            onSubmitEditing={() => this.refs.fifthInput.focus()}
            placeholder={strings.email + '*'}
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
            placeholder={strings.confirmEmail + '*'}
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
            placeholder={strings.password + '*'}
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
            placeholder={strings.confirmPassword + '*'}
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
            onSubmitEditing={() => this.refs.co.focus()}
            placeholder={strings.address + '*'}
            onChangeText={text => {
              inputs[7] = text;
              this.setState({ inputs });
            }}
            value={inputs[7]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
          />
          <Input
            ref={'co'}
            onSubmitEditing={() => this.refs.ninthInput.focus()}
            placeholder={strings.co}
            onChangeText={text => {
              this.setState({ co: text });
            }}
            value={co}
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
              placeholder={strings.postNumber + '*'}
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
              maxLength={5}
            />
            <Input
              ref={'tenthInput'}
              onSubmitEditing={() => this.refs.eleventhInput.focus()}
              placeholder={strings.city + '*'}
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
            placeholder={strings.phoneNumber + '*'}
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
            maxLength={16}
          />
          <Input
            ref={'twelthInput'}
            placeholder={strings.foodPreference}
            onSubmitEditing={() => this.refs.yearStudyStart.focus()}
            onChangeText={text => {
              this.setState({
                foodPreference: text,
                foodPreferenceError: !(/^[a-zåäöA-ZÅÄÖ., ]+$/.test(text))
               })
            }}
            value={foodPreference}
            returnKeyType={'next'}
            autoCapitalize="sentences"
            scrollToInput={y => this.scrollToInput(y)}
            hasError={foodPreferenceError}
            warningMessage={errorStrings.errorMsgFoodPreference}
            multiline
            numberOfLines={3}
            maxLength={200}
          />
          <Input
            ref={'yearStudyStart'}
            onSubmitEditing={() => this.refs.previousInvolvement.focus()}
            placeholder={strings.yearStudyStart + '*'}
            onChangeText={text => {
              inputs[11] = text;
              errors[11] = !this.containsOnlyDigits(text);
              this.setState({ inputs, errors });
            }}
            hasError={errors[11]}
            value={inputs[11]}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            warningMessage={errorStrings.errorMsgShortOnlyDigits}
          />
          <Input
            ref={'previousInvolvement'}
            onSubmitEditing={() => this.refs.bff.focus()}
            placeholder={strings.previousInvolvement}
            onChangeText={text => {
              this.setState({ previousInvolvement: text });
            }}
            value={previousInvolvement}
            returnKeyType={'next'}
            scrollToInput={y => this.scrollToInput(y)}
            warningMessage={errorStrings.errorMsgPreviousInvolvement}
            multiline
            numberOfLines={3}
            maxLength={200}
          />
          <Input
            ref={'bff'}
            icon={'question-circle-o'}
            placeholder={strings.bff}
            onChangeText={text => {
              this.setState({ bff: text, bffError: !this.isEmail(text) });
            }}
            iconOnPress={() => {
              this.setState({
                alertVisible: true,
                message: strings.bffInfo,
                alertHeader: strings.bff
              });
            }}
            value={bff}
            returnKeyType={'done'}
            hasError={bffError}
            autoCapitalize="none"
            warningMessage={errorStrings.errorMsgInvalidEmail}
            scrollToInput={y => this.scrollToInput(y)}
          />

          {this.renderPickerForPlatform(
            strings.shirtSize,
            strings.shirtSizeArray,
            shirtSize,
            'shirt'
          )}
          {this.renderPickerForPlatform(
            strings.studentNation,
            strings.studentNationArray,
            studentNation,
            'nation'
          )}
          {this.renderPickerForPlatform(strings.corps, strings.corpsList, corps, 'corps')}
          {this.renderPickerForPlatform(
            strings.driversLicense,
            strings.driversLicenseArray,
            driversLicense,
            'driversLicense'
          )}
          <CheckBox
            name={strings.plenipotentiary}
            size={30}
            onPress={() => this.setState({ plenipotentiary: !plenipotentiary })}
            value={plenipotentiary}
            color={'white'}
          />
          <CheckBox
            name={strings.groupLeader}
            size={30}
            onPress={() => this.setState({ groupLeader: !groupLeader })}
            value={groupLeader}
            color={'white'}
          />
          <Text style={styles.checkBoxHeaderStyle}>{strings.auditionSmallSceneHeader}</Text>
          {this.renderCheckBoxes(strings.auditionCheckboxes, smallAuditionCheckBoxes, newState =>
            this.setState({ smallAuditionCheckBoxes: newState })
          )}
          <Text style={styles.checkBoxHeaderStyle}>{strings.auditionBigSceneHeader}</Text>
          {this.renderCheckBoxes(strings.auditionCheckboxes, bigAuditionCheckBoxes, newState =>
            this.setState({ bigAuditionCheckBoxes: newState })
          )}
          <Text style={styles.checkBoxHeaderStyle}>{strings.checkBoxesHeader}</Text>
          {this.renderCheckBoxes(strings.checkBoxNames, wantToWorkWith, newState =>
            this.setState({ wantToWorkWith: newState })
          )}
          <Text style={styles.checkBoxHeaderStyle}>{strings.checkBoxesHeaderToLearn}</Text>
          {this.renderCheckBoxes(strings.checkBoxNames, wantToLearn, newState =>
            this.setState({ wantToLearn: newState })
          )}
          <Input
            ref={'other'}
            placeholder={strings.other}
            onChangeText={text => {
              this.setState({ other: text });
            }}
            value={other}
            returnKeyType={'done'}
            scrollToInput={y => this.scrollToInput(y)}
            multiline
            maxLength={200}
            numberOfLines={3}
          />

          <View style={{ right: 3 }}>
            <CheckBox
              name={strings.gdpr1 + '*'}
              size={30}
              onPress={() => this.setState({ gdpr1: !gdpr1 })}
              value={gdpr1}
              color={'white'}
            />
            <CheckBox
              name={strings.gdpr2 + '*'}
              size={30}
              onPress={() => this.setState({ gdpr2: !gdpr2 })}
              value={gdpr2}
              color={'white'}
            />
            <CheckBox
              name={strings.gdpr3 + '*'}
              size={30}
              onPress={() => this.setState({ gdpr3: !gdpr3 })}
              value={gdpr3}
              color={'white'}
            />
            <CheckBox
              name={strings.gdpr4 + '*'}
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
                  alertHeader: strings.error,
                  message: errorStrings.errorMsgAnyEmpty
                });
              } else if (this.anyErrors()) {
                this.setState({
                  alertVisible: true,
                  alertHeader: strings.error,
                  message: errorStrings.errorMsgWrongInput
                });
              } else {
                this.setState({
                  alertVisible: true,
                  alertHeader: strings.alertHeader,
                  message: strings.confirmRegister
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
          onValueChange={newValue => this.setState({ studentNation: newValue })}
          items={strings.studentNationArray}
          value={studentNation}
          isShowing={showstudentNationPicker}
          close={() => this.setState({ showstudentNationPicker: false })}
        />
        <DKPicker
          onValueChange={newValue => this.setState({ driversLicense: newValue })}
          items={strings.driversLicenseArray}
          value={driversLicense}
          isShowing={showDriversLicensePicker}
          close={() => this.setState({ showDriversLicensePicker: false })}
        />
        <DKPicker
          onValueChange={newValue => this.setState({ corps: newValue })}
          items={strings.corpsList}
          value={corps}
          isShowing={showCorpPicker}
          close={() => this.setState({ showCorpPicker: false })}
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
          buttonsIn={this.renderAlertButtons(message)}
          header={alertHeader || strings.error}
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
  },
  checkBoxHeaderStyle: {
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width,
    fontSize: 30,
    paddingBottom: 10,
    color: 'white'
  }
};

const mapStateToProps = ({ userInformation, currentLanguage }) => {
  const { picture } = userInformation;
  const { language } = currentLanguage;
  return { picture, language };
};

export default connect(mapStateToProps, { setToken, setEmail, setUserinfo })(RegistrationScreen);
