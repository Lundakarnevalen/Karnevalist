import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import GestureRecognizer from 'react-native-swipe-gestures'
import { NavigationActions } from 'react-navigation'
import { Header } from '../../StolenComponents/Header'
import { BackgroundImage } from '../../StolenComponents/BackgroundImage/index'
import { getStrings } from '../../assets/languageStrings/TREASURE_HUNT_STRINGS'
import { styles } from './InfoStyles'
import { endDate } from '../../assets/Constants'
import { CountDownContainer } from '../../StolenComponents/CountDown/CountdownContainer'

const ProgressButton = ({counter, value, onPress}) => (
  <Feather
    key={value}
    name={counter === value ? 'aperture' : 'circle'}
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
    <View style={styles.infoContainer}>
      <View style={styles.textContainer}>
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

export class During extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      counter: 0,
      strings: getStrings(props.language)
    }
  }

  render () {
    const {counter, strings} = this.state
    const config = {velocityThreshold: 0.3, directionalOffsetThreshold: 60}
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
          <BackgroundImage/>
          <Header title={strings.treasureHunt}/>
          <CountDownContainer
            strings={strings}
            endDate={endDate}
            onDone={this.finishTheHunt}
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
                    () => this.setState({counter: i})
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

During.propTypes = {
  language: PropTypes.string.isRequired
}
