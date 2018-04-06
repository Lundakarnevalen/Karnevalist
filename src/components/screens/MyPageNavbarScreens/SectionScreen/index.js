import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Header,
  ListItem,
  BackgroundImage,
  Popover
} from '~/src/components/common';
import { PROGRESS, HEIGHT, IS_IOS } from '~/src/helpers/Constants';
import { setSections, setPopover } from '~/src/actions';
import { SECTION_SCREEN_STRINGS } from '~/src/helpers/LanguageStrings';
import { dynamicSort, getStrings } from '~/src/helpers/functions';
import { fetchSections } from '~/src/helpers/ApiManager';
import { styles } from './styles';

class SectionScreen extends Component {
  getLanguageStrings() {
    return getStrings(this.props.language, SECTION_SCREEN_STRINGS);
  }

  renderRightIcon() {
    if (this.props.progress === PROGRESS.SENT_SECTIONS) return null;
    const { screenProps } = this.props;
    const { rightIconStyle } = styles;
    return (
      <TouchableOpacity
        style={rightIconStyle}
        onPress={() => {
          this.props.setPopover('sectionScreenPopover', false);
          screenProps.navigation.navigate('ConfirmPage');
        }}
      >
        <MaterialIcons name="format-list-numbered" size={30} color="white" />
      </TouchableOpacity>
    );
  }

  _onRefresh() {
    fetchSections(sections => {
      sections.sort(dynamicSort('title', this.props.language));
      this.props.setSections(sections);
    });
  }

  renderPopover(text) {
    const { popover } = this.props;
    if (popover && this.props.progress >= 2)
      return (
        <Popover
          onPress={() => this.props.setPopover('sectionScreenPopover', false)}
          type="topRight"
          text={text}
          name="sectionScreenPopover"
        />
      );
  }

  render() {
    const { navigation, language, sectionPriorities, sections } = this.props;
    const strings = this.getLanguageStrings();
    return (
      <View>
        <BackgroundImage pictureNumber={2} />
        <View>
          <Header
            rightIcon={this.renderRightIcon()}
            title={strings.title}
            leftIcon={null}
            navigation={navigation}
          />
        </View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          style={{ height: HEIGHT - (IS_IOS ? 113 : 135) }}
          data={sections}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 60 }}
          renderItem={({ item }) => {
            const { id, title, info, image } = item;
            return (
              <ListItem
                title={title[language]}
                infoText={info[language]}
                icon={sectionPriorities.indexOf(id) === -1 ? null : 'favorite'}
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
        {this.renderPopover(strings.popoverText)}
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
  progress: PropTypes.number.isRequired,
  screenProps: PropTypes.shape().isRequired,
  popover: PropTypes.bool.isRequired,
  sectionPriorities: PropTypes.arrayOf(PropTypes.number).isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setPopover: PropTypes.func.isRequired,
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
