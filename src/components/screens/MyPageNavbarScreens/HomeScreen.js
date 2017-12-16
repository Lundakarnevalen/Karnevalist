import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import Header from '../../common/Header';
import CustomButton from '../../common/CustomButton';
import BackgroundImage from '../../common/BackgroundImage';
import CountDown from '../../common/countDown/CountDown';

const WIDTH = Dimensions.get('window').width;

class HomeScreen extends Component {
  render() {
    const { container } = styles;
    return (
      <View>
        <BackgroundImage pictureNumber={3} />
        <Header title="Home" leftIcon={null} navigation={this.props.navigation} />
        <View style={container}>
          <CountDown />
          <CustomButton
            style="standardButton"
            text="Confirm your sections"
            onPress={() => this.props.screenProps.navigate('ConfirmPage')}
          />
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
