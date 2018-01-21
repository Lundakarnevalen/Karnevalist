import React, { Component } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { connect } from 'react-redux';
import { Toast, BackgroundImage, SuperAgileAlert, Header, Input } from '../../common';
import { USER_URL, LOGOUT_RESET_ACTION } from '../../../helpers/Constants';
import { MY_PROFILE_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';
import { handleErrorMsg } from '../../../helpers/ApiManager';
import { removeItem } from '../../../helpers/LocalSave';

const HEIGHT = Dimensions.get('window').height;

class MyProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      alertVisible: false,
      user: null,
      changesMade: false,
      showToast: false,
      success: false
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
    this.getUserInfo();
  }

  getUserInfo() {
    const url = USER_URL + this.props.email;
    const headers = {
      Authorization: 'Bearer ' + this.props.token,
      'content-type': 'application/json'
    };
    axios
      .get(url, { headers })
      .then(response => {
        const { user } = response.data;
        this.setState({ oldUser: { ...user }, user });
      })
      .catch(error => {
        if (error.response.status === 401) this.handleLogout();
        const msg = handleErrorMsg(error.message);
        console.log(msg);
      });
  }

  getMsg(success, strings) {
    return success ? strings.updateInfoMessageSuccess : strings.updateInfoMessageFail;
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = MY_PROFILE_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = MY_PROFILE_SCREEN_STRINGS[field][language]));
    return strings;
  }

  getRightIcon() {
    const strings = this.getStrings();
    const { rightIconStyle } = styles;
    return (
      <TouchableOpacity
        style={rightIconStyle}
        onPress={() => {
          if (this.state.editMode && this.state.changesMade)
            this.setState({
              alertVisible: true,
              message: strings.popUpInfo,
              alertHeader: strings.popUpHeader
            });
          this.setState({ editMode: !this.state.editMode });
        }}
      >
        <MaterialIcons
          name={this.state.editMode ? 'done' : 'edit'}
          style={{ color: 'white', right: 0 }}
          size={30}
        />
      </TouchableOpacity>
    );
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

  saveChanges() {
    const { user, oldUser } = this.state;
    const data = {};
    let ctr = 0;
    Object.keys(user).forEach(key => {
      ctr++;
      if (user[key] !== oldUser[key]) data[key] = user[key];
      if (ctr === Object.keys(user).length) this.putData(data);
    });
    this.setState({ oldUser: user, alertVisible: false });
  }

  putData(data) {
    const url = USER_URL + this.props.email;
    const headers = {
      Authorization: 'Bearer ' + this.props.token,
      'content-type': 'application/json'
    };
    axios
      .put(url, data, { headers })
      .then(response => {
        const { success } = response.data;
        this.setState({ success, showToast: true, changesMade: false });
      })
      .catch(error => {
        if (error.response.status === 401) this.handleLogout();
        const msg = handleErrorMsg(error.message);
        console.log(msg);
      });
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
      const color =
        editMode && key !== 'email' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(210, 210, 210, 0.7)';
      return (
        <Input
          extraContainerStyle={{ backgroundColor: color }}
          key={key}
          placeholder={labels[key]}
          value={user[key]}
          editable={editMode && key !== 'email'}
          onChangeText={text => {
            user[key] = text;
            this.setState({ user, changesMade: true });
          }}
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
          { text: strings.ok, onPress: () => this.props.navigation.dispatch(LOGOUT_RESET_ACTION) }
        ];
      case strings.popUpInfo:
        return [
          { text: strings.cancel, onPress: () => this.setState({ alertVisible: false }) },
          { text: strings.save, onPress: () => this.saveChanges() }
        ];
      default:
        return [{ text: strings.ok, onPress: () => this.setState({ alertVisible: false }) }];
    }
  }

  renderMainView() {
    if (this.state.user === null)
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={'white'} />
        </View>
      );
    return <ScrollView style={styles.scrollStyle}>{this.renderFields()}</ScrollView>;
  }

  render() {
    const { navigation } = this.props;
    const { alertVisible, success, showToast, message, alertHeader } = this.state;
    const strings = this.getStrings();
    return (
      <View>
        <BackgroundImage pictureNumber={4} />
        <Header title={strings.title} navigation={navigation} rightIcon={this.getRightIcon()} />
        <Toast
          color={'#f4376d'}
          showToast={showToast}
          onClose={() => this.setState({ showToast: false })}
          message={this.getMsg(success, strings)}
        />
        <SuperAgileAlert
          alertVisible={alertVisible}
          setAlertVisible={visible => this.setAlertVisible(visible, message)}
          buttonsIn={this.renderAlertButtons(message)}
          header={alertHeader}
          info={message}
        />
        {this.renderMainView()}
      </View>
    );
  }
}

const styles = {
  scrollStyle: {
    marginTop: 20,
    height: HEIGHT - 64,
    paddingTop: 4,
    paddingRight: 16,
    paddingBottom: 64,
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
  const { token, email } = userInformation;
  return { language, token, email };
};

export default connect(mapStateToProps, null)(MyProfileScreen);
