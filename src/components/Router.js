import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ExampleScreenOne from './screens/ExampleScreenOne';
import DropdownPickerScreen from './screens/DropdownPickerScreen';
import NavbarScreen from './screens/NavbarScreen';

const Router = StackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    }
  },
  ExampleScreenOne: {
    screen: ExampleScreenOne,
    navigationOptions: {
      header: null,
    }
  },
  DropdownPickerModal: {
    screen: DropdownPickerScreen
  },
  NavbarScreen: {
    screen: NavbarScreen
  }
});

export default Router;
