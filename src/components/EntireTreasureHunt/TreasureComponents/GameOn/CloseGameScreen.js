import React from 'react'
import PropTypes from 'prop-types'
import QRCode from 'react-native-qrcode'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { getStrings } from '../../assets/languageStrings/TREASURE_HUNT_STRINGS'
import { styles } from './CloseGameStyles'

const CloseGameScreen = ({language, email, navigation}) => {
  const strings = getStrings(language)
  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center'}}>{strings.showSture}</Text>
      <QRCode
        value={email}
        size={200}
        bgColor="black"
        fgColor="white"
      />
      <Text onPress={() => navigation.navigate('GameScreen')}>{strings.goBack}</Text>
    </View>
  )
}

CloseGameScreen.propTypes = {
  email: PropTypes.string.isRequired,
  language: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const mapStateToProps = ({userInformation, currentLanguage}) => {
  const {email} = userInformation
  const {language} = currentLanguage
  return {email, language}
}

export default connect(mapStateToProps, null)(CloseGameScreen)
