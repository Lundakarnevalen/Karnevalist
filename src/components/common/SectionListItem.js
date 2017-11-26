import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

class SectionListItem extends Component {

  render() {
    const { containerStyle, titleStyle, infoStyle } = styles
    return (
    <TouchableOpacity style={containerStyle}>
      <View style={{ flex: 6 }}>
        <Text style={titleStyle}>
          {this.props.sectionTitle}
        </Text>
        <Text style={infoStyle}>
          {this.props.sectionInfoText}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <MaterialIcons
        name='keyboard-arrow-right'
        style={{ marginRight: 0 }}
        size={40}
        />
      </View>
    </TouchableOpacity>
  )
  }
}

const styles = {
  containerStyle: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    flexDirection: 'row'
  },
  titleStyle: {
    color: '#8A4797',
    fontSize: 20
  },
  infoStyle: {
    fontSize: 14,
  }
};
export default SectionListItem
