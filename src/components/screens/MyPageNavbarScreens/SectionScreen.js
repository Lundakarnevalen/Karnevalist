import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  RefreshControl,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, SectionListItem, BackgroundImage, Popover } from '../../common';
import { PROGRESS } from '../../../helpers/Constants';
import { setSections, setSectionScreenPopover } from '../../../actions';
import { SECTION_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';
import { dynamicSort } from '../../../helpers/functions';
import { fetchSections } from '../../../helpers/ApiManager';

const HEIGHT = Dimensions.get('window').height;

class SectionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = SECTION_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = SECTION_SCREEN_STRINGS[field][language]));
    return strings;
  }

  renderRightIcon() {
    if (this.props.progress === PROGRESS.SENT_SECTIONS) return null;
    const { screenProps } = this.props;
    const { rightIconStyle } = styles;
    return (
      <TouchableOpacity
        style={rightIconStyle}
        onPress={() => {
          this.props.setSectionScreenPopover(false);
          screenProps.navigation.navigate('ConfirmPage');
        }}
      >
        <MaterialIcons name="local-mall" size={30} color={'white'} />
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
    if (popover)
      return (
        <Popover
          onPress={() => this.props.setSectionScreenPopover(false)}
          type={'topRight'}
          text={text}
          name={'sectionScreenPopover'}
        />
      );
  }

  render() {
    const { navigation, screenProps, language, sectionPriorities, sections } = this.props;
    const strings = this.getStrings();
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
            <RefreshControl refreshing={false} onRefresh={this._onRefresh.bind(this)} />
          }
          style={{ height: HEIGHT - (Platform.OS === 'ios' ? 113 : 135) }}
          data={sections}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 60 }}
          renderItem={({ item }) => {
            const { id, title, info, image } = item;
            return (
              <SectionListItem
                sectionTitle={title[language]}
                sectionInfoText={info[language]}
                sectionIcon={sectionPriorities.indexOf(id) === -1 ? null : 'favorite'}
                onPress={() =>
                  screenProps.navigation.navigate('SectionItemScreen', {
                    id,
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
        {sections.length === 0 ? <Text style={styles.textStyle}>{strings.refresh}</Text> : null}
      </View>
    );
  }
}

const styles = {
  rightIconStyle: {
    alignItems: 'center',
    padding: 1,
    backgroundColor: 'transparent',
    width: 60
  },
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold',
    fontSize: 36,
    position: 'absolute',
    top: HEIGHT / 2
  }
};

const mapStateToProps = ({ userInformation, sections, currentLanguage, popoverStatus }) => {
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

export default connect(mapStateToProps, { setSections, setSectionScreenPopover })(SectionScreen);
