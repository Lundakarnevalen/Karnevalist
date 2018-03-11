import React, { Component } from 'react';
import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import {
  setSections,
  setProgress,
  setHomeScreenPopover,
  setSectionPriorities
} from '../../actions';
import {
  SECTION_PRIORITY_URL,
  PROGRESS,
  WIDTH,
  IS_IOS
} from '../../helpers/Constants';
import HomeScreen from './MyPageNavbarScreens/HomeScreen';
import SectionScreen from './MyPageNavbarScreens/SectionScreen';
import SongBookScreen from './MyPageNavbarScreens/SongBookScreen';
import SettingsScreen from './MyPageNavbarScreens/SettingsScreen';
import {
  SECTION_SCREEN_STRINGS,
  HOME_SCREEN_STRINGS,
  SETTINGS_SCREEN_STRINGS,
  SONGBOOK_SCREEN_STRINGS
} from '../../helpers/LanguageStrings';
import { fetchCheckInStatus } from '../../helpers/ApiManager';

const SIZE = WIDTH / 11;

class MyPageNavbarScreen extends Component {
  componentWillMount() {
    if (this.props.token) this.updateProgress();
  }

  updateProgress() {
    const { email, token } = this.props;
    fetchCheckInStatus(
      email,
      token,
      checkedInStatus => {
        if (checkedInStatus === true) {
          this.props.setProgress(PROGRESS.CHECK_IN);
          if (this.props.sectionPriorities.length > 4) {
            this.props.setProgress(PROGRESS.CHOOSE_SECTIONS);
          }
          this.getSectionPriorities(token);
        }
      },
      null
    );
  }

  getSectionPriorities(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    };
    axios
      .get(SECTION_PRIORITY_URL, { headers })
      .then(response => {
        const { success, sectionPriorities } = response.data;
        if (success) {
          if (sectionPriorities.length > 0) {
            this.props.setProgress(PROGRESS.SENT_SECTIONS);
            this.props.setSectionPriorities(sectionPriorities);
          }
        }
      })
      .catch(error => {
        // const msg = handleErrorMsg(error)
        console.log(error);
      });
  }
  render() {
    const { navigation, language, setHomeScreenPopover, progress } = this.props;
    return (
      <TabNav
        screenProps={{ navigation, language, setHomeScreenPopover, progress }}
      />
    );
  }
}

const navigate = (scene, jumpToIndex, props) => {
  jumpToIndex(scene.index);
  if (props.screenProps.progress >= 2)
    props.screenProps.setHomeScreenPopover(false);
};

const namedTabBarIcon = name => {
  const tabBarIcon = ({ tintColor, focused }) => (
    <MaterialIcons
      name={name}
      size={SIZE}
      color={focused ? tintColor : '#A9A9A9'}
    />
  );
  return tabBarIcon;
};

const TabNav = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: props => ({
        tabBarLabel: HOME_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarIcon: namedTabBarIcon('home')
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
    }, */
    Sections: {
      screen: SectionScreen,
      navigationOptions: props => ({
        tabBarOnPress: IS_IOS
          ? (scene, jumpToIndex) => {
              navigate(scene, jumpToIndex, props);
            }
          : ({ scene, jumpToIndex }) => {
              navigate(scene, jumpToIndex, props);
            },
        tabBarLabel: SECTION_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarInactiveTintColor: '#A9A9A9',
        tabBarIcon: namedTabBarIcon('star')
      })
    },
    SongBook: {
      screen: SongBookScreen,
      navigationOptions: props => ({
        tabBarOnPress: IS_IOS
          ? (scene, jumpToIndex) => {
              navigate(scene, jumpToIndex, props);
            }
          : ({ scene, jumpToIndex }) => {
              navigate(scene, jumpToIndex, props);
            },
        tabBarLabel: SONGBOOK_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarIcon: namedTabBarIcon('local-library')
      })
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: props => ({
        tabBarOnPress: IS_IOS
          ? (scene, jumpToIndex) => {
              navigate(scene, jumpToIndex, props);
            }
          : ({ scene, jumpToIndex }) => {
              navigate(scene, jumpToIndex, props);
            },
        tabBarLabel: SETTINGS_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarIcon: namedTabBarIcon('settings')
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
        height: IS_IOS ? 49 : 60,
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
})(MyPageNavbarScreen);
