import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Image } from 'react-native'
import { BackgroundImage } from '../../StolenComponents/BackgroundImage'
import { Header } from '../../StolenComponents/Header'
import { CountDownContainer } from '../../StolenComponents/CountDown/CountdownContainer'
import { startDate } from '../../assets/Constants'
import lockImage from '../../assets/images/shhhh.png'
import { getStrings } from '../../assets/languageStrings/TREASURE_HUNT_STRINGS'
import { styles } from './InfoStyles'

export const Before = ({language}) => {
  const strings = getStrings(language)
  return (<View style={styles.mainContainer}>
      <BackgroundImage/>
      <Header title={strings.secretHeader}/>
      <CountDownContainer
        strings={strings}
        endDate={startDate}
        onDone={this.startTheHunt}
      />
      <View style={styles.textContainer}>
        <Text style={styles.secretHeaderText}>
          {strings.secretEvent}
        </Text>
        <Image style={styles.lockStyle}
               source={lockImage}
        />
      </View>
    </View>
  )
}

Before.propTypes = {
  language: PropTypes.string.isRequired
}
