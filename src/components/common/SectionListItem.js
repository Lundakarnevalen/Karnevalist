import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

const WIDTH = Dimensions.get('window').width

class SectionListItem extends Component {

  getInfoText(sectionInfoText) {
    let text = sectionInfoText
    if (text && text.length > 50)
      text = text.substring(0, 50) + '...'
    return text
  }

  render() {
    const { containerStyle, titleStyle, infoStyle } = styles
    const { sectionTitle = '', sectionInfoText = '', onPress, } = this.props
    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={containerStyle}
      >
        <View style={{ flex: 6, margin: 3 }}>
          <Text style={titleStyle}>
            {sectionTitle}
          </Text>
          {sectionInfoText === '' ? null : <Text style={infoStyle}>{this.getInfoText(sectionInfoText)}</Text>}
        </View>
        <View style={{ flex: 1 }}>
          <MaterialIcons
            name='keyboard-arrow-right'
            style={{ marginRight: 0, color: '#f4376d', backgroundColor: 'transparent' }}
            size={60}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = {
  containerStyle: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    width: WIDTH - 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f4376d',
    marginTop: 10,
    padding: 10
  },
  titleStyle: {
    fontSize: 20,
    color: '#f4376d'
  },
  infoStyle: {
    fontSize: 14,
  }
};
export default SectionListItem
