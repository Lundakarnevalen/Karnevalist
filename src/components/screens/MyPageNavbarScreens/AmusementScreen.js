import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../common/Header'
import BackgroundImage from '../../common/BackgroundImage';

class AmusementsScreen extends Component {

  render() {
    return (
      <View>
        <BackgroundImage
          imagePath={require('../../../../assets/images/background2.png')}
        />
        <Header
          textStyle={{ color: '#f4376d' }}
          style={{ backgroundColor: 'white' }}
          title='Amusement'
          leftIcon={null}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

export default AmusementsScreen
