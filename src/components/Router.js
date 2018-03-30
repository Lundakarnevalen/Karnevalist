import { StackNavigator } from 'react-navigation';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ConfirmPage from './screens/ConfirmPage';
import SongScreen from './screens/MyPageNavbarScreens/SongBookScreen/SongScreen';
import RegistrationInfoScreen from './screens/RegistrationInfoScreen';

import MyPageNavRouter from '~/src/components/screens/MyPageNavRouter';
import SingleNewsScreen from '~/src/components/screens/MyPageNavbarScreens/NewsScreen/SingleNewsScreen';

const LoggedIn = StackNavigator({
  MyPageNavRouter: {
    screen: MyPageNavRouter,
    navigationOptions: {
      header: null
    }
  },
  SingleNewsScreen: {
    screen: SingleNewsScreen,
    navigationOptions: {
      header: null
    }
  }
});

const Register = StackNavigator({
  RegistrationScreen: {
    screen: RegistrationScreen,
    navigationOptions: {
      header: null
    }
  }
});

const Router = StackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        header: null
      }
    },
    LoginScreen: {
      screen: LoginScreen,
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
    MyPageNavRouter: {
      screen: LoggedIn,
      navigationOptions: {
        header: null
      }
    },
    ConfirmPage: {
      screen: ConfirmPage,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default Router;
