import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import TimelineItem from './TimelineItem';
import { HOME_SCREEN_STRINGS } from '../../helpers/LanguageStrings';

const WIDTH = Dimensions.get('window').width;

class Timeline extends Component {
  getStrings() {
    const { language } = this.props;
    const { fields } = HOME_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = HOME_SCREEN_STRINGS[field][language]));
    return strings;
  }

  render() {
    const { navigation } = this.props;
    const strings = this.getStrings();
    return (
      <View>
        <TimelineItem
          style={'done'}
          width={WIDTH - 50}
          text={strings.buttonText}
          onPress={() => navigation.navigate('Sections')}
        />
        <TimelineItem
          style={'notDone'}
          width={WIDTH - 50}
          text={strings.buttonText}
          onPress={() => navigation.navigate('Sections')}
        />
        <TimelineItem
          style={'notDone'}
          width={WIDTH - 50}
          text={strings.buttonText}
          onPress={() => navigation.navigate('Sections')}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 32,
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Avenir Next Medium'
  }
};

const mapStateToProps = ({ currentTheme, currentLanguage }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  return { theme, language };
};
export default connect(mapStateToProps, null)(Timeline);
