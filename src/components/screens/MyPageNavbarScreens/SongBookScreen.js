import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../common/Header';
import BackgroundImage from '../../common/BackgroundImage';
import { SONGBOOK_SCREEN_STRINGS } from '../../../helpers/LanguageStrings'

const HEIGHT = Dimensions.get('window').height;

class SongBookScreen extends Component {


  getStrings() {
    const { language } = this.props
    const { fields } = SONGBOOK_SCREEN_STRINGS
    const strings = {}
    fields.forEach(field => (strings[field] = SONGBOOK_SCREEN_STRINGS[field][language]))
    return strings
  }

  render() {
    const { navigation } = this.props;
    const strings = this.getStrings()
    return (
      <View>
        <BackgroundImage pictureNumber={2} />
        <Header title={strings.title} leftIcon={null} navigation={navigation} />
        <Text style={[styles.textStyle, { color: '#F7A021' }]}>Coming soon!</Text>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold',
    fontSize: 36,
    marginTop: HEIGHT / 3
  }
};
const mapStateToProps = ({ currentTheme, currentLanguage }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  return { theme, language };
};

export default connect(mapStateToProps, null)(SongBookScreen);
