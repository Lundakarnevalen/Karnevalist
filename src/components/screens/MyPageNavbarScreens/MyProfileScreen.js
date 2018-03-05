import React, { Component } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Toast,
  BackgroundImage,
  SuperAgileAlert,
  Header,
  Input
} from '../../common';
import {
  USER_URL,
  LOGOUT_RESET_ACTION,
  HEIGHT
} from '../../../helpers/Constants';
import {
  isEmail,
  containsOnlyLetters,
  isValidPhoneNbr,
  containsOnlyDigits
} from '../../../helpers/functions';
import { removeItem } from '../../../helpers/LocalSave';
import {
  MY_PROFILE_SCREEN_STRINGS,
  ERROR_MSG_INPUT_FIELD
} from '../../../helpers/LanguageStrings';
// import { handleErrorMsg } from '../../../helpers/ApiManager';

class MyProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.userinfo,
      oldUser: Object.assign({}, props.userinfo),
      editMode: false,
      alertVisible: false,
      anyError: false,
      validAddress: true,
      showToast: false
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.props.navigation.goBack()
    );
  }

  checkAddressError(text) {
    if (text === '') {
      this.setState({ validAddress: false });
    } else {
      this.setState({ validAddress: true });
    }
  }

  getErrorStrings() {
    const { language } = this.props;
    const { fields } = ERROR_MSG_INPUT_FIELD;
    const strings = {};
    fields.forEach(
      field => (strings[field] = ERROR_MSG_INPUT_FIELD[field][language])
    );
    return strings;
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = MY_PROFILE_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(
      field => (strings[field] = MY_PROFILE_SCREEN_STRINGS[field][language])
    );
    return strings;
  }

  getRightIcon() {
    const strings = this.getStrings();
    const { rightIconStyle } = styles;
    const { anyError, validAddress, changesMade, editMode } = this.state;
    return (
      <TouchableOpacity
        style={rightIconStyle}
        onPress={() => {
          if (editMode && changesMade) {
            if (anyError || !validAddress) {
              this.setState({
                alertVisible: true,
                alertHeader: strings.invalidChangesMadeHeader,
                message: strings.invalidChangesMadeText
              });
            } else if (changesMade) {
              this.setState({
                message: strings.popUpInfo,
                alertHeader: strings.popUpHeader,
                alertVisible: true
              });
            }
          } else {
            this.setState({ editMode: !editMode });
          }
        }}
      >
        <MaterialIcons
          name={this.state.editMode ? 'done' : 'edit'}
          style={{ color: 'pink', right: 0 }}
          size={30}
        />
      </TouchableOpacity>
    );
  }

  getMsg(success, strings) {
    return success
      ? strings.updateInfoMessageSuccess
      : strings.updateInfoMessageFail;
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
        return;
    }
  }

  handleLogout() {
    const strings = this.getStrings();
    removeItem('email');
    removeItem('accessToken');
    this.setState({
      alertVisible: true,
      message: strings.expiredTokenMessage,
      alertHeader: strings.expiredTokenTitle
    });
  }

  fulfilsRequirement(key, toCheck) {
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
      default:
        return true;
    }
  }

  renderFields() {
    const strings = this.getStrings();
    const { user, editMode, oldUser } = this.state;
    const { fields } = MY_PROFILE_SCREEN_STRINGS;
    const labels = {};
    fields.forEach(field => {
      if (Object.prototype.hasOwnProperty.call(user, field))
        labels[field] = MY_PROFILE_SCREEN_STRINGS[field][this.props.language];
    });
    const textFields = Object.keys(labels).map(key => {
      const editable = editMode && key !== 'email';
      const backgroundColor = editable ? 'white' : 'transparent';
      const borderWidth = editable ? 1 : 0;
      const textColor = editable ? 'black' : 'white';
      const placeholderTextColor = editable ? '#F7A021' : 'white';
      if (
        user[key] === '' ||
        user[key] === null ||
        user[key] === undefined ||
        user[key].length === 0
      )
        return null;
      if (user[key] === true) user[key] = strings.yes;
      if (user[key] === false) user[key] = strings.no;
      return (
        <Input
          extraContainerStyle={{ backgroundColor, borderWidth }}
          extraInputStyle={{ color: textColor }}
          extraPlaceHolderStyle={{ color: placeholderTextColor }}
          key={key}
          placeholder={labels[key]}
          onChangeText={text => {
            if (key === 'address') {
              this.checkAddressError(text);
            }
            user[key] = text;
            this.setState({
              anyError: !this.fulfilsRequirement(key, text),
              user,
              changesMade: user[key] !== oldUser[key]
            });
          }}
          value={user[key]}
          editable={editable}
        />
      );
    });
    return textFields;
  }

  setAlertVisible(visible, message) {
    const strings = this.getStrings();
    this.setState({ alertVisible: visible });
    if (message === strings.expiredTokenMessage)
      this.props.navigation.dispatch(LOGOUT_RESET_ACTION);
  }

  renderAlertButtons(message) {
    const strings = this.getStrings();
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

  renderMainView() {
    const { user, showToast, success } = this.state;
    const strings = this.getStrings();
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
          message={this.getMsg(success, strings)}
        />
      </View>
    );
  }

  putData(data) {
    const url = USER_URL + this.props.email;
    const headers = {
      Authorization: `Bearer ${this.props.token}`,
      'content-type': 'application/json'
    };
    axios
      .put(url, data, { headers })
      .then(response => {
        const { success } = response.data;
        this.setState({
          oldUser: Object.assign({}, data),
          success,
          showToast: true,
          changesMade: false
        });
      })
      .catch(error => {
        if (error.response.status === 401) this.handleLogout();
        // const msg = handleErrorMsg(error);
      });
  }

  saveChanges() {
    const { user, oldUser } = this.state;
    const data = {};
    let ctr = 0;
    Object.keys(user).forEach(key => {
      ctr++;
      if (user[key] !== oldUser[key]) data[key] = user[key];
      if (ctr === Object.keys(user).length) this.putData(data);
    });
    this.setState({ oldUser: user, alertVisible: false, editMode: false });
  }

  render() {
    const { navigation } = this.props;
    const strings = this.getStrings();
    const { alertVisible, message, alertHeader } = this.state;
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

const styles = {
  scrollStyle: {
    height: HEIGHT - 64,
    paddingTop: 4,
    paddingRight: 16,
    paddingLeft: 16
  },
  loadingText: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold',
    fontSize: 36
  },
  loading: {
    marginTop: HEIGHT / 3
  },
  rightIconStyle: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: 60
  }
};
const mapStateToProps = ({ currentLanguage, userInformation }) => {
  const { language } = currentLanguage;
  const { token, email, userinfo } = userInformation;
  return { language, token, email, userinfo };
};

export default connect(mapStateToProps, null)(MyProfileScreen);
