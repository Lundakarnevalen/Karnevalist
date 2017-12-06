import React, { Component } from 'react'
import { View } from 'react-native'
import Header from '../common/Header'

class ConfirmationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View>
        <Header
          title='Confirmation'
          navigation={this.props.navigation}
        />
      </View>
    )
  }
}

export default ConfirmationScreen;
