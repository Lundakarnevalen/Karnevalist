import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

class SectionListItem extends Component {

  render() {
    const { containerStyle, titleStyle, infoStyle } = styles
    return (
    <TouchableOpacity style={containerStyle}>
      <View style={{ flex: 8 }}>
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
        style={{ marginRight: 0, color: '#8A4797' }}
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
    borderBottomColor: '#8A4797',
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleStyle: {
    fontSize: 20
  },
  infoStyle: {
    fontSize: 14,
  }
};
export default SectionListItem
