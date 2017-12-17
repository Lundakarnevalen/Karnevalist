import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../common/Header';
import BackgroundImage from '../../common/BackgroundImage';
import { SONGBOOK_SCREEN_STRINGS } from '../../../helpers/LangStrings'

class SongBookScreen extends Component {
  render() {
    const { navigation, lang } = this.props;
    const title = SONGBOOK_SCREEN_STRINGS.title[lang]
    return (
      <View>
        <BackgroundImage pictureNumber={2} />
        <Header title={title} leftIcon={null} navigation={navigation} />
      </View>
    );
  }
}

const mapStateToProps = ({ currentTheme, currentLang }) => {
  const { theme } = currentTheme;
  const { lang } = currentLang;
  return { theme, lang };
};

export default connect(mapStateToProps, null)(SongBookScreen);
