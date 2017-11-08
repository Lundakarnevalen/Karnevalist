import { StackNavigator } from 'react-navigation';
import HomeScreen from './common/HomeScreen';
import ExampleScreenOne from './common/ExampleScreenOne';

const Router = StackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  ExampleScreenOne: {
    screen: ExampleScreenOne
  }
});

export default Router;
