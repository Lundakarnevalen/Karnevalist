import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SwipeScreen from './TreasurehuntScreens/SwipeScreen';
import GameScreen from './TreasurehuntScreens/GameScreen';
import CloseGameScreen from './TreasurehuntScreens/CloseGameScreen';

class CardstackScreen extends Component {
  render() {
    const endDate = new Date('April 18, 2018 00:00:01');
    return <CardNav screenProps={{ endDate }} />;
  }
}

const CardNav = StackNavigator(
  {
    SwipeScreen: {
      screen: SwipeScreen,
      navigationOptions: {
        header: null
      }
    },
    GameScreen: {
      screen: GameScreen,
      navigationOptions: {
        header: null
      }
    },
    CloseGameScreen: {
      screen: CloseGameScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    mode: 'modal'

    // This is copy paste, the standard android transission looks weird
    // transitionConfig: () => ({
    //     transitionSpec: {
    //       duration: 300,
    //       easing: Easing.out(Easing.poly(4)),
    //       timing: Animated.timing,
    //     },
    //     screenInterpolator: sceneProps => {
    //       const { layout, position, scene } = sceneProps;
    //       const { index } = scene;
    //
    //       const width = layout.initHeight;
    //       const translateY = position.interpolate({
    //         inputRange: [index - 1, index, index + 1],
    //         outputRange: [width, 0, 0],
    //       });
    //
    //       const opacity = position.interpolate({
    //         inputRange: [index - 1, index - 0.99, index],
    //         outputRange: [0, 1, 1],
    //       });
    //
    //       return { opacity, transform: [{ translateY }] };
    //     },
    //   }),
  }
);

export default CardstackScreen;
