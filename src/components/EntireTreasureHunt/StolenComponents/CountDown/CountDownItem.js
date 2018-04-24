import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { countDownItemStyles } from './styles'

const getText = time => {
  if (time.toString().length === 1) {
    return `0${time}`
  }
  return time
}

const CountDownItem = ({time}) => {
  const {containerStyle, textStyle} = countDownItemStyles
  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{getText(time)}</Text>
    </View>
  )
}

CountDownItem.propTypes = {
  time: PropTypes.number.isRequired
}
export { CountDownItem }
