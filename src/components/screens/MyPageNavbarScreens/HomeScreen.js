import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Header from '../../common/Header';
import CustomButton from '../../common/CustomButton';
import Timeline from '../../common/Timeline';
import HomeScreenTimeline from '../../common/HomeScreenTimeline';
import BackgroundImage from '../../common/BackgroundImage';
import CountDown from '../../common/countDown/CountDown';
import { HOME_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';

const WIDTH = Dimensions.get('window').width;

class HomeScreen extends Component {
  getStrings() {
    const { language } = this.props;
    const { fields } = HOME_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = HOME_SCREEN_STRINGS[field][language]));
    return strings;
  }

  render() {
    const { container } = styles;
    const { navigation } = this.props;
    const strings = this.getStrings();
    return (
      <View>
        <BackgroundImage pictureNumber={3} />
        <Header title={strings.title} leftIcon={null} navigation={navigation} />
        <View style={{ height: 20 }} />
        <View style={container}>
          <CountDown />
          <Timeline />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
    width: WIDTH,
    marginTop: 15
  }
};

const mapStateToProps = ({ currentTheme, currentLanguage }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  return { theme, language };
};

export default connect(mapStateToProps, null)(HomeScreen);
