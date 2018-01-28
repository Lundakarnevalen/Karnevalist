import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Header } from '../../common';
import { SECTION_ITEM_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
class SectionItemScreen extends Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = SECTION_ITEM_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = SECTION_ITEM_SCREEN_STRINGS[field][language]));
    return strings;
  }

  render() {
    const { navigation } = this.props;
    const { name, melody, text, headerTitle } = navigation.state.params;
    const { containerStyle, headerStyle, subHeaderStyle, textStyle } = styles;
    return (
      <View style={containerStyle}>
        <Header title={headerTitle || name} navigation={navigation} />
        <View>
          <ScrollView>
            <Text style={[headerStyle, { color: '#F7A021' }]}>{name}</Text>
            <Text style={[subHeaderStyle, { color: '#F7A021' }]}>{melody}</Text>
            <Text style={textStyle}>{text}</Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: 'white'
  },
  headerStyle: {
    fontSize: 26,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Avenir Next Bold',
    backgroundColor: 'transparent'
  },
  subHeaderStyle: {
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Avenir Next Bold',
    backgroundColor: 'transparent'
  },
  textStyle: {
    fontSize: 16,
    margin: 10,
    fontFamily: 'Avenir Next Medium',
    backgroundColor: 'transparent',
    color: '#333'
  }
};

const mapStateToProps = ({ userInformation, currentLanguage }) => {
  const { language } = currentLanguage;
  const { progress } = userInformation;
  return { language, progress };
};

export default connect(mapStateToProps, null)(SectionItemScreen);
