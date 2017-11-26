import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ExampleScreenOne from './screens/ExampleScreenOne';
import DropdownPickerScreen from './screens/DropdownPickerScreen';
import MyPageNavbarScreen from './screens/MyPageNavbarScreen';
import ConfirmPage from './screens/confirmPage';


const Router = StackNavigator({

  ExampleScreenOne: {
    screen: ExampleScreenOne,
    navigationOptions: {
      header: null,
    }
  },
  ConfirmPage: {
    screen: ConfirmPage,
    navigationOptions: {
      header: null,
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
