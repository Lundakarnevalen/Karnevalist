import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

class NavHomeScreen extends Component {
  render() {
    return (
      <View style={{ marginTop: 30 }}>
      <Text>Home</Text>
      </View>
    );
  }
}


const styles = ({
  icon: {
    width: 26,
    height: 26,
  },
});

export default NavHomeScreen
