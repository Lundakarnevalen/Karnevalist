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
          text={strings.CheckIn}
          onPress={() => navigation.navigate('Sections')}
        />
        <View style={styles.barView1} />
        <TimelineItem
          style={'notDone'}
          width={WIDTH - 50}
          text={strings.ChooseSections}
          onPress={() => navigation.navigate('Sections')}
        />
        <View style={styles.barView23} />
        <TimelineItem
          style={'notDone'}
          width={WIDTH - 50}
          text={strings.Rank}
          onPress={() => navigation.navigate('Sections')}
        />
        <View style={styles.barView4} />
        <TimelineItem
          style={'notDone'}
          width={WIDTH - 50}
          text={strings.SendIn}
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
  },
  barView1: {
    width: Dimensions.get('window').width / 9 / 5,
    height: Dimensions.get('window').width / 8,
    backgroundColor: '#F7A021',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -22,
    marginBottom: -30,
    marginLeft: 22
  },
  barView23: {
    width: Dimensions.get('window').width / 9 / 5,
    height: Dimensions.get('window').width / 8,
    backgroundColor: '#F7A021',
    justifyContent: 'center',
    alignItems: 'center',
    margin: -30,
    marginLeft: 22
  },
  barView4: {
    width: Dimensions.get('window').width / 9 / 5,
    height: Dimensions.get('window').width / 8,
    backgroundColor: '#F7A021',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    marginBottom: -22,
    marginLeft: 22
  },
};

const mapStateToProps = ({ currentTheme, currentLanguage }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  return { theme, language };
};
export default connect(mapStateToProps, null)(Timeline);
