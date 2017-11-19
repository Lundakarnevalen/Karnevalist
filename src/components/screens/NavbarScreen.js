import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons'
import { TabNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import ExampleScreenOne from './ExampleScreenOne';

class NavbarScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Ionicons
      size={30}
      name="md-arrow-back"
      style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    );
  }
}


const styles = ({
  icon: {
    width: 26,
    height: 26,
  },
});

const MyApp = TabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Notifications: {
    screen: ExampleScreenOne,
  },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});
export default NavbarScreen
