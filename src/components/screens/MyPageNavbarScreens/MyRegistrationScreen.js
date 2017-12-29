import React, { Component } from 'react';
import { BackHandler, View, TouchableOpacity, FlatList, Platform, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../common/Header';
import SectionListItem from '../../common/SectionListItem';
import BackgroundImage from '../../common/BackgroundImage';
import { MY_REGISTRATION_SCREEN_STRINGS } from '../../../helpers/LanguageStrings'

const HEIGHT = Dimensions.get('window').height
class MyRegistrationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      data: []
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
    this.getSectionPriority(this.props.sectionPriorities)
  }

  componentWillReceiveProps(nextProps) {
    this.getSectionPriority(nextProps.sectionPriorities)
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
  getStrings() {
    const { language } = this.props
    const { fields } = MY_REGISTRATION_SCREEN_STRINGS
    const strings = {}
    fields.forEach(field => (strings[field] = MY_REGISTRATION_SCREEN_STRINGS[field][language]))
    return strings
  }

  getSectionPriority(sectionPriorities) {
    const { sections } = this.props
    const data = sectionPriorities.map((key, i) => {
      const index = sections.findIndex(s => s.key + '' === key + '')
      const section = sections[index]
        return ({
          key: section.key,
          id: section.key,
          image: section.image,
          info: section.info,
          titleAndRank: i + 1 + ' ' + section.title,
          title: section.title
        })
    })
    this.setState({ data })
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
      )
    return (
      <Text style={[styles.textStyle, { color: this.getColor() }]}>
        {strings.emptyListMessage}
      </Text>)
  }

  render() {
    const { navigation } = this.props;
    const strings = this.getStrings()
    return (
      <View>
        <BackgroundImage pictureNumber={1} />
        <View>
          <Header
            rightIcon={
              <TouchableOpacity
                onPress={() => navigation.navigate('ConfirmPage', { navigation })}
              >
                <MaterialIcons name="local-mall" size={30} color={this.getColor()} />
              </TouchableOpacity>
            }
            title={strings.title}
            navigation={navigation}
          />
        </View>
        <View style={styles.style}>
          {this.renderListOrMessage(strings)}
        </View>
      </View>
    );
  }
}

const styles = {
  style: {
    paddingBottom: Platform.OS === 'ios' ? 132 : 155
  },
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold',
    fontSize: 36,
    marginTop: HEIGHT / 3
  }
};

const mapStateToProps = ({ currentTheme, sections, currentLanguage, userInformation }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  const { token } = userInformation
  const { sectionPriorities } = sections
  return { theme, sections: sections.sections, sectionPriorities, language, token };
};

export default connect(mapStateToProps, null)(MyRegistrationScreen);
