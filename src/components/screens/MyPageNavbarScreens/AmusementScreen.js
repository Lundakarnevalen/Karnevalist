import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../common/Header'

class AmusementsScreen extends Component {

  render() {
    return (
      <View>
        <Header
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
