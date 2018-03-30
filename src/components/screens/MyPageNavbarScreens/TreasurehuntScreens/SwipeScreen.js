import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import GestureRecognizer from 'react-native-swipe-gestures';
import {
  Header,
  BackgroundImage,
  CountDown,
  CustomButton
} from '~/src/components/common';
import { HEIGHT, WIDTH, IS_IOS } from '~/src/helpers/Constants';
import { TREASURE_HUNT_SCREEN_STRINGS } from '~/src/helpers/LanguageStrings';

const ProgressButton = ({ counter, value, onPress }) => (
  <Feather
    key={value}
    name={counter > value ? 'check-circle' : 'circle'}
    onPress={onPress}
    size={35}
    style={styles.navItem}
  />
);

ProgressButton.propTypes = {
  counter: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired
};

const InfoText = ({ counter, strings }) => {
  const HEADERS = ['first', 'second', 'third'];
  return (
    <View style={styles.textContainer}>
      <View>
        <Text style={styles.headerText}>
          {strings[`${HEADERS[counter]}Header`]}
        </Text>
        <Text style={styles.bodyText}>
          {strings[`${HEADERS[counter]}Body`]}
        </Text>
      </View>
    </View>
  );
};

InfoText.propTypes = {
  counter: PropTypes.number.isRequired
};

const NextButton = ({ counter, strings, onPress }) => {
  const text = counter === 2 ? strings.startButton : strings.nextButton;
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.nextButton} onPress={onPress}>
        <Text style={styles.btnText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

NextButton.propTypes = {
  counter: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired
};

const CountDownContainer = ({ screenProps, strings }) => {
  if (screenProps.endDate - new Date() < 0) {
    return (
      <View style={styles.countDownContainer}>
        <Text style={styles.countDown}>{strings.finishedText}</Text>
      </View>
    );
  }
  return (
    <View style={styles.countDownContainer}>
      <Text style={styles.countDown}>{`${strings.timeLeft}: `}</Text>
      <CountDown endDate={screenProps.endDate} />
    </View>
  );
};

class SwipeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      strings: getStrings(props.language)
    };
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 60
    };

    const { counter, strings } = this.state;
    return (
      <GestureRecognizer
        onSwipeUp={() => {
          if (counter < 2) this.setState({ counter: counter + 1 });
        }}
        onSwipeDown={() => {
          if (counter > 0) this.setState({ counter: counter - 1 });
        }}
        config={config}
      >
        <View style={styles.mainContainer}>
          <BackgroundImage pictureNumber={5} />
          <Header title={strings.treasureHunt} />
          <CountDownContainer
            screenProps={this.props.screenProps}
            strings={strings}
          />
          <InfoText counter={counter} strings={strings} />
          <View style={styles.bottomContain}>
            <NextButton
              counter={counter}
              strings={strings}
              onPress={
                counter === 2
                  ? () => this.props.navigation.navigate('CloseGameScreen')
                  : () => this.setState({ counter: counter + 1 })
              }
            />
            <View style={styles.navContainer}>
              {[0, 1, 2].map(i => (
                <ProgressButton
                  key={i}
                  value={i}
                  counter={counter}
                  onPress={() => this.setState({ counter: i })}
                />
              ))}
            </View>
          </View>
        </View>
      </GestureRecognizer>
    );
  }
}

SwipeScreen.propTypes = {
  language: PropTypes.string.isRequired
};

const styles = {
  mainContainer: {
    height: HEIGHT - 90 /* (IS_IOS ? 113 : 135), */,
    width: WIDTH,
    justifyContent: 'flex-start'
  },
  countDown: {
    fontSize: 22,
    color: 'white'
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#d999fa',
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Avenir Next Medium'
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginRight: 10,
    marginLeft: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 3
  },
  headerText: {
    fontSize: 40,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Avenir Next Medium',
    backgroundColor: 'transparent'
  },
  bodyText: {
    fontSize: 22,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Avenir Next Medium',
    backgroundColor: 'transparent'
  },
  countDownContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  navItem: {
    backgroundColor: 'transparent',
    color: '#d999fa'
  },
  navContainer: {
    marginTop: 5,
    backgroundColor: 'transparent',
    marginRight: 10
  },
  buttonContainer: {
    marginTop: 5,
    marginLeft: 10,
    width: WIDTH - 55,
    borderRadius: 5,
    backgroundColor: '#F7A021'
  },
  bottomContain: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end'
  }
};

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

const getStrings = language => {
  const { fields } = TREASURE_HUNT_SCREEN_STRINGS;
  const strings = {};
  fields.forEach(
    field => (strings[field] = TREASURE_HUNT_SCREEN_STRINGS[field][language])
  );
  return strings;
};

export default connect(mapStateToProps, null)(SwipeScreen);
