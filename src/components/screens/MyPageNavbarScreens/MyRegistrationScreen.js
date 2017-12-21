import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import axios from 'axios'
import { connect } from 'react-redux';
import Header from '../../common/Header';
import Input from '../../common/Input';
import { MY_REGISTRATION_SCREEN_STRINGS } from '../../../helpers/LanguageStrings'

const HEIGHT = Dimensions.get('window').height;

class MyRegistrationScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    this.getUserInfo()
  }

  getUserInfo() {
    const url = 'https://api.10av10.com/api/user/' + this.props.email
    console.log(this.props.token);
    const headers = {
      Authorization: 'Bearer ' + this.props.token,
      'content-type': 'application/json'
    }
    const instance = axios.create({ baseURL: url, headers, timeout: 1000 });
    instance.get()
    .then((response) => {
      const { user } = response.data
      this.setState({ user })
    })
    .catch((error) => {
      console.log(error);
  });
  }

  getColor() {
    return this.props.theme === 'day' ? '#f4376d' : '#F7A021';
  }

  getStrings() {
    const { language } = this.props
    const { fields } = MY_REGISTRATION_SCREEN_STRINGS
    const strings = {}
    fields.forEach(field => (strings[field] = MY_REGISTRATION_SCREEN_STRINGS[field][language]))
    return strings
  }

  renderFields() {
      const { user } = this.state
      const { fields } = MY_REGISTRATION_SCREEN_STRINGS
      const labels = {}
      fields.forEach((field) => {
        if (Object.prototype.hasOwnProperty.call(user, field))
          labels[field] = MY_REGISTRATION_SCREEN_STRINGS[field][this.props.language]
      })
      const textFields = Object.keys(labels).reduce((all = [], key) => {
        all.push(
          <View key={key}>
            <Text>{labels[key]}</Text>
            <Input value={user[key]} editable={false} />
         </View>
         )
      return all
    }, [])
    return textFields
  }
  getLabel(str) {
    const strings = MY_REGISTRATION_SCREEN_STRINGS
    if (Object.prototype.hasOwnProperty.call(strings, str))
      return MY_REGISTRATION_SCREEN_STRINGS[str][this.props.language]
    return str
  }

  render() {
    const { navigation } = this.props;
    const { user } = this.state
    const strings = this.getStrings()
    return (
      <View>
        <Header title={strings.title} navigation={navigation} />
        <ScrollView style={{ height: HEIGHT - 80 }}>
          {this.renderFields()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold',
    fontSize: 36,
    marginTop: HEIGHT / 3
  }
};
const mapStateToProps = ({ currentTheme, currentLanguage, userInformation }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  const { token, email } = userInformation
  return { theme, language, token, email };
};

export default connect(mapStateToProps, null)(MyRegistrationScreen);
