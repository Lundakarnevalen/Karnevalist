import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { CountDown } from './index'
import { styles } from '../../TreasureComponents/InfoScreens/InfoStyles'

export const CountDownContainer = ({strings, endDate}) => {
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

CountDownContainer.propTypes = {
  endDate: PropTypes.instanceOf(Date).isRequired
}

CountDownContainer.defaultProps = {
  onDone: undefined
}