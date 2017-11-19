import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Button,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

class SectionScreen extends Component {


  render() {
    return (
    <View style={{ marginTop: 30 }}>
      <Text> Sections</Text>
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

export default SectionScreen
