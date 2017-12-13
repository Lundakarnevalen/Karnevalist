import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

class SectionListItem extends Component {

  getInfoText(sectionInfoText) {
    let text = sectionInfoText
    if (text && text.length > 50)
      text = text.substring(0, 50) + '...'
    return text
  }

  render() {
    const { containerStyle, titleStyle, infoStyle } = styles
    const { sectionTitle, sectionInfoText, onPress, } = this.props
    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={containerStyle}
      >
        <View style={{ flex: 8, margin: 3 }}>
          <Text style={titleStyle}>
            {sectionTitle}
          </Text>
          <Text style={infoStyle}>
            {this.getInfoText(sectionInfoText)}
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
