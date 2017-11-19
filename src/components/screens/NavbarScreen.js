import React, { Component } from 'react';
import { Image } from 'react-native'
import { TabNavigator } from 'react-navigation';
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import NavHomeScreen from './NavHomeScreen';
import SectionScreen from './SectionScreen';
import AmusementScreen from './AmusementScreen'
import NewsScreen from './NewsScreen'
import ProfileScreen from './ProfileScreen'

class NavbarScreen extends Component {
  render() {
    return (
      <TabNav />
    )
  }
}

const TabNav = TabNavigator({
  Home: {
    screen: NavHomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => (
        <Ionicons
        size={30}
        name="md-home"
        />
      )
    }
  },
  Sections: {
    screen: SectionScreen,
    navigationOptions: {
      tabBarLabel: 'Sections',
      tabBarIcon: () => (
        <Ionicons
        size={30}
        name="md-information-circle"
        />
      )
    }
  },
  Amusements: {
    screen: AmusementScreen,
    navigationOptions: {
      tabBarLabel: 'Amusements',
      tabBarIcon: () => (
        <Ionicons
        size={30}
        name="md-happy"
        />
      )
    }
  },
  News: {
    screen: NewsScreen,
    navigationOptions: {
      tabBarLabel: 'News',
      tabBarIcon: () => (
        <FontAwesome
        size={30}
        name="newspaper-o"
        />
      )
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'My profile',
      tabBarIcon: () => (
        <FontAwesome
        size={30}
        name="user"
        />
      )
    }
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#e91e63',
    labelStyle: {
      fontSize: 10
    }
  },
})
export default NavbarScreen
