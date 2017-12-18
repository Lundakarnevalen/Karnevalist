import React, { Component } from 'react';
import { View, ListView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../common/Header';
import SectionListItem from '../../common/SectionListItem';
import BackgroundImage from '../../common/BackgroundImage';
import { PROFILE_SCREEN_STRINGS } from '../../../helpers/LanguageStrings'

const height = Dimensions.get('window').height;

const profileTitles = [
  { key: 'profile' },
  { key: 'registration' },
  { key: 'logout' }
];

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    const strings = this.getStrings()
    const data = profileTitles.map(item => (
       { key: item.key, title: strings[item.key] }
    ))
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(data)
    };
  }

  getStrings() {
    const { language } = this.props
    const { fields } = PROFILE_SCREEN_STRINGS
    const strings = {}
    fields.forEach(field => (strings[field] = PROFILE_SCREEN_STRINGS[field][language]))
    return strings
  }

  render() {
    const { navigation, screenProps } = this.props;
    const strings = this.getStrings()
    return (
      <View>
        <BackgroundImage pictureNumber={5} />
        <Header title={strings.title} leftIcon={null} navigation={navigation} />
        <ListView
          style={{ height: height - 64 }}
          contentContainerStyle={{ alignItems: 'center' }}
          dataSource={this.state.dataSource}
          renderRow={rowData => (
            <SectionListItem
              sectionTitle={rowData.title}
              onPress={() => {
                if (rowData.key === 'profile') {
                  screenProps.navigation.navigate('', { info: rowData });
                } else if (rowData.key === 'registration') {
                  screenProps.navigation.navigate('', { info: rowData });
                } else if (rowData.key === 'logout') {
                  screenProps.navigation.goBack(null);
                }
              }}
            />
          )}
        />
      </View>
    );
  }
}
const mapStateToProps = ({ currentTheme, currentLanguage }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  return { theme, language };
};

export default connect(mapStateToProps, null)(ProfileScreen);
