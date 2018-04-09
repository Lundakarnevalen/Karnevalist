import React, { Component } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {
  Toast,
  BackgroundImage,
  SuperAgileAlert,
  Header,
  Input,
  CustomPicker
} from '~/src/components/common';
import { LOGOUT_RESET_ACTION } from '~/src/helpers/Constants';
import { setUserinfo } from '~/src/actions';
import {
  isEmail,
  containsOnlyLetters,
  isValidPhoneNbr,
  containsOnlyDigits,
  getStrings
} from '~/src/helpers/functions';
import {
  MY_PROFILE_SCREEN_STRINGS,
  ERROR_MSG_INPUT_FIELD,
  REGISTRATION_SCREEN_STRINGS
} from '~/src/helpers/LanguageStrings';
import { removeItem } from '~/src/helpers/LocalSave';
import { updateUser } from '~/src/helpers/ApiManager';
import { styles } from './styles';

const fulfilsRequirement = (key, toCheck) => {
  switch (key) {
    case 'firstName':
      return containsOnlyLetters(toCheck);
    case 'lastName':
      return containsOnlyLetters(toCheck);
    case 'email':
      return isEmail(toCheck);
    case 'city':
      return containsOnlyLetters(toCheck);
    case 'postNumber':
      return containsOnlyDigits(toCheck) && toCheck.length === 5;
    case 'phoneNumber':
      return isValidPhoneNbr(toCheck);
    case 'address':
      return toCheck !== '';
    default:
      return true;
  }
};

const getInputStyle = editable => ({
  backgroundColor: editable ? 'white' : 'transparent',
  borderWidth: editable ? 1 : 0,
  textColor: editable ? 'black' : 'white',
  placeholderTextColor: editable ? '#F7A021' : 'white'
});

class MyProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...props.userinfo },
      oldUser: { ...props.userinfo },
      editMode: false,
      alertVisible: false,
      showToast: false,
      strings: this.getLanguageStrings()
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.props.navigation.goBack()
    );
  }

  getErrorStrings() {
    return getStrings(this.props.language, ERROR_MSG_INPUT_FIELD);
  }

  getLanguageStrings() {
    return getStrings(this.props.language, MY_PROFILE_SCREEN_STRINGS);
  }

  getRightIcon() {
    const { rightIconStyle } = styles;
    const { editMode } = this.state;
    return (
      <TouchableOpacity
        style={rightIconStyle}
        onPress={() => {
          if (editMode) this.handleDoneEditing();
          else this.setState({ editMode: true });
        }}
      >
        <MaterialIcons
          name={editMode ? 'done' : 'edit'}
          style={{ color: 'white', right: 0 }}
          size={30}
        />
      </TouchableOpacity>
    );
  }

  getWarningMessage(key) {
    const errorStrings = this.getErrorStrings();
    switch (key) {
      case 'firstName':
        return errorStrings.errorMsgOnlyLetters;
      case 'lastName':
        return errorStrings.errorMsgOnlyLetters;
      case 'city':
        return errorStrings.errorMsgOnlyLetters;
      case 'postNumber':
        return errorStrings.errorMsgZipCode;
      case 'phoneNumber':
        return errorStrings.errorMsgPhoneNbr;
      default:
        return '';
    }
  }

  getComponent(key, labels, editable) {
    const { user } = this.state;
    const strings = getStrings(
      this.props.language,
      REGISTRATION_SCREEN_STRINGS
    );
    const {
      backgroundColor,
      borderWidth,
      textColor,
      placeholderTextColor
    } = getInputStyle(editable);
    if (
      (key === 'driversLicense' ||
        key === 'corps' ||
        key === 'studentNation') &&
      editable
    ) {
      return (
        <CustomPicker
          key={key}
          defaultValue=""
          items={strings[`${key}Array`]}
          selectedValue={user[key]}
          onValueChange={value => {
            user[key] = value;
            this.setState({ user });
          }}
        />
      );
    }
    return (
      <Input
        extraContainerStyle={{ backgroundColor, borderWidth }}
        extraInputStyle={{ color: textColor }}
        extraPlaceHolderStyle={{ color: placeholderTextColor }}
        key={key}
        keyboardType={
          key === 'phoneNumber' ||
          key === 'postNumber' ||
          key === 'startOfStudies'
            ? 'numeric'
            : 'default'
        }
        placeholder={labels[key]}
        onChangeText={text => {
          user[key] = text;
          this.setState({ user });
        }}
        value={user[key]}
        editable={editable}
      />
    );
  }

  setAlertVisible(visible, message) {
    const { strings } = this.state;
    this.setState({ alertVisible: visible });
    if (message === strings.expiredTokenMessage)
      this.props.navigation.dispatch(LOGOUT_RESET_ACTION);
  }

  handleDoneEditing() {
    const { user, oldUser, strings } = this.state;
    const changesMade =
      Object.keys(user).filter(key => user[key] !== oldUser[key]).length > 0;
    const anyError = Object.keys(user)
      .map(key => fulfilsRequirement(key, user[key]))
      .some(v => v === false);
    if (changesMade && anyError) {
      this.handleAlert(
        true,
        strings.invalidChangesMadeHeader,
        strings.invalidChangesMadeText
      );
    } else if (changesMade) {
      this.handleAlert(true, strings.popUpHeader, strings.popUpInfo);
    } else {
      this.setState({ editMode: false });
    }
  }

  handleLogout() {
    const { strings } = this.state;
    removeItem('email');
    removeItem('accessToken');
    this.handleAlert(
      true,
      strings.expiredTokenTitle,
      strings.expiredTokenMessage
    );
  }

  handleAlert(alertVisible, alertHeader, message) {
    this.setState({
      alertVisible,
      message,
      alertHeader
    });
  }

  // Checks which changes has been made and sends the to the API
  saveChanges() {
    const { user, oldUser } = this.state;
    const { email, token } = this.props;
    const data = {};
    let ctr = 0;
    Object.keys(user).forEach(key => {
      ctr++;
      if (user[key] !== oldUser[key]) data[key] = user[key];
      if (ctr === Object.keys(user).length) {
        updateUser(
          email,
          token,
          data,
          success => {
            if (success) {
              this.props.setUserinfo(user);
              this.setState({ oldUser: { ...user } });
            }
            this.setState({
              success,
              showToast: true
            });
          },
          () => this.handleLogout()
        );
      }
    });
    this.setState({
      alertVisible: false,
      editMode: false
    });
  }

  renderAlertButtons(message) {
    const strings = this.getLanguageStrings();
    switch (message) {
      case strings.expiredTokenMessage:
        return [
          {
            text: strings.ok,
            onPress: () => this.props.navigation.dispatch(LOGOUT_RESET_ACTION)
          }
        ];
      case strings.popUpInfo:
        return [
          {
            text: strings.cancel,
            onPress: () => this.setState({ alertVisible: false })
          },
          {
            text: strings.save,
            onPress: () => this.saveChanges()
          }
        ];
      case strings.ok:
      default:
        return [
          {
            text: strings.ok,
            onPress: () => this.setState({ alertVisible: false })
          }
        ];
    }
  }

  renderFields() {
    const { user, editMode, strings, oldUser } = this.state;
    const { fields } = MY_PROFILE_SCREEN_STRINGS;
    const labels = {};
    fields.forEach(field => {
      if (Object.prototype.hasOwnProperty.call(user, field))
        labels[field] = MY_PROFILE_SCREEN_STRINGS[field][this.props.language];
    });
    const textFields = Object.keys(labels).map(key => {
      const editable = editMode && key !== 'email';
      if (
        oldUser[key] === '' ||
        oldUser[key] === null ||
        oldUser[key] === undefined ||
        !oldUser[key].length
      )
        return null;
      if (user[key] === true) user[key] = strings.yes;
      if (user[key] === false) user[key] = strings.no;

      return this.getComponent(key, labels, editable, user);
    });
    return textFields;
  }

  renderMainView() {
    const { user, showToast, success, strings } = this.state;
    if (user === null || user === undefined)
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    return (
      <View>
        <ScrollView style={styles.scrollStyle}>
          {this.renderFields()}
        </ScrollView>
        <Toast
          showToast={showToast}
          onClose={() => this.setState({ showToast: false })}
          message={
            success
              ? strings.updateInfoMessageSuccess
              : strings.updateInfoMessageFail
          }
        />
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const { alertVisible, message, alertHeader, strings } = this.state;
    return (
      <View>
        <BackgroundImage pictureNumber={4} />
        <Header
          title={strings.title}
          navigation={navigation}
          rightIcon={this.getRightIcon()}
        />
        {this.renderMainView()}
        <SuperAgileAlert
          alertVisible={alertVisible}
          setAlertVisible={visible => this.setAlertVisible(visible, message)}
          buttonsIn={this.renderAlertButtons(message)}
          header={alertHeader}
          info={message}
        />
      </View>
    );
  }
}

MyProfileScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  language: PropTypes.string.isRequired,
  userinfo: PropTypes.shape().isRequired,
  token: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  setUserinfo: PropTypes.func.isRequired
};

const mapStateToProps = ({ currentLanguage, userInformation }) => {
  const { language } = currentLanguage;
  const { token, email, userinfo } = userInformation;
  return { language, token, email, userinfo };
};

export default connect(mapStateToProps, { setUserinfo })(MyProfileScreen);
