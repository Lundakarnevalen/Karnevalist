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
import { Toast, BackgroundImage, SuperAgileAlert, Header, Input } from '../../common';
import { USER_URL, LOGOUT_RESET_ACTION } from '../../../helpers/Constants';
import { MY_PROFILE_SCREEN_STRINGS, ERROR_MSG_INPUT_FIELD } from '../../../helpers/LanguageStrings';
// import { handleErrorMsg } from '../../../helpers/ApiManager';
// import { removeItem } from '../../../helpers/LocalSave';

const HEIGHT = Dimensions.get('window').height;

class MyProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
    this.setState({ user: this.props.userinfo });
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = MY_PROFILE_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = MY_PROFILE_SCREEN_STRINGS[field][language]));
    return strings;
  }

  renderFields() {
    const { user, editMode } = this.state;
    const { fields } = MY_PROFILE_SCREEN_STRINGS;
    const labels = {};
    fields.forEach(field => {
      if (Object.prototype.hasOwnProperty.call(user, field))
        labels[field] = MY_PROFILE_SCREEN_STRINGS[field][this.props.language];
    });
    const textFields = Object.keys(labels).map(key => {
      const backgroundColor = editMode && key !== 'email' ? 'white' : 'transparent';
      const borderWidth = editMode && key !== 'email' ? 1 : 0;
      const textColor = editMode && key !== 'email' ? 'black' : 'white';
      const placeholderTextColor = editMode && key !== 'email' ? '#F7A021' : 'white';
      return (
        <Input
          extraContainerStyle={{ backgroundColor, borderWidth }}
          extraInputStyle={{ color: textColor }}
          extraPlaceHolderStyle={{ color: placeholderTextColor }}
          key={key}
          placeholder={labels[key]}
          value={user[key]}
          editable={false}
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

  renderMainView() {
    const { user } = this.state;
    if (user === null)
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={'white'} />
        </View>
      );
    return <ScrollView style={styles.scrollStyle}>{this.renderFields()}</ScrollView>;
  }

  render() {
    const { navigation } = this.props;
    const strings = this.getStrings();
    return (
      <View>
        <BackgroundImage pictureNumber={4} />
        <Header title={strings.title} navigation={navigation} />
        {this.renderMainView()}
      </View>
    );
  }
}

const styles = {
  scrollStyle: {
    marginTop: 20,
    height: HEIGHT - 120,
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

// getWarningMessage(key) {
//   const errorStrings = this.getErrorStrings();
//   switch (key) {
//     case 'firstName':
//       return errorStrings.errorMsgOnlyLetters;
//     case 'lastName':
//       return errorStrings.errorMsgOnlyLetters;
//     case 'city':
//       return errorStrings.errorMsgOnlyLetters;
//     case 'postNumber':
//       return errorStrings.errorMsgZipCode;
//     case 'phoneNumber':
//       return errorStrings.errorMsgPhoneNbr;
//     default:
//       return;
//   }
// }

// checkAddressError(text) {
//   if (text === '') {
//     this.setState({ validAddress: false });
//   } else {
//     this.setState({ validAddress: true });
//   }
// }

// handleLogout() {
//   const strings = this.getStrings();
//   removeItem('email');
//   removeItem('accessToken');
//   this.setState({
//     alertVisible: true,
//     message: strings.expiredTokenMessage,
//     alertHeader: strings.expiredTokenTitle
//   });
// }

// saveChanges() {
//   const { user, oldUser } = this.state;
//   const data = {};
//   let ctr = 0;
//   Object.keys(user).forEach(key => {
//     ctr++;
//     if (user[key] !== oldUser[key]) data[key] = user[key];
//     if (ctr === Object.keys(user).length) this.putData(data);
//   });
//   this.setState({ oldUser: user, alertVisible: false });
// }

// putData(data) {
//   const url = USER_URL + this.props.email;
//   const headers = {
//     Authorization: 'Bearer ' + this.props.token,
//     'content-type': 'application/json'
//   };
//   axios
//     .put(url, data, { headers })
//     .then(response => {
//       const { success } = response.data;
//       this.setState({ success, showToast: true, changesMade: false });
//     })
//     .catch(error => {
//       if (error.response.status === 401) this.handleLogout();
//       const msg = handleErrorMsg(error.message);
//     });
// }

// isEmail(toTest) {
//   return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//     toTest
//   );
// }
//
// containsOnlyLetters(toTest) {
//   return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
//     toTest
//   );
// }
//
// isValidPhoneNbr(toTest) {
//   return /^\+?\d+$/.test(toTest) && toTest.length >= 7 && toTest.length <= 20;
// }
//
// containsOnlyDigits(text) {
//   return /^\d+$/.test(text);
// }
//
// fulfilsRequirement(key, toCheck) {
//   switch (key) {
//     case 'firstName':
//       return this.containsOnlyLetters(toCheck);
//     case 'lastName':
//       return this.containsOnlyLetters(toCheck);
//     case 'email':
//       return this.isEmail(toCheck);
//     case 'city':
//       return this.containsOnlyLetters(toCheck);
//     case 'postNumber':
//       return this.containsOnlyDigits(toCheck) && toCheck.length === 5;
//     case 'phoneNumber':
//       return this.isValidPhoneNbr(toCheck);
//     default:
//       return true;
//   }
// }
//

// getErrorStrings() {
//   const { language } = this.props;
//   const { fields } = ERROR_MSG_INPUT_FIELD;
//   const strings = {};
//   fields.forEach(field => (strings[field] = ERROR_MSG_INPUT_FIELD[field][language]));
//   return strings;
// }

// getRightIcon() {
//   const strings = this.getStrings();
//   const { rightIconStyle } = styles;
//   const { anyError, validAddress } = this.state;
//   return (
//     <TouchableOpacity
//       style={rightIconStyle}
//       onPress={() => {
//         if (this.state.editMode && this.state.changesMade) {
//           if (anyError || !validAddress) {
//             this.setState({ errorAlertVisible: true });
//           } else if (this.state.changesMade) {
//             this.setState({
//               message: strings.popUpInfo,
//               alertHeader: strings.popUpHeader,
//               alertVisible: true
//             });
//           }
//         } else {
//           this.setState({ editMode: !this.state.editMode });
//         }
//       }}
//     >
//       <MaterialIcons
//         name={this.state.editMode ? 'done' : 'edit'}
//         style={{ color: 'white', right: 0 }}
//         size={30}
//       />
//     </TouchableOpacity>
//   );
// }
// getUserInfo() {
//   const url = USER_URL + this.props.email;
//   const headers = {
//     Authorization: 'Bearer ' + this.props.token,
//     'content-type': 'application/json'
//   };
//   axios
//     .get(url, { headers })
//     .then(response => {
//       const { user } = response.data;
//       this.setState({ oldUser: { ...user }, user });
//     })
//     .catch(error => {
//       if (error.response.status === 401) this.handleLogout();
//       const msg = handleErrorMsg(error.message);
//     });
// }
//
// getMsg(success, strings) {
//   return success ? strings.updateInfoMessageSuccess : strings.updateInfoMessageFail;
// }

// renderAlertButtons(message) {
//   const strings = this.getStrings();
//   switch (message) {
//     case strings.expiredTokenMessage:
//       return [
//         { text: strings.ok, onPress: () => this.props.navigation.dispatch(LOGOUT_RESET_ACTION) }
//       ];
//     case strings.popUpInfo:
//       return [
//         { text: strings.cancel, onPress: () => this.setState({ alertVisible: false }) },
//         {
//           text: strings.save,
//           onPress: () => {
//             this.saveChanges();
//             this.setState({ editMode: false });
//           }
//         }
//       ];
//     case strings.ok:
//       return [{ text: strings.ok, onPress: () => this.setState({ errorAlertVisible: false }) }];
//     default:
//       return [{ text: strings.ok, onPress: () => this.setState({ alertVisible: false }) }];
//   }
// }
// <SuperAgileAlert
//   alertVisible={alertVisible}
//   setAlertVisible={visible => this.setAlertVisible(visible, message)}
//   buttonsIn={this.renderAlertButtons(message)}
//   header={alertHeader}
//   info={message}
// />
// <SuperAgileAlert
//   alertVisible={errorAlertVisible}
//   setAlertVisible={visible => this.setState({ errorAlertVisible: visible })}
//   buttonsIn={this.renderAlertButtons('OK')}
//   header={strings.invalidChangesMadeHeader}
//   info={strings.invalidChangesMadeText}
// />

//<View>
//   {this.renderMainView()}
//   <Toast
//     color={'#f4376d'}
//     showToast={showToast}
//     onClose={() => this.setState({ showToast: false })}
//     message={this.getMsg(success, strings)}
//   />
// </View>
