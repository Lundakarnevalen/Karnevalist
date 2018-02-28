import React, { Component } from 'react';
import { Platform, Dimensions, Animated, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import {
  setSections,
  setProgress,
  setHomeScreenPopover,
  setSectionPriorities
} from '../../actions';
import {  } from '../../helpers/Constants';
import FirstScreen from './TreasurehuntScreens/FirstScreen';
import SecondScreen from './TreasurehuntScreens/SecondScreen';
import ThirdScreen from './TreasurehuntScreens/ThirdScreen';
import {
} from '../../helpers/LanguageStrings';


class CardstackScreen extends Component {
  render() {
    const { navigation, language, setHomeScreenPopover, progress } = this.props;
    return <TabNav screenProps={{ navigation, language, setHomeScreenPopover, progress }} />;
  }
}

const TabNav = StackNavigator({
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

  // Detta är copy pasta
  transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
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

const mapStateToProps = ({ currentLanguage, sections, userInformation }) => {
  const { language } = currentLanguage;
  const { token, email, progress } = userInformation;
  return {
    language,
    token,
    email,
    progress,
    sections: sections.sections,
    sectionPriorities: sections.sectionPriorities
  };
};
export default connect(mapStateToProps, {
  setSections,
  setProgress,
  setHomeScreenPopover,
  setSectionPriorities
})(CardstackScreen);
