import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../common/Header';
import SectionListItem from '../../common/SectionListItem';
import BackgroundImage from '../../common/BackgroundImage';
import { SECTION_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';
import { dynamicSort } from '../../../helpers/functions';

const height = Dimensions.get('window').height;

class SectionScreen extends Component {
  constructor(props) {
    super(props);
     const { sections } = props
     if (sections)
      sections.sort(dynamicSort('title'))
    this.state = {
      isOpen: false,
      data: sections || []
    };
  }


  getStrings() {
    const { language } = this.props;
    const { fields } = SECTION_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(
      field => (strings[field] = SECTION_SCREEN_STRINGS[field][language])
    );
    return strings;
  }

  renderRightIcon() {
    if (this.props.progress === 4) return null;
    const { screenProps, navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          screenProps.navigation.navigate('ConfirmPage', {
            navigation
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
          contentContainerStyle={{ alignItems: 'center' }}
          renderItem={({ item }) => (
            <SectionListItem
              sectionTitle={item.title}
              sectionInfoText={item.info}
              onPress={() =>
                screenProps.navigation.navigate('SectionItemScreen', {
                  id: item.id,
                  title: item.title,
                  description: item.info,
                  image: item.image
                })
              }
            />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = ({
  userInformation,
  currentTheme,
  sections,
  currentLanguage
}) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  const { progress } = userInformation;
  return { theme, sections: sections.sections, language, progress };
};

export default connect(mapStateToProps, null)(SectionScreen);
