import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Header, BackgroundImage, CountDown, CustomButton } from '../../common';
import { HEIGHT, WIDTH, IS_IOS } from '../../../helpers/Constants';
import { TREASURE_HUNT_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';

const HEADERS = ['first', 'second', 'third'];
class SwipeScreen extends Component {
  state = {
    counter: 0
  };

  getStrings() {
    const { language } = this.props;
    const { fields } = TREASURE_HUNT_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(
      field => (strings[field] = TREASURE_HUNT_SCREEN_STRINGS[field][language])
    );
    return strings;
  }

  renderProgressButton(counter, value) {
    return (
      <MaterialIcons
        key={value}
        name={'face'}
        onPress={() => this.setState({ counter: value })}
        size={35}
        style={{
          backgroundColor: 'transparent',
          color: counter === value ? 'white' : 'black'
        }}
      />
    );
  }

  renderInfoText(counter, styles, strings) {
    return (
      <View style={styles.progressButtonsStyle}>
        <Text style={styles.infoHeaderStyle}>
          {strings[HEADERS[counter] + 'Header']}
        </Text>
        <Text style={styles.infoTextStyle}>
          {strings[HEADERS[counter] + 'Body']}
        </Text>
      </View>
    );
  }

  renderNextButton(counter, strings) {
    const onPress =
      counter == 2
        ? () => this.props.navigation.navigate('GameScreen')
        : () => this.setState({ counter: counter + 1 });
    const text = counter == 2 ? strings.startButton : strings.nextButton;
    return (
      <View style={styles.startButtonStyle}>
        <CustomButton style={'standardButton'} onPress={onPress} text={text} />
      </View>
    );
  }

  render() {
    const strings = this.getStrings();
    const {
      mainContainer,
      textStyle,
      container,
      buttonContainer,
      countDownContainer,
      infoTextStyle,
      infoHeaderStyle,
      progressButtonsStyle,
      startButtonStyle
    } = styles;
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 60
    };

    const { counter } = this.state;
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
        <View style={mainContainer}>
          <BackgroundImage pictureNumber={5} />
          <Header title={strings.treasureHunt} />
          {this.props.screenProps.endDate - new Date() < 0 ? (
            <View style={countDownContainer}>
              <Text style={textStyle}>{strings.finishedText}</Text>
            </View>
          ) : (
            <View style={countDownContainer}>
              <Text style={textStyle}>{strings.timeLeft + ': '}</Text>
              <CountDown endDate={this.props.screenProps.endDate} />
            </View>
          )}
          {this.renderInfoText(counter, styles, strings)}
          {this.renderNextButton(counter, strings)}
          <View style={[progressButtonsStyle, { marginTop: 0 }]}>
            {[0, 1, 2].map(i => this.renderProgressButton(counter, i))}
          </View>
        </View>
      </GestureRecognizer>
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
    justifyContent: 'center'
  },
  countDownContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    color: 'white',
    fontSize: 22
  },
  infoHeaderStyle: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: 'white',
    fontSize: 40
  },
  infoTextStyle: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: 'white',
    fontSize: 22
  },
  progressButtonsStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  startButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
};
const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, null)(SwipeScreen);
