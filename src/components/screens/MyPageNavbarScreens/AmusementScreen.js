import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../common/Header';
import BackgroundImage from '../../common/BackgroundImage'

class AmusementsScreen extends Component {

  render() {
    return (
      <View>
        <BackgroundImage
          imagePath={require('../../../../res/background2.png')}
        />
        <Header
          textStyle={{ color: '#FBBCC0' }}
          style={{ backgroundColor: '#FFFFFF' }}
          title='Amusement'
          leftIcon={null}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = ({

});

export default AmusementsScreen
