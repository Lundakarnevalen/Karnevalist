import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
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
<<<<<<< HEAD
=======

const styles = {
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold',
    fontSize: 36,
    marginTop: HEIGHT / 3
  }
};

>>>>>>> 8b782b8423497a4d32a11d5bb96c3b98744e804c
export default SongBookScreen;
