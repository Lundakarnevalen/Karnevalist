import React, { Component } from 'react'
import { View, Text } from 'react-native'
import CountDownItem from './CountDownItem';
/**
 * Uppropet är den 4:e februari
 *
 */
const END_TIME = new Date('Feb 4, 2018 00:00:01');
const ONE_DAY = 86400000;
const ONE_HOUR = 3600000;
const ONE_MIN = 60000;
const ONE_SECOND = 1000;

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daysLeft: 0,
      hoursLeft: 0,
      minutesLeft: 0,
      secondsLeft: 0
    }
  }

  componentWillMount() {
    this.getTimeLeft();
    setInterval(() => this.getTimeLeft(), 1000);
  }

  getTimeLeft() {
    const now = new Date().getTime();
    const timeLeft = END_TIME - now;
    const daysLeft = Math.floor(timeLeft / ONE_DAY);
    const hoursLeft = Math.floor((timeLeft % ONE_DAY) / ONE_HOUR);
    const minutesLeft = Math.floor((timeLeft % ONE_HOUR) / ONE_MIN);
    const secondsLeft = Math.floor((timeLeft % ONE_MIN) / ONE_SECOND);
    this.setState({ daysLeft, hoursLeft, minutesLeft, secondsLeft });
  }

  render() {
    const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = this.state;
    const { containerStyle, textStyle } = styles;
    return (
      <View style={containerStyle}>
        <CountDownItem
          time={daysLeft}
        />
        <Text style={textStyle}> : </Text>
        <CountDownItem
          time={hoursLeft}
        />
        <Text style={textStyle}> : </Text>
        <CountDownItem
          time={minutesLeft}
        />
        <Text style={textStyle}> : </Text>
        <CountDownItem
          time={secondsLeft}
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
    color: '#8A4797',
    fontWeight: 'bold'
  }
}

export default CountDown;
