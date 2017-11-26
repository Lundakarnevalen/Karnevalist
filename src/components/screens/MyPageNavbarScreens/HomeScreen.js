import React, { Component } from 'react';
import { View, Dimensions, Text, Image } from 'react-native';
import Header from '../../common/Header'
import CustomButton from '../../common/CustomButton'
import CountDown from '../../common/countDown/CountDown';

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
class HomeScreen extends Component {
  render() {
    const { container, imageStyle, buttonText, buttonStyle, wehejStyle } = styles
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
        <View style={container}>
          <Text style={wehejStyle}>
            Wehej!!
          </Text>
          <Image
            style={imageStyle}
            source={require('../../../../res/Monstergubbe.png')}
          />
          <CustomButton
            textStyle={buttonText}
            buttonStyle={buttonStyle}
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
  buttonText: {
   color: 'white',
   fontSize: 22
  },
  buttonStyle: {
    padding: 10,
    backgroundColor: '#e600ac',
    width: width / 1.2
  },
  wehejStyle: {
    fontSize: 50,
    color: '#e600ac',
  }
}

export default HomeScreen
