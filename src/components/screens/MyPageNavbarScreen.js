import React, { Component } from 'react';
import { Platform, Dimensions } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  setSections,
  setSectionPriorities,
  setProgress,
  setHomeScreenPopover
} from '../../actions';
import { SECTION_PRIORITY_URL, PROGRESS } from '../../helpers/Constants';
import HomeScreen from './MyPageNavbarScreens/HomeScreen';
import SectionScreen from './MyPageNavbarScreens/SectionScreen';
import SongBookScreen from './MyPageNavbarScreens/SongBookScreen';
import NewsScreen from './MyPageNavbarScreens/NewsScreen';
import SettingsScreen from './MyPageNavbarScreens/SettingsScreen';
import {
  SECTION_SCREEN_STRINGS,
  NEWS_SCREEN_STRINGS,
  HOME_SCREEN_STRINGS,
  SETTINGS_SCREEN_STRINGS,
  SONGBOOK_SCREEN_STRINGS
} from '../../helpers/LanguageStrings';

const SIZE = Dimensions.get('window').width / 11;

class MyPageNavbarScreen extends Component {
  componentWillMount() {
    if (this.props.token) this.getSectionPriorities(this.props.token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) this.getSectionPriorities(nextProps.token);
  }

  getSectionPriorities(token) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'content-type': 'application/json'
    };
    axios
      .get(SECTION_PRIORITY_URL, { headers })
      .then(response => {
        const { success, sectionPriorities } = response.data;
        if (success) {
          this.props.setSectionPriorities(sectionPriorities);
          if (sectionPriorities.length > 0) this.props.setProgress(PROGRESS.SENT_SECTIONS);
        }
      })
      .catch(error => {
        // const msg = handleErrorMsg(error.message)
        console.log(error);
      });
  }

  render() {
    const { navigation, language, setHomeScreenPopover } = this.props;
    return <TabNav screenProps={{ navigation, language, setHomeScreenPopover }} />;
  }
}

const TabNav = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: props => ({
        tabBarLabel: HOME_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons name="home" size={SIZE} color={focused ? tintColor : '#A9A9A9'} />
        )
      })
    },
    /*
    //TODO: When we got better suppoert for showing one news this should be uncommented
    News: {
      screen: NewsScreen,
      navigationOptions: props => ({
        tabBarLabel: NEWS_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarOptions: {
          labelStyle: {
            fontSize: 10
          }
        },
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons name="speaker-notes" size={SIZE} color={focused ? tintColor : '#A9A9A9'} />
        )
      })
    },*/
    Sections: {
      screen: SectionScreen,
      navigationOptions: props => ({
        tabBarOnPress:
          Platform.OS === 'ios'
            ? (scene, jumpToIndex) => {
                jumpToIndex(scene.index);
                props.screenProps.setHomeScreenPopover(false);
              }
            : ({ scene, jumpToIndex }) => {
                jumpToIndex(scene.index);
                props.screenProps.setHomeScreenPopover(false);
              },
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
        tabBarOnPress:
          Platform.OS === 'ios'
            ? (scene, jumpToIndex) => {
                jumpToIndex(scene.index);
                props.screenProps.setHomeScreenPopover(false);
              }
            : ({ scene, jumpToIndex }) => {
                jumpToIndex(scene.index);
                props.screenProps.setHomeScreenPopover(false);
              },
        tabBarLabel: SONGBOOK_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons name="local-library" size={SIZE} color={focused ? tintColor : '#A9A9A9'} />
        )
      })
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: props => ({
        tabBarOnPress:
          Platform.OS === 'ios'
            ? (scene, jumpToIndex) => {
                jumpToIndex(scene.index);
                props.screenProps.setHomeScreenPopover(false);
              }
            : ({ scene, jumpToIndex }) => {
                jumpToIndex(scene.index);
                props.screenProps.setHomeScreenPopover(false);
              },
        tabBarLabel: SETTINGS_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons name="settings" size={SIZE} color={focused ? tintColor : '#A9A9A9'} />
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
      activeTintColor: '#F7A021',
      inactiveTintColor: '#A9A9A9',
      labelStyle: {
        fontSize: 8,
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
        backgroundColor: '#F7A021'
      }
    }
  }
);

const mapStateToProps = ({ currentLanguage, sections, userInformation }) => {
  const { language } = currentLanguage;
  const { token } = userInformation;
  return { language, token, sections: sections.sections };
};
export default connect(mapStateToProps, {
  setSections,
  setSectionPriorities,
  setProgress,
  setHomeScreenPopover
})(MyPageNavbarScreen);
