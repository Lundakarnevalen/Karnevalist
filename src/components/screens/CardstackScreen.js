import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation';
import FirstScreen from './TreasurehuntScreens/FirstScreen';
import SecondScreen from './TreasurehuntScreens/SecondScreen';
import ThirdScreen from './TreasurehuntScreens/ThirdScreen';

class CardstackScreen extends Component {
  render() {
    return <CardNav />;
  }
}

const CardNav = StackNavigator({
  First: {
    screen: FirstScreen,
    navigationOptions: {
      header: null
    }
  },
  Second: {
    screen: SecondScreen,
    navigationOptions: {
      header: null
    }
  },
  Third: {
    screen: ThirdScreen,
    navigationOptions: {
      header: null
    }
  },
},
{
  mode: 'card',

  // This is copy paste, the standard android transission looks weird
  transitionConfig: () => ({
      transitionSpec: {
        duration: 100,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const width = layout.initWidth;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateX }] };
      },
    }),
  }
);


export default CardstackScreen
