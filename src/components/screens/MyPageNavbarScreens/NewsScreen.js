import React, { Component } from 'react';
import { View, FlatList, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Header, SectionListItem, BackgroundImage } from '../../common';
import { getNews } from '../../../helpers/ApiManager';
import { NEWS_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';

const height = Dimensions.get('window').height;

class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    getNews().then(response => this.setState({ data: response }));
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = NEWS_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = NEWS_SCREEN_STRINGS[field][language]));
    return strings;
  }

  render() {
    const { data } = this.state;
    const { navigation, screenProps } = this.props;
    const strings = this.getStrings();
    return (
      <View>
        <BackgroundImage pictureNumber={4} />
        <Header title={strings.title} leftIcon={null} navigation={navigation} />
        <FlatList
          enableEmptySections
          style={{ height: height - (Platform.OS === 'ios' ? 113 : 135) }}
          data={data}
          enableEmptySections
          contentContainerStyle={{ alignItems: 'center' }}
          renderItem={({ item }) => (
            <SectionListItem
              sectionTitle={item.title.rendered}
              sectionDate={item.date}
              onPress={() =>
                screenProps.navigation.navigate('SingleNewsScreen', {
                  info: { title: item.title.rendered, url: item.link }
                })
              }
            />
          )}
        />
      </View>
    );
  }
}
const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, null)(NewsScreen);
