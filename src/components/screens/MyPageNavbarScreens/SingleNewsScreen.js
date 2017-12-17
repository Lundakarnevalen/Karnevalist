import React, { Component } from 'react';
import { View, WebView, Dimensions } from 'react-native';
import Header from '../../common/Header';

class NewsScreen extends Component {
  render() {
    return (
      <View
        style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}
      >
        <Header
          title={this.props.navigation.state.params.info.title}
          navigation={this.props.navigation}
        />
        <WebView source={{ uri: this.props.navigation.state.params.info.url }} />
      </View>
    );
  }
}

export default NewsScreen;
