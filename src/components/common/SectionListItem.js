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
    const { containerStyle, titleStyle, infoStyle, continueIconIndicatorStyle } = styles;
    const { sectionTitle = '', sectionInfoText = '', sectionDate, onPress } = this.props;
    return (
      <TouchableOpacity onPress={() => onPress()} style={containerStyle}>
        <View style={{ flexDirection: 'row' }}>
          {this.renderDateView(sectionDate)}
          <View style={{ flexDirection: 'column' }}>
            <Text numberOfLines={1} style={{ maxWidth: 100 }}>
              {sectionTitle}
            </Text>
            {sectionInfoText === '' ? null : (
              <Text ellipsizeMode={'tail'} numberOfLines={1} style={infoStyle}>
                {sectionInfoText}
              </Text>
            )}
          </View>
        </View>
        <View style={justifyContent: 'flex-end'}>
          <MaterialIcons name="keyboard-arrow-right" style={continueIconIndicatorStyle} size={60} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  containerStyle: {
    height: 60,
    //backgroundColor: 'white',
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
    color: '#f4376d'
  },
  contentStyle: {
    fontSize: 14,
    marginLeft: 8
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
    color: 'white'
  },
  continueIconIndicatorStyle: {
    marginRight: 8,
    color: '#f4376d',
    backgroundColor: 'transparent'
  }
};

export default SectionListItem;
