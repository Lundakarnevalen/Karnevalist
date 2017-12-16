import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import Header from '../../common/Header';
import CustomButton from '../../common/CustomButton';
import BackgroundImage from '../../common/BackgroundImage';
import CountDown from '../../common/countDown/CountDown';
import HomeScreenTimeLine from '../../common/HomeScreenTimeline';

const WIDTH = Dimensions.get('window').width;

class HomeScreen extends Component {
  render() {
    const { container } = styles;
    return (
      <View>
        <BackgroundImage imagePath={require('../../../../assets/images/day3.png')} />
        <Header
          textStyle={{ color: '#f4376d' }}
          style={{ backgroundColor: 'white' }}
          title="Home"
          leftIcon={null}
          navigation={this.props.navigation}
        />
        <View style={container}>
          <CountDown />
          <CustomButton style="standardButton" text="Checka in" />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
    width: WIDTH,
    marginTop: 15
  }
};

export default HomeScreen;
