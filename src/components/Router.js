import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ExampleScreenOne from './screens/ExampleScreenOne';
import DropdownPickerScreen from './screens/DropdownPickerScreen';

const Router = StackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  ExampleScreenOne: {
    screen: ExampleScreenOne
  },
  DropdownPickerScreen: {
      screen: DropdownPickerScreen
    }
});

export default Router;
