import React, { Component } from 'react';
import { View, Dimensions, Text, Image } from 'react-native';
import Header from '../../common/Header'
import CustomButton from '../../common/CustomButton'
import CountDown from '../../common/countDown/CountDown';
import HomeScreenTimeLine from '../../common/HomeScreenTimeline'

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
class HomeScreen extends Component {

  render() {
    const { container, imageStyle, wehejStyle } = styles
    return (
      <View>
        <Header
          textStyle={{ color: '#FBBCC0' }}
          style={{ backgroundColor: '#8A4797' }}
          title='Home'
          leftIcon={null}
          navigation={this.props.navigation}
        />
        <View style={{ justifyContent: 'center', marginTop: 15 }}>
          <CountDown />
        </View>
        <HomeScreenTimeLine />
        <View style={container}>
          <Text style={wehejStyle}>
            Wehej!!
          </Text>
          <Image
            style={imageStyle}
            source={require('../../../../res/Monstergubbe.png')}
          />
          <CustomButton
            style='standardButton'
            text='Checka in'
          />
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
    width: width / 1.1,
    height: height / 2.3
  },
  wehejStyle: {
    fontSize: 50,
    color: '#e600ac',
  }
}

export default HomeScreen
