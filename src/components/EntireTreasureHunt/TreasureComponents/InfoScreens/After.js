import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { BackgroundImage } from '../../StolenComponents/BackgroundImage'
import { Header } from '../../StolenComponents/Header'
import { getStrings } from '../../assets/languageStrings/TREASURE_HUNT_STRINGS'
import { styles } from './InfoStyles'

export const After = ({language}) => {
  const strings = getStrings(language)
  return (<View style={styles.mainContainer}>
    <BackgroundImage/>
    <Header title={strings.treasureHunt}/>
    <View style={styles.textContainer}>
      <Text style={styles.secretHeaderText}>
        {strings.endedEvent}
      </Text>
    </View>
  </View>)
}

After.propTypes = {
  language: PropTypes.string.isRequired
}