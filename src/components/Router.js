import { StackNavigator } from 'react-navigation';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import MyPageNavRouter from './screens/MyPageNavRouter';
import SectionItemScreen from './screens/MyPageNavbarScreens/SectionScreen/SectionItemScreen';
import SingleNewsScreen from './screens/MyPageNavbarScreens/SingleNewsScreen';
import MyProfileScreen from './screens/MyPageNavbarScreens/MyProfileScreen';
import MyRegistrationScreen from './screens/MyPageNavbarScreens/MyRegistrationScreen';
import ConfirmPage from './screens/ConfirmPage';
import SongScreen from './screens/MyPageNavbarScreens/SongScreen';
import RegistrationInfoScreen from './screens/RegistrationInfoScreen';

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
  },
  SongScreen: {
    screen: SongScreen,
    navigationOptions: {
      header: null
    }
  },
  SectionItemScreen: {
    screen: SectionItemScreen,
    navigationOptions: {
      header: null
    }
  },
  MyProfile: {
    screen: MyProfileScreen,
    navigationOptions: {
      header: null
    }
  },
  MyRegistration: {
    screen: MyRegistrationScreen,
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
