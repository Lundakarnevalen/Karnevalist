import React, { Component } from 'react';
import { View, SectionList, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Header,
  BackgroundImage,
  ListItem,
  Input,
  Popover
} from '~/src/components/common';
import { SONGBOOK_SCREEN_STRINGS } from '~/src/helpers/LanguageStrings';
import { dynamicSort, getStrings } from '~/src/helpers/functions';
import { setPopover } from '~/src/actions';
import { HEIGHT, IS_IOS, WIDTH } from '~/src/helpers/Constants';
import songs2018 from '~/assets/songbook/songs2018.json';
import songs2014 from '~/assets/songbook/songs2014.json';
import { styles } from './styles';

const NBR_SONGS = 32;
const songIncludesText = (song, input) =>
  song.name.toLowerCase().includes(input) ||
  song.melody.toLowerCase().includes(input) ||
  song.category.toLowerCase().includes(input);

class SongBookScreen extends Component {
  constructor(props) {
    super(props);
    const data = songs2018.dict.array.map((song, i) => ({
      key: i,
      name: song.string[1],
      melody: song.string[2],
      text: song.string[3],
      category: song.string[0]
    }));
    const data2014 = songs2014.dict.array
      .map((song, i) => ({
        key: i,
        name: song.string[1],
        melody: song.string[2],
        text: song.string[3],
        category: '2014'
      }))
      .sort(dynamicSort('name'));
    const categories = songs2018.dict.array
      .map(song => song.string[0])
      .filter((item, i, ar) => ar.indexOf(item) === i);
    const categorySongs = categories
      .map(s => ({
        title: s,
        data: data.filter(d => d.category === s).sort(dynamicSort('name'))
      }))
      .concat({ title: '2014', data: data2014 });
    this.state = {
      categorySongs,
      currentCategorySongs: categorySongs,
      input: ''
    };
  }

  getLanguageStrings() {
    return getStrings(this.props.language, SONGBOOK_SCREEN_STRINGS);
  }

  resetFilter() {
    this.setState({
      input: '',
      currentCategorySongs: this.state.categorySongs
    });
  }

  filterData(input) {
    const value = input.toLowerCase();
    const { categorySongs } = this.state;
    const currentCategorySongs = categorySongs.map(({ title, data }) => ({
      title,
      data: data.filter(d => songIncludesText(d, value))
    }));
    this.setState({ input, currentCategorySongs });
  }

  renderPopover(text) {
    const { popover } = this.props;
    if (popover)
      return (
        <Popover
          onPress={() => this.props.setPopover('songBookScreenPopover', false)}
          type="topLeft"
          text={text}
          name="songBookScreenPopover"
          big
        />
      );
    return null;
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
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Input
            width={WIDTH * 5 / 6}
            placeholder={strings.search}
            icon="remove"
            iconOnPress={() => this.resetFilter()}
            value={this.state.input}
            onChangeText={text => this.filterData(text)}
          />
        </View>
        <SectionList
          style={{ height: HEIGHT - (IS_IOS ? 113 : 135) }}
          sections={this.state.currentCategorySongs}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
          renderSectionHeader={({ section }) =>
            section.data && section.data.length > 0 ? (
              <Text style={styles.sectionHeaderStyle}> {section.title} </Text>
            ) : null
          }
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              infoText={item.melody}
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
          initialNumToRender={NBR_SONGS}
          keyExtractor={(item, index) => index}
        />
        {this.renderPopover(strings.searchPopover)}
      </View>
    );
  }
}

SongBookScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  language: PropTypes.string.isRequired,
  popover: PropTypes.bool.isRequired,
  setPopover: PropTypes.func.isRequired
};

const mapStateToProps = ({ currentLanguage, popoverStatus }) => {
  const { language } = currentLanguage;
  const popover = popoverStatus.songBookScreenPopover;
  return { language, popover };
};

export default connect(mapStateToProps, {
  setPopover
})(SongBookScreen);
