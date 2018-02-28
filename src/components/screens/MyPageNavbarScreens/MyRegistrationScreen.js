import React, { Component } from 'react';
import { BackHandler, View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { Header, SectionListItem, BackgroundImage } from '../../common';
import { MY_REGISTRATION_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';
import { HEIGHT, IS_IOS } from '../../../helpers/Constants';

class MyRegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      data: this.getSectionPriority(props.sectionPriorities)
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }

  getColor() {
    return 'white';
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = MY_REGISTRATION_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = MY_REGISTRATION_SCREEN_STRINGS[field][language]));
    return strings;
  }

  getSectionPriority(sectionPriorities) {
    const { sections, language } = this.props;
    const data = sectionPriorities.map((key, i) => {
      const index = sections.findIndex(s => s.key + '' === key + '');
      const section = sections[index];
      return {
        key: section.key,
        id: section.key,
        image: section.image,
        info: section.info[language],
        titleAndRank: i + 1 + ' ' + section.title[language],
        title: section.title[language]
      };
    });
    return data;
  }

  renderListOrMessage(strings) {
    if (this.state.data.length > 0)
      return (
        <FlatList
          data={this.state.data}
          contentContainerStyle={{ alignItems: 'center' }}
          renderItem={({ item }) => (
            <SectionListItem
              sectionTitle={item.titleAndRank}
              sectionInfoText={item.info}
              onPress={() =>
                this.props.navigation.navigate('SectionItemScreen', {
                  id: item.id,
                  title: item.title,
                  description: item.info,
                  image: item.image
                })
              }
            />
          )}
        />
      );
    return (
      <Text style={[styles.textStyle, { color: this.getColor() }]}>{strings.emptyListMessage}</Text>
    );
  }

  render() {
    const { navigation } = this.props;
    const strings = this.getStrings();
    return (
      <View>
        <BackgroundImage pictureNumber={1} />
        <View>
          <Header title={strings.title} navigation={navigation} />
        </View>
        <View style={styles.style}>{this.renderListOrMessage(strings)}</View>
      </View>
    );
  }
}

const styles = {
  style: {
    paddingBottom: IS_IOS ? 132 : 155
  },
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold',
    fontSize: 36,
    marginTop: HEIGHT / 3
  }
};

const mapStateToProps = ({ sections, currentLanguage, userInformation }) => {
  const { language } = currentLanguage;
  const { token } = userInformation;
  const { sectionPriorities } = sections;
  return {
    sections: sections.sections,
    sectionPriorities,
    language,
    token
  };
};

export default connect(mapStateToProps, null)(MyRegistrationScreen);
