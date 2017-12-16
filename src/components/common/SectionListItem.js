import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;

class SectionListItem extends Component {
  render() {
    const { containerStyle, titleStyle, infoStyle, continueIconIndicatorStyle } = styles;
    const { sectionTitle = '', sectionInfoText = '', onPress } = this.props;
    return (
      <TouchableOpacity onPress={() => onPress()} style={containerStyle}>
        <View style={{ flex: 6, margin: 3 }}>
          <Text style={titleStyle}>{sectionTitle}</Text>
          {sectionInfoText === '' ? null : (
            <Text ellipsizeMode={'tail'} numberOfLines={1} style={infoStyle}>
              {sectionInfoText}
            </Text>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <MaterialIcons name="keyboard-arrow-right" style={continueIconIndicatorStyle} size={60} />
        </View>
      </TouchableOpacity>
    );
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
    fontSize: 14
  },
  continueIconIndicatorStyle: {
    marginRight: 0,
    color: '#f4376d',
    backgroundColor: 'transparent'
  }
};
export default SectionListItem;
