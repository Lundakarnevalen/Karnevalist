import React, { Component } from 'react';
import { Image, Text, View, Dimensions } from 'react-native';
import CustomButton from '../common/CustomButton';
import Input from '../common/Input';
import Header from '../common/Header';

class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alertVisible: false,
      socSecNbr: '',
      password: ''
    }
  }

  render() {
    // const { container1 } = styles
    return (
      <View>
        <Header
          textStyle={{ color: '#FBBCC0' }}
          style={{ backgroundColor: '#8A4797' }}
          title='Om registreringen'
          leftIcon={null}
          navigation={this.props.navigation}
        />

      </View>
    );
  }
}

const styles = {

};

export default HomeScreen;
