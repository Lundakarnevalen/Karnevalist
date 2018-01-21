import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { COUNT_DOWN_STRINGS } from '../../../helpers/LanguageStrings';
import { CountDownItem } from '..';
/**
 * Uppropet är den 4:e februari
 *
 */
 const SIZE = Dimensions.get('window').width;
const ONE_DAY = 86400000;
const ONE_HOUR = 3600000;
const ONE_MIN = 60000;
const ONE_SECOND = 1000;
const END_TIME = (new Date('Feb 4, 2018 00:00:01') - new Date().getTime()) < -ONE_DAY
  ? new Date('May 18, 2018 00:00:01')
  : new Date('Feb 4, 2018 00:00:01');
let interval;

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daysLeft: 0,
      hoursLeft: 0,
      minutesLeft: 0,
      secondsLeft: 0,
      karneval: false,
      upprop: false
    };
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = COUNT_DOWN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = COUNT_DOWN_STRINGS[field][language]));
    return strings;
  }

  componentWillMount() {
    this.getTimeLeft();
    interval = setInterval(() => this.getTimeLeft(), 1000);
  }
  componentWillUnmount() {
    clearInterval(interval);
  }

  getTimeLeft() {
    const now = new Date().getTime();
    const timeLeft = END_TIME - now;
    if (timeLeft < 0) {
      if (new Date('May 18, 2018 00:00:01') - new Date().getTime() > 0) {
        this.setState({ upprop: true });
      } else {
        this.setState({ karneval: true });
      }
    } else {
      this.setState({ upprop: false });
      this.setState({ karneval: false });
      const daysLeft = Math.floor(timeLeft / ONE_DAY);
      const hoursLeft = Math.floor((timeLeft % ONE_DAY) / ONE_HOUR);
      const minutesLeft = Math.floor((timeLeft % ONE_HOUR) / ONE_MIN);
      const secondsLeft = Math.floor((timeLeft % ONE_MIN) / ONE_SECOND);
      this.setState({ daysLeft, hoursLeft, minutesLeft, secondsLeft });
    }
  }

  render() {
    if (this.state.upprop) {
      const strings = this.getStrings();
      return (
        <View
          style={styles.containerStyle2}
        >
          <Text
            style={styles.textStyle2}
          >
            {strings.upprop}
          </Text>
        </View>
      );
    }
    if (this.state.karneval) {
      const strings = this.getStrings();
      return (
        <View
          style={styles.containerStyle2}
        >
          <Text
            style={styles.textStyle2}
          >
            {strings.karneval}
          </Text>
        </View>
      );
    }
    const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = this.state;
    const { containerStyle, textStyle } = styles;
    return (
      <View style={containerStyle}>
        <CountDownItem time={daysLeft} />
        <Text style={textStyle}> : </Text>
        <CountDownItem time={hoursLeft} />
        <Text style={textStyle}> : </Text>
        <CountDownItem time={minutesLeft} />
        <Text style={textStyle}> : </Text>
        <CountDownItem time={secondsLeft} />
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
  textStyle2: {
    fontSize: 32,
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Avenir Next Medium'
  },
  containerStyle2: {
    height: SIZE / 6,
    width: SIZE,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export { CountDown };
