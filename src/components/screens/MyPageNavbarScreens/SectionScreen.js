import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../common/Header';
import SectionListItem from '../../common/SectionListItem';
import BackgroundImage from '../../common/BackgroundImage';
import { SECTION_SCREEN_STRINGS } from '../../../helpers/LangStrings'

class SectionScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      data: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const { sections } = nextProps;
    sections.sort(this.dynamicSort('title'));
    this.setState({ data: nextProps.sections });
  }

  dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  getColor() {
    switch (this.props.theme) {
      case 'morning':
        return '#F7A021';
      case 'day':
        return '#f4376d';
      default:
        return 'white';
    }
  }

  render() {
    const { navigation, screenProps, lang } = this.props;
    const title = SECTION_SCREEN_STRINGS.title[lang]
    return (
      <View>
        <BackgroundImage pictureNumber={1} />
        <View>

          <Header
            rightIcon={
              <TouchableOpacity
                onPress={() => screenProps.navigation.navigate('ConfirmPage', { navigation })}
              >
                <MaterialIcons name="local-mall" size={30} color={this.getColor()} />
              </TouchableOpacity>
            }
            title={title}
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

const mapStateToProps = ({ currentTheme, sections, currentLang }) => {
  const { theme } = currentTheme;
  const { lang } = currentLang;
  return { theme, sections: sections.sections, lang };
};

export default connect(mapStateToProps, null)(SectionScreen);
