import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { CountDown } from './index'
import { styles } from '../../TreasureComponents/InfoScreens/InfoStyles'

export const CountDownContainer = ({strings, endDate, onDone}) => {
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
      <CountDown onDone={onDone} endDate={endDate} strings={strings}/>
    </View>
  )
}

CountDownContainer.propTypes = {
  endDate: PropTypes.instanceOf(Date).isRequired,
  onDone: PropTypes.func
}

CountDownContainer.defaultProps = {
  onDone: undefined
}