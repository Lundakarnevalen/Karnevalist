import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { CountDownItem } from './CountDownItem'
import { countDownStyles } from './styles'

const ONE_DAY = 86400000
const ONE_HOUR = 3600000
const ONE_MIN = 60000
const ONE_SECOND = 1000

class CountDown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      daysLeft: 0,
      hoursLeft: 0,
      minutesLeft: 0,
      secondsLeft: 0,
      karneval: false,
      upprop: false,
      strings: props.strings,
      endDate: props.endDate,
      onDone: props.onDone
    }
  }

  componentWillMount () {
    this.getTimeLeft()
    const interval = setInterval(() => this.getTimeLeft(), 1000)
    this.setState({interval})
  }

  componentWillUnmount () {
    clearInterval(this.state.interval)
  }

  getTimeLeft () {
    const now = new Date().getTime()
    const timeLeft = this.state.endDate - now
    if (timeLeft > 0) {
      const daysLeft = Math.floor(timeLeft / ONE_DAY)
      const hoursLeft = Math.floor((timeLeft % ONE_DAY) / ONE_HOUR)
      const minutesLeft = Math.floor((timeLeft % ONE_HOUR) / ONE_MIN)
      const secondsLeft = Math.floor((timeLeft % ONE_MIN) / ONE_SECOND)
      this.setState({daysLeft, hoursLeft, minutesLeft, secondsLeft})
    } else {
      if (this.state.onDone) {
        this.state.onDone()
      }
      this.setState({daysLeft: 0, hoursLeft: 0, minutesLeft: 0, secondsLeft: 0})
    }
  }

  render () {
    const {
      containerStyle,
      containerStyle2,
      textStyle2,
      textStyle
    } = countDownStyles

    if (this.state.upprop) {
      return (
        <View style={containerStyle2}>
          <Text style={textStyle2}>{this.state.strings.upprop}</Text>
        </View>
      )
    }
    if (this.state.karneval) {
      return (
        <View style={containerStyle2}>
          <Text style={textStyle2}>{this.state.strings.karneval}</Text>
        </View>
      )
    }
    const {daysLeft, hoursLeft, minutesLeft, secondsLeft} = this.state
    return (
      <View style={containerStyle}>
        <CountDownItem time={daysLeft}/>
        <Text style={textStyle}> : </Text>
        <CountDownItem time={hoursLeft}/>
        <Text style={textStyle}> : </Text>
        <CountDownItem time={minutesLeft}/>
        <Text style={textStyle}> : </Text>
        <CountDownItem time={secondsLeft}/>
      </View>
    )
  }
}

CountDown.propTypes = {
  endDate: PropTypes.instanceOf(Date).isRequired,
  onDone: PropTypes.func
}

export { CountDown }
