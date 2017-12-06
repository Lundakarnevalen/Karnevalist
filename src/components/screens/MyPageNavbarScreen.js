import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import HomeScreen from './MyPageNavbarScreens/HomeScreen';
import SectionScreen from './MyPageNavbarScreens/SectionScreen';
import AmusementScreen from './MyPageNavbarScreens/AmusementScreen'
import NewsScreen from './MyPageNavbarScreens/NewsScreen'
import ProfileScreen from './MyPageNavbarScreens/ProfileScreen'

class MyPageNavbarScreen extends Component {
  render() {
    return (
      <TabNav
        screenProps={this.props.navigation}
      />
    )
  }
}

const TabNav = TabNavigator({
  Sections: {
    screen: SectionScreen,
    navigationOptions: {
      tabBarLabel: 'Sektioner',
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
      tabBarLabel: 'Nöjen',
      tabBarIcon: () => (
        <Ionicons
        size={30}
        name="md-happy"
        />
      )
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Hem',
      tabBarIcon: () => (
        <Ionicons
        size={30}
        name="md-home"
        />
      )
    }
  },
  News: {
    screen: NewsScreen,
    navigationOptions: {
      tabBarLabel: 'Nyheter',
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
      tabBarLabel: 'Min profil',
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
  initialRouteName: 'Home',
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#8A4797',
    labelStyle: {
      fontSize: 10
    },

    style: {
      backgroundColor: '#FBBCC0',
    },
    indicatorStyle: {
      backgroundColor: '#8A4797',
    }
  },
})
export default MyPageNavbarScreen
