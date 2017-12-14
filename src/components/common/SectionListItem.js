import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class SectionListItem extends Component {
  renderDateView(sectionDate) {
    const { dateViewStyle, dateStyle } = styles;
    if (sectionDate) {
      return (
        <View style={dateViewStyle}>
          <Text style={dateStyle}>{sectionDate}</Text>
        </View>
      );
    }
  }
  renderContentText(sectionContent) {
    const { contentStyle } = styles;
    if (sectionContent) {
      return (
        <Text numberOfLines={1} style={contentStyle}>
          {sectionContent}
        </Text>
      );
    }
  }

  render() {
    const { containerStyle, titleStyle } = styles;
    const { sectionTitle, sectionContent, sectionDate, onPress } = this.props;
    return (
      <TouchableOpacity onPress={() => onPress(sectionTitle)} style={containerStyle}>
        {this.renderDateView(sectionDate)}
        <View style={{ flex: 8 }}>
          <Text numberOfLines={1} style={titleStyle}>
            {sectionTitle}
          </Text>
          {this.renderContentText(sectionContent)}
        </View>
        <View style={{ flex: 1 }}>
          <MaterialIcons
            name="keyboard-arrow-right"
            style={{ marginRight: 0, color: '#8A4797' }}
            size={40}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  containerStyle: {
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: 'black',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleStyle: {
    fontSize: 20,
    paddingLeft: 8
  },
  contentStyle: {
    fontSize: 14,
    paddingLeft: 8
  },
  dateViewStyle: {
    flex: 1.3,
    height: 59,
    backgroundColor: '#8A4797',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateStyle: {
    fontSize: 16,
    color: 'white'
  }
};

export default SectionListItem;
