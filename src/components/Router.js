import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ExampleScreenOne from './screens/ExampleScreenOne';
import DropdownPickerScreen from './screens/DropdownPickerScreen';

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
  }
});

export default Router;
