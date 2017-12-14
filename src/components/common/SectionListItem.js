import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;

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

  getInfoText(sectionInfoText) {
    let text = sectionInfoText;
    if (text && text.length > 50) text = text.substring(0, 50) + '...';
    return text;
  }

  render() {
    const { containerStyle, titleStyle, infoStyle, continueIconIndicatorStyle } = styles;
    const { sectionTitle = '', sectionInfoText = '', onPress } = this.props;
    return (
      <TouchableOpacity onPress={() => onPress()} style={containerStyle}>
        <View style={{ flex: 6, margin: 3 }}>
          <Text style={titleStyle}>{sectionTitle}</Text>
          {sectionInfoText === '' ? null : (
            <Text ellipsizeMode={'tail'} numberOfLines={1} style={infoStyle}>
              {this.getInfoText(sectionInfoText)}
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
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: 'black',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    width: WIDTH - 50,
    borderWidth: 1,
    borderColor: '#f4376d',
    marginTop: 10,
    padding: 10
  },
  titleStyle: {
    fontSize: 20,
    paddingLeft: 8,
    color: '#f4376d'
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
  },
  continueIconIndicatorStyle: {
    marginRight: 0,
    color: '#f4376d',
    backgroundColor: 'transparent'
  }
};

export default SectionListItem;
