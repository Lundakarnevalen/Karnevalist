import React, { Component } from 'react';
<<<<<<< HEAD
import { Image, Dimensions } from 'react-native';
=======
import { Platform } from 'react-native';
>>>>>>> edaa212a1cc18707983ecbcba5dde573a2401856
import { TabNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import axios from 'axios';
import { setSections, setSectionPriorities } from '../../actions';
import HomeScreen from './MyPageNavbarScreens/HomeScreen';
import SectionScreen from './MyPageNavbarScreens/SectionScreen';
import SongBookScreen from './MyPageNavbarScreens/SongBookScreen';
import NewsScreen from './MyPageNavbarScreens/NewsScreen';
import ProfileScreen from './MyPageNavbarScreens/ProfileScreen';
import {
  SECTION_SCREEN_STRINGS,
  NEWS_SCREEN_STRINGS,
  HOME_SCREEN_STRINGS,
  PROFILE_SCREEN_STRINGS,
  SONGBOOK_SCREEN_STRINGS
} from '../../helpers/LanguageStrings';

const THEME_COLOR = '#F7A021';
const SIZE = 30;

class MyPageNavbarScreen extends Component {
  componentWillMount() {
    if (this.props.token) this.getSectionPriorities(this.props.token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) this.getSectionPriorities(nextProps.token);
  }

  getSectionPriorities(token) {
    const url = 'https://api.10av10.com/api/section/';
    const headers = {
      Authorization: 'Bearer ' + token,
      'content-type': 'application/json'
    };
    axios
      .get(url, { headers })
      .then(response => {
        const { success, sectionPriorities } = response.data;
        if (success) {
          this.props.setSectionPriorities(sectionPriorities);
        }
      })
      .catch(error => {
        // const msg = handleErrorMsg(error.message)
        console.log(error);
      });
  }

  render() {
    const { navigation, language } = this.props;
    return <TabNav screenProps={{ navigation, language }} />;
  }
}

const TabNav = TabNavigator(
  {
    Sections: {
      screen: SectionScreen,
      navigationOptions: props => ({
        tabBarLabel: SECTION_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarInactiveTintColor: '#A9A9A9',
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons name="star" size={SIZE} color={focused ? tintColor : '#A9A9A9'} />
        )
      })
    },
    SongBook: {
      screen: SongBookScreen,
      navigationOptions: props => ({
        tabBarLabel: SONGBOOK_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons name="local-library" size={SIZE} color={focused ? tintColor : '#A9A9A9'} />
        )
      })
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: props => ({
        tabBarLabel: HOME_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons name="home" size={SIZE} color={focused ? tintColor : '#A9A9A9'} />
        )
      })
    },
    News: {
      screen: NewsScreen,
      navigationOptions: props => ({
        tabBarLabel: NEWS_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons name="speaker-notes" size={SIZE} color={focused ? tintColor : '#A9A9A9'} />
        )
      })
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: props => ({
        tabBarLabel: PROFILE_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons
            name="account-circle"
            size={SIZE}
            color={focused ? tintColor : '#A9A9A9'}
          />
        )
      })
    }
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    initialRouteName: 'Home',
    tabBarOptions: {
      showIcon: true,
      activeTintColor: THEME_COLOR,
      inactiveTintColor: '#A9A9A9',
      labelStyle: {
        fontSize: 10,
        margin: 0
      },
      iconStyle: {
        width: SIZE,
        height: SIZE
      },
      style: {
        height: Platform.OS === 'ios' ? 49 : 60,
        backgroundColor: '#ffffff'
      },
      indicatorStyle: {
        backgroundColor: THEME_COLOR
      }
    }
  }
);

const mapStateToProps = ({ currentLanguage, sections, userInformation }) => {
  const { language } = currentLanguage;
  const { token } = userInformation;
  return { language, token, sections: sections.sections };
};
export default connect(mapStateToProps, { setSections, setSectionPriorities })(MyPageNavbarScreen);
