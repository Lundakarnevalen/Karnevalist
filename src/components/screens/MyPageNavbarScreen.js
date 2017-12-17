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
          <MaterialIcons
            name="star"
            color={focused ? tintColor : '#A9A9A9'}
            size={SIZE}
          />
        )
      }
    },
    SongBook: {
      screen: SongBookScreen,
      navigationOptions: {
        tabBarLabel: 'Sångbok',
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons size={SIZE} name="local-library" color={focused ? tintColor : '#A9A9A9'} />
        )
      }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Hem',
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons size={SIZE} name="home" color={focused ? tintColor : '#A9A9A9'} />
        )
      }
    },
    News: {
      screen: NewsScreen,
      navigationOptions: {
        tabBarLabel: 'Nyheter',
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons size={SIZE} name="speaker-notes" color={focused ? tintColor : '#A9A9A9'} />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Min profil',
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons size={SIZE} name="account-circle" color={focused ? tintColor : '#A9A9A9'} />
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
export default connect(null, { setSections })(MyPageNavbarScreen)
