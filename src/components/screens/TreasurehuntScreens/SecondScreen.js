import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Header, BackgroundImage, CountDown } from '../../common'
import { HEIGHT, WIDTH, IS_IOS } from '../../../helpers/Constants'
import { TREASURE_HUNT_SCREEN_STRINGS } from '../../../helpers/LanguageStrings'

class SecondScreen extends Component {

  getStrings() {
    const { language } = this.props;
    const { fields } = TREASURE_HUNT_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = TREASURE_HUNT_SCREEN_STRINGS[field][language]));
    return strings;
  }

  render() {
    const strings = this.getStrings()
    const { mainContainer, textStyle, container, buttonContainer, countDownContainer, infoTextStyle } = styles
    const { navigation } = this.props
    return (
      <View style={mainContainer}>
        <BackgroundImage pictureNumber={1} />
        <Header title={strings.treasureHunt} />
        <View style={countDownContainer}>
          <Text style={textStyle}>{strings.timeLeft + ': '}</Text>
          <CountDown endDate={this.props.screenProps.endDate} />
        </View>
        <View style={container}>
          <View style={buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
            >
            <MaterialIcons
              name={'keyboard-arrow-left'}
              size={60}
              style={{ backgroundColor: 'transparent', color: '#f4376d' }}
            />
            </TouchableOpacity >
            <Text style={infoTextStyle}>{strings.info}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Third')}
            >
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={60}
              style={{ backgroundColor: 'transparent', color: '#f4376d' }}
            />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    height: HEIGHT - (IS_IOS ? 113 : 135),
    width: WIDTH
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  countDownContainer: {
     alignItems: 'center',
     flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textStyle: {
    color: 'white',
    fontSize: 22
  },
  infoTextStyle: {
    flex: 1,
    textAlign: 'center',
    flexWrap: 'wrap',
    color: 'white',
    fontSize: 22
  }
}

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, null)(SecondScreen)
