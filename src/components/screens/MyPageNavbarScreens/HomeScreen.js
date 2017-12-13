import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import Header from '../../common/Header'
import CountDown from '../../common/countDown/CountDown';
import HomeScreenTimeLine from '../../common/HomeScreenTimeline'

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
class HomeScreen extends Component {

  render() {
    const { container, imageStyle } = styles
    return (
      <View style={{ flex: 1 }} >
        <Header
          textStyle={{ color: '#FBBCC0' }}
          style={{ backgroundColor: '#8A4797' }}
          title='Home'
          leftIcon={null}
          navigation={this.props.navigation}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <View style={{ marginTop: 0 }} >
            <HomeScreenTimeLine />
          </View>
          <View style={container}>
            <Image
              style={imageStyle}
              source={require('../../../../res/Monstergubbe.png')}
            />
          </View>
          <View style={{ marginTop: 15 }} >
            <CountDown />
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
    width,
    marginTop: 15
  },
  imageStyle: {
    resizeMode: 'contain',
    width: width * 0.9,
    height: height * 0.35
  }
}

export default HomeScreen
