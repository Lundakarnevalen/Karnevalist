import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { connect } from 'react-redux'
import GestureRecognizer from 'react-native-swipe-gestures'
import { Header } from '../StolenComponents/Header'
import { CountDown } from '../StolenComponents/CountDown/index'
import { BackgroundImage } from '../StolenComponents/BackgroundImage/index'
import { getStrings } from '../assets/languageStrings/TREASURE_HUNT_STRINGS'
import styles from './SwipeStyles'
import { endDate } from '../assets/Constants'

const ProgressButton = ({counter, value, onPress}) => (
  <Feather
    key={value}
    name={counter > value ? 'check-circle' : 'circle'}
    onPress={onPress}
    size={35}
    style={styles.navItem}
  />
)

ProgressButton.propTypes = {
  counter: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired
}

const InfoText = ({counter, strings}) => {
  const HEADERS = ['first', 'second', 'third']
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
  )
}

InfoText.propTypes = {
  counter: PropTypes.number.isRequired
}

const NextButton = ({counter, strings, onPress}) => {
  const text = counter === 2 ? strings.startButton : strings.nextButton
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.nextButton} onPress={onPress}>
        <Text style={styles.btnText}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

NextButton.propTypes = {
  counter: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired
}

const CountDownContainer = ({strings}) => {
  if (endDate - new Date() < 0) {
    return (
      <View style={styles.countDownContainer}>
        <Text style={styles.countDown}>{strings.finishedText}</Text>
      </View>
    )
  }
  return (
    <View style={styles.countDownContainer}>
      <Text style={styles.countDown}>{`${strings.timeLeft}: `}</Text>
      <CountDown endDate={endDate} strings={strings}/>
    </View>
  )
}

class SwipeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      counter: 0,
      strings: getStrings(props.language)
    }
  }

  render () {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 60
    }

    const {counter, strings} = this.state
    return (
      <GestureRecognizer
        onSwipeUp={() => {
          if (counter < 2) this.setState({counter: counter + 1})
        }}
        onSwipeDown={() => {
          if (counter > 0) this.setState({counter: counter - 1})
        }}
        config={config}
      >
        <View style={styles.mainContainer}>
          <BackgroundImage pictureNumber={5}/>
          <Header title={strings.treasureHunt}/>
          <CountDownContainer
            strings={strings}
          />
          <InfoText counter={counter} strings={strings}/>
          <View style={styles.bottomContain}>
            <NextButton
              counter={counter}
              strings={strings}
              onPress={
                counter === 2
                  ? () => this.props.navigation.navigate('GameScreen')
                  : () => this.setState({counter: counter + 1})
              }
            />
            <View style={styles.navContainer}>
              {[0, 1, 2].map(i => (
                <ProgressButton
                  key={i}
                  value={i}
                  counter={counter}
                  onPress={
                    i === 2
                      ? () => this.props.navigation.navigate('GameScreen')
                      : () => this.setState({counter: i + 1})
                  }
                />
              ))}
            </View>
          </View>
        </View>
      </GestureRecognizer>
    )
  }
}

SwipeScreen.propTypes = {
  language: PropTypes.string.isRequired
}

const mapStateToProps = ({currentLanguage}) => {
  const {language} = currentLanguage
  return {language}
}

export default connect(mapStateToProps, null)(SwipeScreen)
