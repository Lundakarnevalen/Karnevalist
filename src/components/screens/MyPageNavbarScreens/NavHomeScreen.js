import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../common/Header'

class NavHomeScreen extends Component {

  render() {
    return (
      <View>
        <Header
          title='Home'
          leftIcon={null}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = ({

});

export default NavHomeScreen
