import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, BackgroundImage, ListItem } from '~/src/components/common';
import { SONGBOOK_SCREEN_STRINGS } from '~/src/helpers/LanguageStrings';
import { dynamicSort, getStrings } from '~/src/helpers/functions';
import { HEIGHT, IS_IOS } from '~/src/helpers/Constants';
import songs2014 from '~/assets/songbook/songs2014.json';

class SongBookScreen extends Component {
  constructor(props) {
    super(props);
    const data = songs2014.dict.array.map((song, i) => ({
      key: i,
      name: song.string[1],
      melody: song.string[2],
      text: song.string[3]
    }));
    data.sort(dynamicSort('name'));
    this.state = {
      data
    };
  }

  getLanguageStrings() {
    return getStrings(this.props.language, SONGBOOK_SCREEN_STRINGS);
  }

  render() {
    const { navigation } = this.props;
    const strings = this.getLanguageStrings();
    return (
      <View>
        <BackgroundImage pictureNumber={3} />
        <View>
          <Header title={strings.title} />
        </View>
        <FlatList
          style={{ height: HEIGHT - (IS_IOS ? 113 : 135) }}
          data={this.state.data}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 60 }}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              onPress={() =>
                navigation.navigate('SongScreen', {
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

SongBookScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, null)(SongBookScreen);