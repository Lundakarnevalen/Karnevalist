import React, { Component } from 'react';
import { View, ListView, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Header, SectionListItem, BackgroundImage, SuperAgileAlert } from '../../common';
import { removeItem } from '../../../helpers/LocalSave';
import { setProgress } from '../../../actions';
import { LOGOUT_RESET_ACTION } from '../../../helpers/Constants';
import { SETTINGS_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';

const height = Dimensions.get('window').height;

const settingsTitles = [{ key: 'profile' }, { key: 'registration' }, { key: 'logout' }];

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    const strings = this.getStrings();
    const data = settingsTitles.map(item => ({ key: item.key, title: strings[item.key] }));
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(data),
      alertVisible: false
    };
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
    this.props.setProgress(0);
    this.props.screenProps.navigation.dispatch(LOGOUT_RESET_ACTION);
  }

  renderAlertButtons() {
    const strings = this.getStrings()
    return ([
      { text: strings.cancel, onPress: () => this.setState({ alertVisible: false }) },
      { text: strings.ok, onPress: () => this.handleLogout() }
    ])
  }

  render() {
    const { navigation, screenProps } = this.props;
    const strings = this.getStrings();
    return (
      <View>
        <BackgroundImage pictureNumber={5} />
        <Header title={strings.title} leftIcon={null} navigation={navigation} />
        <ListView
          style={{ height: height - (Platform.OS === 'ios' ? 113 : 135) }}
          contentContainerStyle={{ alignItems: 'center' }}
          dataSource={this.state.dataSource}
          renderRow={rowData => (
            <SectionListItem
              sectionTitle={rowData.title}
              onPress={() => {
                if (rowData.key === 'profile') {
                  screenProps.navigation.navigate('MyProfile', { info: rowData });
                } else if (rowData.key === 'registration') {
                  screenProps.navigation.navigate('MyRegistration', { info: rowData });
                } else if (rowData.key === 'logout') {
                  this.setState({ alertVisible: true })
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
const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, { setProgress })(SettingsScreen);
