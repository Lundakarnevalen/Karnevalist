import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../common/Header';
import CustomButton from '../../common/CustomButton';
import BackgroundImage from '../../common/BackgroundImage';
import Popover from '../../common/Popover';
import CountDown from '../../common/countDown/CountDown';
import { HOME_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';

const WIDTH = Dimensions.get('window').width;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

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
        <View style={container}>
          <Popover />
          <CountDown />
          <CustomButton
            style={'standardButton'}
            width={WIDTH - 50}
            text={strings.buttonText}
            onPress={() => navigation.navigate('Sections')}
          />
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  buttons: {
    position: 'absolute',
    flexDirection: 'row',
    flex: 1,
    top: 0,
    left: 0,
    marginTop: 20
  },
  popoverContainer: {
    backgroundColor: '#114B5F',
    padding: 8,
    borderRadius: 5
  },
  popoverText: {
    color: '#E4FDE1'
  }
};

const mapStateToProps = ({ currentTheme, currentLanguage }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  return { theme, language };
};

export default connect(mapStateToProps, null)(HomeScreen);
