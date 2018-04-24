import React from 'react'
import { StackNavigator } from 'react-navigation'
import SwipeScreen from './TreasureComponents/SwipeScreen'
import GameScreen from './TreasureComponents/GameScreen'
import CloseGameScreen from './TreasureComponents/CloseGameScreen'

const CardstackScreen = () => (
  <CardNav screenProps={new Date('April 18, 2018 00:00:01')}/>
)

const CardNav = StackNavigator(
  {
    SwipeScreen: {
      screen: SwipeScreen,
      navigationOptions: {
        header: null
      }
    },
    GameScreen: {
      screen: GameScreen,
      navigationOptions: {
        header: null
      }
    },
    CloseGameScreen: {
      screen: CloseGameScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    mode: 'modal'
  }
)

export default CardstackScreen
