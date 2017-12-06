import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import DropdownPickerScreen from './screens/DropdownPickerScreen';
import MyPageNavbarScreen from './screens/MyPageNavbarScreen';
import SectionItemScreen from './screens/MyPageNavbarScreens/SectionItemScreen';
import SingleNewsScreen from './screens/MyPageNavbarScreens/SingleNewsScreen';

const Router = StackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
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
  },
  DropdownPickerModal: {
    screen: DropdownPickerScreen
  },
  MyPageNavbarScreen: {
    screen: MyPageNavbarScreen,
    navigationOptions: {
      header: null,
    }
  },
  SectionItemScreen: {
    screen: SectionItemScreen,
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
})

export default Router;
