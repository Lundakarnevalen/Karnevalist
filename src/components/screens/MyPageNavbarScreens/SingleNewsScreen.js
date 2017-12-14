import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import Header from '../../common/Header';

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
        <WebView source={{ uri: this.props.navigation.state.params.info.url }} />
      </View>
    );
  }
}

export default NewsScreen;
