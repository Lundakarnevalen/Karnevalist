import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import RegistrationPage from './screens/RegistrationPage';
import DropdownPickerScreen from './screens/DropdownPickerScreen';

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
  }
});

export default Router;
