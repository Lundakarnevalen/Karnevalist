import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../common/Header'
import CustomButton from '../../common/CustomButton'

class HomeScreen extends Component {

  render() {
    return (
      <View>
        <Header
          title='Home'
          leftIcon={null}
          navigation={this.props.navigation}
        />
        <CustomButton />
      </View>
    );
  }
}

const styles = ({

});

export default HomeScreen
