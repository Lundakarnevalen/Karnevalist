import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import MyPageNavbarScreen from './screens/MyPageNavbarScreen';
import SectionItemScreen from './screens/MyPageNavbarScreens/SectionItemScreen';
import SingleNewsScreen from './screens/MyPageNavbarScreens/SingleNewsScreen';
import ConfirmPage from './screens/ConfirmPage';
import RegistrationInfoScreen from './screens/RegistrationInfoScreen';

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
    },
    ConfirmPage: {
      screen: ConfirmPage,
      navigationOptions: {
        header: null
      }
    },
    SectionItemScreen: {
      screen: SectionItemScreen,
      navigationOptions: {
        header: null,
      }
    },

  }
)

const Register = StackNavigator(
  {
    RegistrationScreen: {
      screen: RegistrationScreen,
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
    RegistrationInfo: {
      screen: RegistrationInfoScreen,
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
