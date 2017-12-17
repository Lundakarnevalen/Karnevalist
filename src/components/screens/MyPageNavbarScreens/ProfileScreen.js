import React, { Component } from 'react';
import { View, ListView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../common/Header';
import SectionListItem from '../../common/SectionListItem';
import BackgroundImage from '../../common/BackgroundImage';
import { PROFILE_SCREEN_STRINGS } from '../../../helpers/LangStrings'

const height = Dimensions.get('window').height;

const profileTitles = [
  { key: 'profile' },
  { key: 'registration' },
  { key: 'logout' }
];

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    const { lang } = props
    const data = profileTitles.map(item => (
       { key: item.key, title: PROFILE_SCREEN_STRINGS[item.key][lang] }
    ))
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(data)
    };
  }

  render() {
    const { navigation, screenProps, lang } = this.props;
    const title = PROFILE_SCREEN_STRINGS.title[lang]
    return (
      <View>
        <BackgroundImage pictureNumber={5} />
        <Header title={title} leftIcon={null} navigation={navigation} />
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
const mapStateToProps = ({ currentTheme, currentLang }) => {
  const { theme } = currentTheme;
  const { lang } = currentLang;
  return { theme, lang };
};

export default connect(mapStateToProps, null)(ProfileScreen);
