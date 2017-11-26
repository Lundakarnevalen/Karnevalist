import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../common/Header'

class confirmPage extends Component {

  render() {
    return (
      <View>
        <Header
          textStyle={{ color: '#FBBCC0' }}
          style={{ backgroundColor: '#8A4797' }}
          title='Confirm section'
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
