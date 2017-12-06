import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import MyPageNavbarScreen from './screens/MyPageNavbarScreen';
import SingleNewsScreen from './screens/MyPageNavbarScreens/SingleNewsScreen';

const LoggedIn = StackNavigator(
  {
    MyPageNavbarScreen: {
      screen: MyPageNavbarScreen,
      navigationOptions: {
        header: null,
      }
    },
    SingleNewsScreen: {
      screen: SingleNewsScreen,
      navigationOptions: {
        header: null,
      }
    }
  }
)

const Register = StackNavigator(
  {
    RegistrationScreen: {
      screen: RegistrationScreen,
      navigationOptions: {
        header: null
      }
    },
    ConfirmationScreen: {
      screen: ConfirmationScreen,
      navigationOptions: {
        header: null
      }
    }
  }
)

const Router = StackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    RegistrationScreen: {
      screen: Register,
      navigationOptions: {
        header: null
      }
    },
    MyPageNavbarScreen: {
      screen: LoggedIn,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
)

export default Router;
