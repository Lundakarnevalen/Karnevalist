import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import RegistrationPage from './screens/RegistrationPage';
import DropdownPickerScreen from './screens/DropdownPickerScreen';
import MyPageNavbarScreen from './screens/MyPageNavbarScreen';

const Router = StackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  RegistrationPage: {
    screen: RegistrationPage,
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
})

export default Router;
