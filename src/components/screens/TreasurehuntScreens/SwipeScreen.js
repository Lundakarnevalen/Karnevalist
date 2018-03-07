import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import GestureRecognizer from 'react-native-swipe-gestures'
import { Header, BackgroundImage, CountDown, CustomButton } from '../../common'
import { HEIGHT, WIDTH, IS_IOS } from '../../../helpers/Constants'
import { TREASURE_HUNT_SCREEN_STRINGS } from '../../../helpers/LanguageStrings'

class SwipeScreen extends Component {
  state = {
    counter: 0
  }

  getStrings () {
    const {language} = this.props
    const {fields} = TREASURE_HUNT_SCREEN_STRINGS
    const strings = {}
    fields.forEach(field => (strings[field] = TREASURE_HUNT_SCREEN_STRINGS[field][language]))
    return strings
  }

  renderProgressButton (counter, value) {
    return (
      <MaterialIcons
        name={'face'}
        size={45}
        style={{backgroundColor: 'transparent', color: counter === value ? 'white' : 'black'}}
      />
    )
  }

  renderInfoText (counter, styles, strings) {
    if (counter < 0 || counter > 2) {
      return
    }
    let textInt = ''
    switch (counter) {
      case 0:
        textInt = 'first'
        break
      case 1:
        textInt = 'second'
        break
      case 2:
        textInt = 'third'
        break
    }
    return (
      <View style={styles.container}>
        <Text style={styles.infoHeaderStyle}>{strings[textInt + 'Header']}</Text>
        <Text style={styles.infoTextStyle}>{strings[textInt + 'Body']}</Text>
      </View>)
  }

  render () {
    const strings = this.getStrings()
    const {
      mainContainer,
      textStyle, container,
      buttonContainer,
      countDownContainer,
      infoTextStyle,
      infoHeaderStyle,
      progressButtonsStyle,
      startButtonStyle
    } = styles
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 60
    }

    const {counter} = this.state
    return (
      <GestureRecognizer
        onSwipeUp={() => { if (counter < 2) this.setState({counter: counter + 1}) }}
        onSwipeDown={() => { if (counter > 0) this.setState({counter: counter - 1}) }}
        config={config}
      >
        <View style={mainContainer}>
          <BackgroundImage pictureNumber={1}/>
          <Header title={strings.treasureHunt}/>
          <View style={countDownContainer}>
            <Text style={textStyle}>{strings.timeLeft + ': '}</Text>
            <CountDown endDate={this.props.screenProps.endDate}/>
          </View>
          {this.renderInfoText(counter, styles, strings)}
          {counter === 2 ? <View style={startButtonStyle}>
            <CustomButton
              style={'standardButton'}
              onPress={() => this.props.navigation.navigate('GameScreen')}
              text={strings.startButton}
            />
          </View> : null}
          <View style={[progressButtonsStyle, {marginTop: counter === 2 ? 0 : 66}]}>
            {this.renderProgressButton(counter, 0)}
            {this.renderProgressButton(counter, 1)}
            {this.renderProgressButton(counter, 2)}
          </View>
        </View>
      </GestureRecognizer>
    )
  }
}

const styles = {
  mainContainer: {
    height: HEIGHT - (IS_IOS ? 113 : 135), width: WIDTH
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  countDownContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    color: 'white',
    fontSize: 22
  },
  infoHeaderStyle: {
    flex: 1,
    textAlign: 'center',
    flexWrap: 'wrap',
    color: 'white',
    fontSize: 40,
  },
  infoTextStyle: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: 'white',
    fontSize: 22,
  },
  progressButtonsStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  startButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
}
const mapStateToProps = ({currentLanguage}) => {
  const {language} = currentLanguage
  return {language}
}

export default connect(mapStateToProps, null)(SwipeScreen)
