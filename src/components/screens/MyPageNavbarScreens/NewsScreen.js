import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../common/Header'

class NewsScreen extends Component {

  render() {
    return (
      <View>
        <Header
          title='News'
          leftIcon={null}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = ({

});

export default NewsScreen
