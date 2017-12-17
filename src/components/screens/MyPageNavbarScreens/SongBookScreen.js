import React, { Component } from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import Header from '../../common/Header';
import BackgroundImage from '../../common/BackgroundImage';

const HEIGHT = Dimensions.get('window').height;

class SongBookScreen extends Component {
  getColor() {
    return this.props.theme === 'day' ? '#f4376d' : '#F7A021';
  }

  render() {
    return (
      <View>
        <BackgroundImage pictureNumber={2} />
        <Header title="Sångbok" leftIcon={null} navigation={this.props.navigation} />
        <Text style={[styles.textStyle, { color: this.getColor() }]}>Coming soon!</Text>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold',
    fontSize: 36,
    marginTop: HEIGHT / 3
  }
};

export default SongBookScreen;
