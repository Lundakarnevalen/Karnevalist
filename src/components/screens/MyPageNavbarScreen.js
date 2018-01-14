import React, { Component } from 'react';
import { Image, Dimensions, Platform } from 'react-native';
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
const WIDTH = Dimensions.get('window').width;

class MyPageNavbarScreen extends Component {
  componentWillMount() {
    this.getSectionInfo();
  }

  getImage(url, section) {
    const tempSection = section;
    axios
      .get(url)
      .then(r => {
        const image = (
          <Image
            style={{ width: WIDTH - 10, height: WIDTH - 50 }}
            source={{ uri: r.data.source_url }}
            //defaultSource={require('../../../../res/LK2018logga.png')}
          />
        );
        tempSection.imguri = r.data.source_url;
        tempSection.image = image;
        this.props.setSections(tempSection);
        return tempSection;
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
          info: strippedContent
        };
        this.getImage(imgUrl, section);
      });
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
