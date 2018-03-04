import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Header, CustomButton, BackgroundImage, CountDown } from '../../common';
import { HEIGHT, WIDTH } from '../../../helpers/Constants'
import { TREASURE_HUNT_SCREEN_STRINGS } from '../../../helpers/LanguageStrings'

class ThirdScreen extends Component {

  getStrings() {
    const { language } = this.props;
    const { fields } = TREASURE_HUNT_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = TREASURE_HUNT_SCREEN_STRINGS[field][language]));
    return strings;
  }

  render() {
    const strings = this.getStrings()
    const { mainContainer, textStyle, container, buttonContainer, countDownContainer } = styles
    return (
      <View style={mainContainer}>
        <BackgroundImage pictureNumber={1} />
        <Header title={strings.treasureHunt} />
        <View style={countDownContainer}>
          <Text style={textStyle}>{strings.timeLeft + ': '}</Text>
          <CountDown endDate={new Date('March 18, 2018 00:00:01')} />
        </View>
        <View style={container}>
          <View style={buttonContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
            <MaterialIcons
              name={'keyboard-arrow-left'}
              size={60}
              style={{ backgroundColor: 'transparent', color: 'pink' }}
            />
            </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <CustomButton
                style={'standardButton'}
                onPress={() => this.props.navigation.navigate('GameScreen')}
                text={strings.startButton}
              />
            </View>
          </View>
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    height: HEIGHT - (Platform.OS === 'ios' ? 52 : 74), width: WIDTH
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
    justifyContent: 'flex-start'
  },
  textStyle: {
    color: 'white',
    fontSize: 22
  }
}

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, null)(ThirdScreen)
