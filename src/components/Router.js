import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import ExampleScreenOne from './ExampleScreenOne';

const Router = StackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  ExampleScreenOne: {
    screen: ExampleScreenOne
  }
});

export default Router;
