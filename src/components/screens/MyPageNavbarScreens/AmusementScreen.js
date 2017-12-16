import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../common/Header';
import BackgroundImage from '../../common/BackgroundImage';

class AmusementsScreen extends Component {
  render() {
    return (
      <View>
        <BackgroundImage pictureNumber={2} />
        <Header title="Amusement" leftIcon={null} navigation={this.props.navigation} />
      </View>
    );
  }
}

export default AmusementsScreen;
