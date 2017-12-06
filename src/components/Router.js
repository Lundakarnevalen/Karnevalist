import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import DropdownPickerScreen from './screens/DropdownPickerScreen';
import MyPageNavbarScreen from './screens/MyPageNavbarScreen';
import SectionItemScreen from './screens/MyPageNavbarScreens/SectionItemScreen';

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
})

export default Router;
