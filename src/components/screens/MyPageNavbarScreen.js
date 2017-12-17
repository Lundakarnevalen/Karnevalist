import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native'
import { TabNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import axios from 'axios'
import { setSections } from '../../actions'
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
 } from '../../helpers/LangStrings'

//TODO: Ful lösning, kanske ska göra såhär överallt dock, flytta ut till separat "theme" klass istället för redux.
const CURRENT_HOUR = new Date().getHours();
const THEME_COLOR = CURRENT_HOUR > 8 && CURRENT_HOUR < 18 ? '#f4376d' : '#F7A021';

const WIDTH = Dimensions.get('window').width
const SIZE = 30

class MyPageNavbarScreen extends Component {

  componentWillMount() {
    this.getSectionInfo()
  }

  getImage(url, section) {
    const tempSection = section
    axios.get(url).then(r => {
        const image = (
          <Image
            style={{ width: WIDTH - 10, height: WIDTH - 50 }}
            source={{ uri: r.data.source_url }}
            //defaultSource={require('../../../../res/LK2018logga.png')}
          />
        );
        tempSection.imguri = r.data.source_url
        tempSection.image = image;
        this.props.setSections(tempSection)
        return tempSection
      })
      .catch(error => {
        console.error(error);
      });
  }

  getSectionInfo() {
    const url = 'http://lundakarnevalen.se/wp-json/wp/v2/lksektion/';
    axios.get(url).then(response => {
      response.data.forEach(item => {
        const strippedContent = item.content.rendered.replace(/(<([^>]+)>)/gi, '');
        const imgId = item.featured_media;
        const imgUrl = 'http://lundakarnevalen.se/wp-json/wp/v2/media/' + imgId;
        const section = {
          key: item.id,
          id: item.id,
          title: item.title.rendered,
          info: strippedContent,
        };
        this.getImage(imgUrl, section)
      });
    })
  }

  render() {
    const { navigation, lang } = this.props
    return <TabNav screenProps={{ navigation, lang }} />;
  }
}

const TabNav = TabNavigator(
  {
    Sections: {
      screen: SectionScreen,
      navigationOptions: props => ({
        tabBarLabel: SECTION_SCREEN_STRINGS.title[props.screenProps.lang],
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
      screen: SongBookScreen,
      navigationOptions: props => ({
        tabBarLabel: SONGBOOK_SCREEN_STRINGS.title[props.screenProps.lang],
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons
            name="local-library"
            size={SIZE}
            color={focused ? tintColor : '#A9A9A9'}
          />
        )
      })
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: props => ({
        tabBarLabel: HOME_SCREEN_STRINGS.title[props.screenProps.lang],
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons
            name="home"
            size={SIZE}
            color={focused ? tintColor : '#A9A9A9'}
          />
        )
      })
    },
    News: {
      screen: NewsScreen,
      navigationOptions: props => ({
        tabBarLabel: NEWS_SCREEN_STRINGS.title[props.screenProps.lang],
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons
            name="speaker-notes"
            size={SIZE}
            color={focused ? tintColor : '#A9A9A9'}
          />
        )
      })
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: props => ({
        tabBarLabel: PROFILE_SCREEN_STRINGS.title[props.screenProps.lang],
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
      labelStyle: {
        fontSize: 10,
        margin: 0,
      },
      iconStyle: {
        width: SIZE,
        height: SIZE,
      },
      style: {
        height: 60,
        backgroundColor: '#ffffff',
      },
      indicatorStyle: {
        backgroundColor: THEME_COLOR
      }
    }
  }
);

const mapStateToProps = ({ currentLang }) => {
  const { lang } = currentLang
  return { lang };
};
export default connect(mapStateToProps, { setSections })(MyPageNavbarScreen)
