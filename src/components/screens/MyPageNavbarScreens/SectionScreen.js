import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../common/Header';
import SectionListItem from '../../common/SectionListItem';
import BackgroundImage from '../../common/BackgroundImage';
import { SECTION_SCREEN_STRINGS } from '../../../helpers/LanguageStrings'
import { dynamicSort } from '../../../helpers/functions'

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
    const { language } = this.props
    const { fields } = SECTION_SCREEN_STRINGS
    const strings = {}
    fields.forEach(field => (strings[field] = SECTION_SCREEN_STRINGS[field][language]))
    return strings
  }

  render() {
    const { navigation, screenProps } = this.props;
    const strings = this.getStrings()
    return (
      <View>
        <BackgroundImage pictureNumber={1} />
        <View>

          <Header
            rightIcon={
              <TouchableOpacity
                onPress={() => screenProps.navigation.navigate('ConfirmPage', { navigation })}
              >
                <MaterialIcons name="local-mall" size={30} color={'white'} />
              </TouchableOpacity>
            }
            title={strings.title}
            leftIcon={null}
            navigation={navigation}
          />
        </View>
        <View style={styles.style}>
          <FlatList
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
      </View>
    );
  }
}

const styles = {
  style: {
    paddingBottom: Platform.OS === 'ios' ? 132 : 148
  }
};

const mapStateToProps = ({ currentTheme, sections, currentLanguage }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  return { theme, sections: sections.sections, language };
};

export default connect(mapStateToProps, null)(SectionScreen);
