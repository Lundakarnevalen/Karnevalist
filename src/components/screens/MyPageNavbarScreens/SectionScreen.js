import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, SectionListItem, BackgroundImage } from '../../common';
import { PROGRESS } from '../../../helpers/Constants';
import { SECTION_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';
import { getFavoriteSections } from '../../../helpers/LocalSave';
import { dynamicSort } from '../../../helpers/functions';

const height = Dimensions.get('window').height;

class SectionScreen extends Component {
  constructor(props) {
    super(props);
    const { sections } = props;
    this.state = {
      isOpen: false,
      data: sections || []
    };
  }

  componentWillMount() {
    const { sections } = this.props;
    if (sections) {
      sections.sort(dynamicSort('title'));
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
    const { screenProps, navigation } = this.props;
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
              tmpData.sort(dynamicSort('title'));
              this.setState({ data: tmpData });
            }
          })
        }
      >
        <MaterialIcons name="local-mall" size={30} color={'white'} />
      </TouchableOpacity>
    );
  }

  render() {
    const { navigation, screenProps } = this.props;
    const strings = this.getStrings();
    return (
      <View>
        <BackgroundImage pictureNumber={1} />
        <View>
          <Header
            rightIcon={this.renderRightIcon()}
            title={strings.title}
            leftIcon={null}
            navigation={navigation}
          />
        </View>
        <FlatList
          style={{ height: height - (Platform.OS === 'ios' ? 113 : 135) }}
          data={this.state.data}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 60 }}
          renderItem={({ item }) => (
            <SectionListItem
              sectionTitle={item.title}
              sectionInfoText={item.info}
              sectionIcon={item.favorite}
              onPress={() =>
                screenProps.navigation.navigate('SectionItemScreen', {
                  id: item.id,
                  title: item.title,
                  description: item.info,
                  image: item.image,
                  setSectionStatus: favorite => {
                    let tmpData = this.state.data;
                    const tmpItem = item;
                    tmpData = tmpData.filter(section => section.id + '' !== item.id + '');
                    if (favorite) {
                      tmpItem.favorite = 'favorite';
                    } else {
                      delete tmpItem.favorite;
                    }
                    tmpData.push(tmpItem);
                    tmpData.sort(dynamicSort('title'));
                    this.setState({ data: tmpData });
                  }
                })
              }
            />
          )}
        />
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
  }
};

export default connect(mapStateToProps, null)(SectionScreen);
