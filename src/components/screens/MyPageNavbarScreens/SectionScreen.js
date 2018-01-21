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
import { Header, SectionListItem, BackgroundImage } from '../../common';
import { PROGRESS } from '../../../helpers/Constants';
import { setSections } from '../../../actions';
import { SECTION_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';
import { getFavoriteSections } from '../../../helpers/LocalSave';
import { dynamicSort } from '../../../helpers/functions';
import { fetchSections } from '../../../helpers/ApiManager';

const HEIGHT = Dimensions.get('window').height;

class SectionScreen extends Component {
  constructor(props) {
    super(props);
    const { sections, language } = props;
    sections.sort(dynamicSort('title', language));
    this.state = {
      isOpen: false,
      data: sections
    };
  }

  componentWillMount() {
    this.setSections();
  }

  componentWillReceiveProps() {
    this.setSections();
  }

  setSections() {
    const { sections, language } = this.props;
    if (sections) {
      sections.sort(dynamicSort('title', language));
    }
    getFavoriteSections(result => {
      if (result) {
        for (let i = 0; i < sections.length; i++) {
          result.forEach(id => {
            if (sections[i].id + '' === id + '') {
              sections[i].favorite = 'favorite';
            }
          });
        }
      }
      this.setState({ data: sections });
    });
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
    const { screenProps, navigation, language } = this.props;
    const { rightIconStyle } = styles;
    return (
      <TouchableOpacity
        style={rightIconStyle}
        onPress={() =>
          screenProps.navigation.navigate('ConfirmPage', {
            navigation,
            setSectionStatus: id => {
              let tmpData = this.state.data;
              const tmpItem = tmpData.filter(section => section.id + '' === id + '')[0];
              tmpData = tmpData.filter(section => section.id + '' !== id + '');
              delete tmpItem.favorite;
              tmpData.push(tmpItem);
              tmpData.sort(dynamicSort('title', language));
              this.setState({ data: tmpData });
            }
          })
        }
      >
        <MaterialIcons name="local-mall" size={30} color={'white'} />
      </TouchableOpacity>
    );
  }
  _onRefresh() {
    fetchSections(sections => {
      console.log(sections);
      this.props.setSections(sections);
    });
  }

  handleSetSectionStatus(favorite, item) {
    let tmpData = this.state.data;
    const tmpItem = item;
    tmpData = tmpData.filter(section => section.id + '' !== item.id + '');
    if (favorite) {
      tmpItem.favorite = 'favorite';
    } else {
      delete tmpItem.favorite;
    }
    tmpData.push(tmpItem);
    tmpData.sort(dynamicSort('title', this.props.language));
    this.setState({ data: tmpData });
  }

  render() {
    const { navigation, screenProps, language } = this.props;
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
          data={this.state.data}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 60 }}
          renderItem={({ item }) => {
            const { id, title, info, image, favorite } = item;
            return (
              <SectionListItem
                sectionTitle={title[language]}
                sectionInfoText={info[language]}
                sectionIcon={favorite}
                onPress={() =>
                  screenProps.navigation.navigate('SectionItemScreen', {
                    id,
                    title: title[language],
                    description: info[language],
                    image,
                    setSectionStatus: fav => this.handleSetSectionStatus(fav, item)
                  })
                }
              />
            );
          }}
        />
        {this.state.data.length === 0 ? (
          <Text style={styles.textStyle}>{strings.refresh}</Text>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = ({ userInformation, sections, currentLanguage }) => {
  const { language } = currentLanguage;
  const { progress } = userInformation;
  return { sections: sections.sections, language, progress };
};

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

export default connect(mapStateToProps, { setSections })(SectionScreen);
