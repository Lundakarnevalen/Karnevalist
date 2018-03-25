import React, { Component } from 'react';
import { View, Text, ScrollView, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '~/src/components/common';
import { SECTION_ITEM_SCREEN_STRINGS } from '~/src/helpers/LanguageStrings';
import { HEIGHT, WIDTH } from '~/src/helpers/Constants';
import { getStrings } from '~/src/helpers/functions';
import { songScreenStyles } from './styles';

class SongScreen extends Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.props.navigation.goBack()
    );
  }

  getLanguageStrings() {
    return getStrings(this.props.language, SECTION_ITEM_SCREEN_STRINGS);
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

SongScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = ({ userInformation, currentLanguage }) => {
  const { language } = currentLanguage;
  const { progress } = userInformation;
  return { language, progress };
};

export default connect(mapStateToProps, null)(SongScreen);
