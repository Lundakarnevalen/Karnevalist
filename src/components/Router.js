import { StackNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import MyPageNavbarScreen from './screens/MyPageNavbarScreen';
import SectionItemScreen from './screens/MyPageNavbarScreens/SectionItemScreen';
import SingleNewsScreen from './screens/MyPageNavbarScreens/SingleNewsScreen';
import MyProfileScreen from './screens/MyPageNavbarScreens/MyProfileScreen';
import ConfirmPage from './screens/ConfirmPage';
import RegistrationInfoScreen from './screens/RegistrationInfoScreen';
import CameraScreen from './screens/CameraScreen';

const LoggedIn = StackNavigator({
  MyPageNavbarScreen: {
    screen: MyPageNavbarScreen,
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
  ConfirmPage: {
    screen: ConfirmPage,
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
  }
});

const Register = StackNavigator({
  RegistrationScreen: {
    screen: RegistrationScreen,
    navigationOptions: {
      header: null
    }
  },
  CameraScreen: {
    screen: CameraScreen,
    navigationOptions: {
      header: null
    }
  }
});

const Router = StackNavigator(
  {
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
    MyPageNavbarScreen: {
      screen: LoggedIn,
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
