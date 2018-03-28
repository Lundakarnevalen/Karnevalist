import React, { Component } from 'react';
import { View, SectionList, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Header,
  BackgroundImage,
  ListItem,
  Input
} from '~/src/components/common';
import { SONGBOOK_SCREEN_STRINGS } from '~/src/helpers/LanguageStrings';
import { dynamicSort, getStrings } from '~/src/helpers/functions';
import { HEIGHT, IS_IOS, WIDTH } from '~/src/helpers/Constants';
import songs2018 from '~/assets/songbook/songs2018.json';
import { styles } from './styles';

const NBR_SONGS = 32;
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
    const sections = songs2018.dict.array
      .map(song => song.string[0])
      .filter((item, i, ar) => ar.indexOf(item) === i);
    const allData = sections.map(s => ({
      title: s,
      data: data.filter(d => d.category === s).sort(dynamicSort('name'))
    }));
    this.state = {
      allData,
      currentData: allData,
      input: ''
    };
  }

  getLanguageStrings() {
    return getStrings(this.props.language, SONGBOOK_SCREEN_STRINGS);
  }

  filterData(input) {
    input = input.toLowerCase();
    const { allData } = this.state;
    const currentData = allData.map(({ title, data }) => ({
      title,
      data: data.filter(
        d =>
          d.name.toLowerCase().includes(input) ||
          d.melody.toLowerCase().includes(input) ||
          d.category.toLowerCase().includes(input)
      )
    }));
    this.setState({ input, currentData });
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
        <Input
          width={WIDTH * 2 / 3}
          placeholder="Search.."
          value={this.state.input}
          onChangeText={input => this.filterData(input)}
        />
        <SectionList
          style={{ height: HEIGHT - (IS_IOS ? 113 : 135) }}
          sections={this.state.currentData}
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
