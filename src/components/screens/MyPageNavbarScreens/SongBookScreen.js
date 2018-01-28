import React, { Component } from 'react';
import { View, FlatList, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Header, BackgroundImage, SectionListItem } from '../../common';
import { SONGBOOK_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';
import { dynamicSort } from '../../../helpers/functions';
import songs2014 from '../../../../assets/songbook/songs2014.json';

const HEIGHT = Dimensions.get('window').height;

class SongBookScreen extends Component {
  constructor(props) {
    super(props);
    const data = [];
    songs2014.dict.array.forEach((song, i) => {
      const item = {};
      item.key = i;
      item.name = song.string[1];
      item.melody = song.string[2];
      item.text = song.string[3];
      data.push(item);
    });
    data.sort(dynamicSort('name'));
    this.state = {
      data
    };
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = SONGBOOK_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = SONGBOOK_SCREEN_STRINGS[field][language]));
    return strings;
  }

  render() {
    const { navigation, screenProps } = this.props;
    const strings = this.getStrings();
    return (
      <View>
        <BackgroundImage pictureNumber={3} />
        <View>
          <Header title={strings.title} leftIcon={null} navigation={navigation} />
        </View>
        <FlatList
          style={{ height: HEIGHT - (Platform.OS === 'ios' ? 113 : 135) }}
          data={this.state.data}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 60 }}
          renderItem={({ item }) => (
            <SectionListItem
              sectionTitle={item.name}
              onPress={() =>
                screenProps.navigation.navigate('SongScreen', {
                  headerTitle: strings.headerTitle,
                  name: item.name,
                  melody: item.melody,
                  text: item.text
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

export default connect(mapStateToProps, null)(SongBookScreen);
