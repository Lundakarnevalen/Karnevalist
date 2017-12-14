import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width - 48;

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
    const { containerStyle, titleStyle, contentStyle, continueIconIndicatorStyle } = styles;
    const { sectionTitle = '', sectionInfoText = '', sectionDate = '', onPress } = this.props;
    return (
      <TouchableOpacity onPress={() => onPress()} style={containerStyle}>
        <View style={{ flexDirection: 'row' }}>
          {this.renderDateView(sectionDate)}
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <Text
              numberOfLines={1}
              style={[titleStyle, { width: sectionDate === '' ? WIDTH * 0.8 : WIDTH * 0.65 }]}
            >
              {sectionTitle}
            </Text>
            {sectionInfoText === '' ? null : (
              <Text
                numberOfLines={1}
                style={[contentStyle, { width: sectionDate === '' ? WIDTH * 0.8 : WIDTH * 0.65 }]}
              >
                {sectionInfoText}
              </Text>
            )}
          </View>
        </View>
        <View>
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
    flexDirection: 'row',
    alignItems: 'center',
    width: WIDTH,
    borderWidth: 1,
    borderColor: '#f4376d',
    marginTop: 10
  },
  titleStyle: {
    fontSize: 20,
    marginLeft: 8,
    color: '#f4376d',
    backgroundColor: 'transparent'
  },
  contentStyle: {
    fontSize: 14,
    marginLeft: 8,
    backgroundColor: 'transparent'
  },
  dateViewStyle: {
    height: 60,
    width: WIDTH * 0.15,
    backgroundColor: '#f4376d',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent'
  },
  continueIconIndicatorStyle: {
    marginRight: 8,
    color: '#f4376d',
    backgroundColor: 'transparent'
  }
};

export default SectionListItem;
