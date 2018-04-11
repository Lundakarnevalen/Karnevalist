import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Header,
  ListItem,
  BackgroundImage,
  SuperAgileAlert,
  CustomButton
} from '~/src/components/common';
import { removeItem } from '~/src/helpers/LocalSave';
import { setProgress, resetData } from '~/src/actions';
import {
  LOGOUT_RESET_ACTION,
  PROGRESS,
  HEIGHT,
  IS_IOS
} from '~/src/helpers/Constants';
import { SETTINGS_SCREEN_STRINGS } from '~/src/helpers/LanguageStrings';
import { getStrings } from '~/src/helpers/functions';

const WITH_MY_REG = [
  { key: 'profile' },
  { key: 'registration' },
  { key: 'sections' }
];
const WO_MY_REG = [{ key: 'profile' }, { key: 'sections' }];

class KarneskojScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false
    };
  }

  getItems() {
    const strings = this.getLanguageStrings();
    const { progress } = this.props;
    const settingsTitles =
      progress === PROGRESS.SENT_SECTIONS ? WITH_MY_REG : WO_MY_REG;
    const items = settingsTitles.map(item => ({
      key: item.key,
      title: strings[item.key]
    }));
    return items;
  }

  getLanguageStrings() {
    return getStrings(this.props.language, SETTINGS_SCREEN_STRINGS);
  }

  handleLogout() {
    removeItem('email');
    removeItem('accessToken');
    this.props.resetData();
    this.props.screenProps.navigation.dispatch(LOGOUT_RESET_ACTION);
  }

  renderAlertButtons() {
    const strings = this.getLanguageStrings();
    return [
      {
        text: strings.cancel,
        onPress: () => this.setState({ alertVisible: false })
      },
      { text: strings.ok, onPress: () => this.handleLogout() }
    ];
  }

  render() {
    const { navigation } = this.props;
    const strings = this.getLanguageStrings();
    return (
      <View style={{ alignItems: 'center' }}>
        <BackgroundImage pictureNumber={5} />
        <Header title={strings.title} leftIcon={null} navigation={navigation} />
      </View>
    );
  }
}
KarneskojScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  language: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  resetData: PropTypes.func.isRequired,
  screenProps: PropTypes.shape().isRequired
};

const mapStateToProps = ({ currentLanguage, userInformation }) => {
  const { progress } = userInformation;
  const { language } = currentLanguage;
  return { language, progress };
};

export default connect(mapStateToProps, { setProgress, resetData })(
  KarneskojScreen
);
