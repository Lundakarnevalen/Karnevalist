import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../common/Header'

class SectionScreen extends Component {

  render() {
    return (
      <View>
        <Header
          title='Sections'
          leftIcon={null}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = ({

});

export default SectionScreen
