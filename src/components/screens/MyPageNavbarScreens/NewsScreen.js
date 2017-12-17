import React, { Component } from 'react';
import { View, ListView, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../common/Header';
import SectionListItem from '../../common/SectionListItem';
import BackgroundImage from '../../common/BackgroundImage';
import { getNews } from '../../../helpers/ApiManager';
import { NEWS_SCREEN_STRINGS } from '../../../helpers/LangStrings';

const height = Dimensions.get('window').height;

class NewsScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    getNews().then(response => {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.setState({
        dataSource: ds.cloneWithRows(response)
      });
    });
  }

  render() {
    const { navigation, screenProps, lang } = this.props
    const title = NEWS_SCREEN_STRINGS.title[lang]
    return (
      <View>
        <BackgroundImage pictureNumber={4} />
        <Header title={title} leftIcon={null} navigation={navigation} />
        <ListView
          enableEmptySections
          style={{ height: height - (Platform.OS === 'ios' ? 120 : 148) }}
          dataSource={this.state.dataSource}
          enableEmptySections
          contentContainerStyle={{ alignItems: 'center' }}
          renderRow={rowData => (
            <SectionListItem
              sectionTitle={rowData.title.rendered}
              sectionDate={rowData.date}
              onPress={() =>
                screenProps.navigation.navigate('SingleNewsScreen', {
                  info: { title: rowData.title.rendered, url: rowData.link }
                })
              }
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

export default connect(mapStateToProps, null)(NewsScreen);
