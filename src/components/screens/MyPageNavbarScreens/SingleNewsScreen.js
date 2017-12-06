import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from '../../common/Header'

class NewsScreen extends Component {

  render() {
    return (
      <View>
        <Header
          textStyle={{ color: '#FBBCC0' }}
          style={{ backgroundColor: '#8A4797' }}
          title={this.props.navigation.state.params.info.title}
          navigation={this.props.navigation}
        />
        <Text>
          { this.props.navigation.state.params.info.message }
        </Text>
      </View>
    );
  }
}

export default NewsScreen
