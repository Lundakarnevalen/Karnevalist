import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

const WIDTH = Dimensions.get('window').width

class SectionListItem extends Component {

  render() {
    const { containerStyle, titleStyle, infoStyle } = styles
    const { sectionTitle = '', sectionInfoText = '', onPress, } = this.props
    return (
      <TouchableOpacity
        onPress={() => onPress(sectionTitle)}
        style={containerStyle}
      >
        <View style={{ flex: 5 }}>
          <Text style={titleStyle}>
            {sectionTitle}
          </Text>
          {sectionInfoText === '' ? null : <Text style={infoStyle}>{sectionInfoText}</Text>}
        </View>
        <View style={{ flex: 1 }}>
          <MaterialIcons
            name='keyboard-arrow-right'
            style={{ marginRight: 0, color: '#f4376d' }}
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
