import React, { Component } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  View,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Toast,
  BackgroundImage,
  SuperAgileAlert,
  Header,
  Input,
  CustomPicker
} from '~/src/components/common';
import { LANGUAGES } from '~/src/helpers/Constants';

class ChangeLanguageScreen extends Component {
  renderRadioButton(props) {
    return (
      <View
        style={[
          {
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center'
          },
          props.style
        ]}
      >
        {props.selected ? (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#000'
            }}
          />
        ) : null}
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <BackgroundImage pictureNumber={4} />
        <Header title="SPRÅK" navigation={navigation} />
        <Text>SPRÅK </Text>
      </View>
    );
  }
}

ChangeLanguageScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  screenProps: PropTypes.shape().isRequired,
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

export default connect(mapStateToProps, null)(ChangeLanguageScreen);
