import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../common/Header';
import BackgroundImage from '../../common/BackgroundImage';
import { SONGBOOK_SCREEN_STRINGS } from '../../../helpers/LangStrings'

const HEIGHT = Dimensions.get('window').height;

class SongBookScreen extends Component {
  getColor() {
    return this.props.theme === 'day' ? '#f4376d' : '#F7A021';
  }

  render() {
    const { navigation, lang } = this.props;
    const title = SONGBOOK_SCREEN_STRINGS.title[lang]
    return (
      <View>
        <BackgroundImage pictureNumber={2} />
        <Header title={title} leftIcon={null} navigation={navigation} />
        <Text style={[styles.textStyle, { color: this.getColor() }]}>Coming soon!</Text>
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
const mapStateToProps = ({ currentTheme, currentLang }) => {
  const { theme } = currentTheme;
  const { lang } = currentLang;
  return { theme, lang };
};

export default connect(mapStateToProps, null)(SongBookScreen);
