import { StackNavigator } from 'react-navigation'
import InfoRouter from './TreasureComponents/InfoScreens/InfoRouter'
import GameScreen from './TreasureComponents/GameOn/GameScreen'
import CloseGameScreen from './TreasureComponents/GameOn/CloseGameScreen'

const CardstackScreen = StackNavigator(
  {
    SwipeScreen: {
      screen: InfoRouter,
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
