import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native'
import { TabNavigator } from 'react-navigation';
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { connect } from 'react-redux'
import axios from 'axios'
import { setSections } from '../../actions'
import HomeScreen from './MyPageNavbarScreens/HomeScreen';
import SectionScreen from './MyPageNavbarScreens/SectionScreen';
import AmusementScreen from './MyPageNavbarScreens/AmusementScreen'
import NewsScreen from './MyPageNavbarScreens/NewsScreen'
import ProfileScreen from './MyPageNavbarScreens/ProfileScreen'

const WIDTH = Dimensions.get('window').width

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
    return (
      <TabNav
        screenProps={this.props.navigation}
      />
    )
  }
}

const TabNav = TabNavigator({
  Sections: {
    screen: SectionScreen,
    navigationOptions: {
      tabBarLabel: 'Sektioner',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          size={30}
          name='md-information-circle'
          color={focused ? tintColor : '#A9A9A9'}
        />
      )
    }
  },
  Amusements: {
    screen: AmusementScreen,
    navigationOptions: {
      tabBarLabel: 'Nöjen',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          size={30}
          name='md-happy'
          color={focused ? tintColor : '#A9A9A9'}
        />
      )
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Hem',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          size={30}
          name='md-home'
          color={focused ? tintColor : '#A9A9A9'}
        />
      )
    }
  },
  News: {
    screen: NewsScreen,
    navigationOptions: {
      tabBarLabel: 'Nyheter',
      tabBarIcon: ({ tintColor, focused }) => (
        <FontAwesome
          size={30}
          name='newspaper-o'
          color={focused ? tintColor : '#A9A9A9'}
        />
      )
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Min profil',
      tabBarIcon: ({ tintColor, focused }) => (
        <FontAwesome
        size={30}
        name='user'
        color={focused ? tintColor : '#A9A9A9'}
        />
      )
    }
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  initialRouteName: 'Home',
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#f4376d',
    labelStyle: {
      fontSize: 10
    },
    style: {
      backgroundColor: '#ffffff',
    },
    indicatorStyle: {
      backgroundColor: '#8A4797',
    }
  },
})
export default connect(null, { setSections })(MyPageNavbarScreen)
