import React, { Component } from 'react'
import QRCode from 'react-native-qrcode'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import LANGUAGE_STRINGS from './assets/languageStrings/TREASURE_HUNT_STRINGS'

class CloseGameScreen extends Component {
  getStrings () {
    const {language} = this.props
    const {fields} = LANGUAGE_STRINGS
    const strings = {}
    fields.forEach(
      field => (strings[field] = LANGUAGE_STRINGS[field][language])
    )
    return strings
  }

  render () {
    const strings = this.getStrings()
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>{strings.showSture}</Text>
        <QRCode
          value={this.props.email}
          size={200}
          bgColor="black"
          fgColor="white"
        />
        <Text onPress={() => this.props.navigation.navigate('GameScreen')}>{strings.goBack}</Text>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

const mapStateToProps = ({userInformation, currentLanguage}) => {
  const {email} = userInformation
  const {language} = currentLanguage
  return {email, language}
}

export default connect(mapStateToProps, null)(CloseGameScreen)
