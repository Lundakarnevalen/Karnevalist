import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import HomeScreen from './MyPageNavbarScreens/HomeScreen';
import SectionScreen from './MyPageNavbarScreens/SectionScreen';
import AmusementScreen from './MyPageNavbarScreens/AmusementScreen';
import NewsScreen from './MyPageNavbarScreens/NewsScreen';
import ProfileScreen from './MyPageNavbarScreens/ProfileScreen';

//TODO: Ful lösning, kanske ska göra såhär överallt dock, flytta ut till separat "theme" klass istället för redux.
const CURRENT_HOUR = new Date().getHours();
const THEME_COLOR = CURRENT_HOUR > 8 && CURRENT_HOUR < 18 ? '#f4376d' : '#F7A021';

class MyPageNavbarScreen extends Component {
  render() {
    return <TabNav screenProps={this.props.navigation} />;
  }
}

const TabNav = TabNavigator(
  {
    Sections: {
      screen: SectionScreen,
      navigationOptions: {
        tabBarLabel: 'Sektioner',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            size={30}
            name="md-information-circle"
            color={focused ? tintColor : '#A9A9A9'}
          />
        )
      }
    },
    Amusements: {
      screen: AmusementScreen,
      navigationOptions: {
        tabBarLabel: 'Nöjen',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons size={30} name="md-happy" color={focused ? tintColor : '#A9A9A9'} />
        )
      }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Hem',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons size={30} name="md-home" color={focused ? tintColor : '#A9A9A9'} />
        )
      }
    },
    News: {
      screen: NewsScreen,
      navigationOptions: {
        tabBarLabel: 'Nyheter',
        tabBarIcon: ({ tintColor, focused }) => (
          <FontAwesome size={30} name="newspaper-o" color={focused ? tintColor : '#A9A9A9'} />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Min profil',
        tabBarIcon: ({ tintColor, focused }) => (
          <FontAwesome size={30} name="user" color={focused ? tintColor : '#A9A9A9'} />
        )
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    initialRouteName: 'Home',
    tabBarOptions: {
      showIcon: true,
      activeTintColor: THEME_COLOR,
      labelStyle: {
        fontSize: 10
      },
      style: {
        backgroundColor: '#ffffff'
      },
      indicatorStyle: {
        backgroundColor: '#8A4797'
      }
    }
  }
);
export default MyPageNavbarScreen;
