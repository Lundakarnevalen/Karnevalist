import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../common/Header'

class ProfileScreen extends Component {

  render() {
    return (
      <View>
        <Header
          title='Profile'
          leftIcon={null}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = ({

});

export default ProfileScreen
