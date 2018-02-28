import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Header, SectionListItem, BackgroundImage, SuperAgileAlert } from '../../common';
import { removeItem } from '../../../helpers/LocalSave';
import { setProgress, resetData } from '../../../actions';
import { LOGOUT_RESET_ACTION, PROGRESS, HEIGHT, IS_IOS } from '../../../helpers/Constants';
import { SETTINGS_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';

const WITH_MY_REG = [{ key: 'profile' }, { key: 'registration' }, { key: 'logout' }];
const WO_MY_REG = [{ key: 'profile' }, { key: 'logout' }];

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false
    };
  }

  getItems() {
    const strings = this.getStrings();
    const { progress } = this.props;
    const settingsTitles = progress === PROGRESS.SENT_SECTIONS ? WITH_MY_REG : WO_MY_REG;
    const items = settingsTitles.map(item => ({ key: item.key, title: strings[item.key] }));
    return items;
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = SETTINGS_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = SETTINGS_SCREEN_STRINGS[field][language]));
    return strings;
  }

  handleLogout() {
    removeItem('email');
    removeItem('accessToken');
    this.props.resetData();
    this.props.screenProps.navigation.dispatch(LOGOUT_RESET_ACTION);
  }

  renderAlertButtons() {
    const strings = this.getStrings();
    return [
      { text: strings.cancel, onPress: () => this.setState({ alertVisible: false }) },
      { text: strings.ok, onPress: () => this.handleLogout() }
    ];
  }

  render() {
    const { navigation, screenProps } = this.props;
    const strings = this.getStrings();
    return (
      <View>
        <BackgroundImage pictureNumber={5} />
        <Header title={strings.title} leftIcon={null} navigation={navigation} />
        <FlatList
          style={{ height: HEIGHT - (IS_IOS ? 113 : 135) }}
          contentContainerStyle={{ alignItems: 'center' }}
          data={this.getItems()}
          renderItem={({ item }) => (
            <SectionListItem
              sectionTitle={item.title}
              onPress={() => {
                if (item.key === 'profile') {
                  screenProps.navigation.navigate('MyProfile', { info: item });
                } else if (item.key === 'registration') {
                  screenProps.navigation.navigate('MyRegistration', { info: item });
                } else if (item.key === 'logout') {
                  this.setState({ alertVisible: true });
                }
              }}
            />
          )}
        />
        <SuperAgileAlert
          alertVisible={this.state.alertVisible}
          setAlertVisible={visible => this.setState({ alertVisible: visible })}
          buttonsIn={this.renderAlertButtons()}
          header={strings.alertHeader}
          info={strings.alertMessage}
        />
      </View>
    );
  }
}
const mapStateToProps = ({ currentLanguage, userInformation }) => {
  const { progress } = userInformation;
  const { language } = currentLanguage;
  return { language, progress };
};

export default connect(mapStateToProps, { setProgress, resetData })(SettingsScreen);
