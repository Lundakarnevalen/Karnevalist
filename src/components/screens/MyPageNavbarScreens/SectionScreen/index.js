import React, { Component } from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, ListItem, BackgroundImage } from 'src/components/common';
import { HEIGHT, IS_IOS } from 'src/helpers/Constants';
import { setSections, setPopover } from 'src/actions';
import { SECTION_SCREEN_STRINGS } from 'src/helpers/LanguageStrings';
import { dynamicSort, getStrings } from 'src/helpers/functions';
import { fetchSections } from 'src/helpers/ApiManager';
import { styles } from './styles';

class SectionScreen extends Component {
  getLanguageStrings() {
    return getStrings(this.props.language, SECTION_SCREEN_STRINGS);
  }

  _onRefresh() {
    fetchSections(sections => {
      sections.sort(dynamicSort('title', this.props.language));
      this.props.setSections(sections);
    });
  }

  render() {
    const { navigation, language, sections } = this.props;
    const strings = this.getLanguageStrings();
    return (
      <View>
        <BackgroundImage pictureNumber={2} />
        <View>
          <Header title={strings.title} navigation={navigation} />
        </View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          style={{ height: HEIGHT - (IS_IOS ? 64 : 75) }}
          data={sections}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 60 }}
          renderItem={({ item }) => {
            const { id, title, info, image } = item;
            return (
              <ListItem
                title={title[language]}
                infoText={info[language]}
                onPress={() =>
                  this.props.navigation.navigate('SectionItemScreen', {
                    id,
                    headerTitle: strings.headerTitle,
                    title: title[language],
                    description: info[language],
                    image
                  })
                }
              />
            );
          }}
        />
        {sections.length === 0 ? (
          <Text style={styles.textStyle}>{strings.refresh}</Text>
        ) : null}
      </View>
    );
  }
}

SectionScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  language: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setSections: PropTypes.func.isRequired
};

const mapStateToProps = ({
  userInformation,
  sections,
  currentLanguage,
  popoverStatus
}) => {
  const { language } = currentLanguage;
  const { progress } = userInformation;
  const { sectionPriorities } = sections;
  return {
    sections: sections.sections,
    language,
    progress,
    sectionPriorities,
    popover: popoverStatus.sectionScreenPopover
  };
};

export default connect(mapStateToProps, {
  setSections,
  setPopover
})(SectionScreen);
