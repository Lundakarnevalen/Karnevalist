import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import {
  setSections,
  setProgress,
  setPopover,
  setSectionPriorities
} from '~/src/actions';
import {
  SECTION_PRIORITY_URL,
  PROGRESS,
  WIDTH,
  IS_IOS
} from '~/src/helpers/Constants';
import HomeScreen from '~/src/components/screens/MyPageNavbarScreens/HomeScreen';
import SectionScreen from '~/src/components/screens/MyPageNavbarScreens/SectionScreen';
import SongBookScreen from '~/src/components/screens/MyPageNavbarScreens/SongBookScreen';
import SongScreen from '~/src/components/screens/MyPageNavbarScreens/SongBookScreen/SongScreen';
import SettingsScreen from '~/src/components/screens/MyPageNavbarScreens/SettingsScreen';
import SectionItemScreen from '~/src/components/screens/MyPageNavbarScreens/SectionScreen/SectionItemScreen';
import MyRegistrationScreen from '~/src/components/screens/MyPageNavbarScreens/MyRegistrationScreen';
import MyProfileScreen from '~/src/components/screens/MyPageNavbarScreens/MyProfileScreen';

import {
  SECTION_SCREEN_STRINGS,
  HOME_SCREEN_STRINGS,
  SETTINGS_SCREEN_STRINGS,
  SONGBOOK_SCREEN_STRINGS
} from '~/src/helpers/LanguageStrings';
import { fetchCheckInStatus } from '~/src/helpers/ApiManager';

const SIZE = WIDTH / 11;

class MyPageNavRouter extends Component {
  componentWillMount() {
    if (this.props.token) this.updateProgress();
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

  render() {
    const { navigation, language, setPopover, progress } = this.props;
    return (
      <TabNav screenProps={{ navigation, language, setPopover, progress }} />
    );
  }
}

const TabNav = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: props => ({
        tabBarLabel: HOME_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons
            name="home"
            size={SIZE}
            color={focused ? tintColor : '#A9A9A9'}
          />
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
    }, */
    Sections: {
      screen: StackNavigator({
        SectionScreen: {
          screen: SectionScreen,
          navigationOptions: {
            header: null
          }
        },
        SectionItemScreen: {
          screen: SectionItemScreen,
          navigationOptions: {
            header: null
          }
        }
      }),
      navigationOptions: props => ({
        tabBarOnPress: IS_IOS
          ? (scene, jumpToIndex) => {
              jumpToIndex(scene.index);
              if (props.screenProps.progress >= 2)
                props.screenProps.setPopover('homeScreenPopover', false);
            }
          : ({ scene, jumpToIndex }) => {
              jumpToIndex(scene.index);
              if (props.screenProps.progress >= 2)
                props.screenProps.setPopover('homeScreenPopover', false);
            },
        tabBarLabel: SECTION_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarInactiveTintColor: '#A9A9A9',
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons
            name="star"
            size={SIZE}
            color={focused ? tintColor : '#A9A9A9'}
          />
        )
      })
    },
    SongBook: {
      screen: StackNavigator({
        SongBookScreen: {
          screen: SongBookScreen,
          navigationOptions: {
            header: null
          }
        },
        SongScreen: {
          screen: SongScreen,
          navigationOptions: {
            header: null
          }
        }
      }),
      navigationOptions: props => ({
        tabBarOnPress: IS_IOS
          ? (scene, jumpToIndex) => {
              jumpToIndex(scene.index);
              if (props.screenProps.progress >= 2)
                props.screenProps.setPopover('homeScreenPopover', false);
            }
          : ({ scene, jumpToIndex }) => {
              jumpToIndex(scene.index);
              if (props.screenProps.progress >= 2)
                props.screenProps.setPopover('homeScreenPopover', false);
            },
        tabBarLabel: SONGBOOK_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons
            name="local-library"
            size={SIZE}
            color={focused ? tintColor : '#A9A9A9'}
          />
        )
      })
    },
    Settings: {
      screen: StackNavigator({
        SettingsScreen: {
          screen: SettingsScreen,
          navigationOptions: {
            header: null
          }
        },
        MyProfile: {
          screen: MyProfileScreen,
          navigationOptions: {
            header: null
          }
        },
        MyRegistration: {
          screen: MyRegistrationScreen,
          navigationOptions: {
            header: null
          }
        }
      }),
      navigationOptions: props => ({
        tabBarOnPress: IS_IOS
          ? (scene, jumpToIndex) => {
              jumpToIndex(scene.index);
              if (props.screenProps.progress >= 2)
                props.screenProps.setPopover('homeScreenPopover', false);
            }
          : ({ scene, jumpToIndex }) => {
              jumpToIndex(scene.index);
              if (props.screenProps.progress >= 2)
                props.screenProps.setPopover('homeScreenPopover', false);
            },
        tabBarLabel: SETTINGS_SCREEN_STRINGS.title[props.screenProps.language],
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons
            name="settings"
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

MyPageNavRouter.propTypes = {
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  sectionPriorities: PropTypes.arrayOf(PropTypes.number).isRequired,
  setProgress: PropTypes.func.isRequired,
  setSectionPriorities: PropTypes.func.isRequired,
  navigation: PropTypes.shape().isRequired,
  language: PropTypes.string.isRequired,
  setPopover: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired
};

export default connect(mapStateToProps, {
  setSections,
  setProgress,
  setPopover,
  setSectionPriorities
})(MyPageNavRouter);
