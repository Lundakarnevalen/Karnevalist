import MyPageNavRouter from '~/src/components/screens/MyPageNavRouter';
import SingleNewsScreen from '~/src/components/screens/MyPageNavbarScreens/NewsScreen/SingleNewsScreen';

import { StackNavigator } from 'react-navigation';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import ConfirmPage from './screens/ConfirmPage';

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
