import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

const WIDTH = Dimensions.get('window').width - 48;

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

class SectionListItem extends Component {
  getColor() {
    return this.props.theme === 'day' ? '#f4376d' : '#F7A021';
  }

  renderDateView(sectionDate) {
    const { dateViewStyle, dateStyle } = styles;
    const sectionDateParts = sectionDate.split('T')[0].split('-');
    const sectionDateText = sectionDateParts[2] + '\n' + months[sectionDateParts[1] - 1];
    if (sectionDate) {
      return (
        <View style={[dateViewStyle, { backgroundColor: this.getColor() }]}>
          <Text style={dateStyle}>{sectionDateText}</Text>
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
      <TouchableOpacity
        onPress={() => onPress()}
        style={[containerStyle, { borderColor: this.getColor() }]}
      >
        <View style={{ flexDirection: 'row' }}>
          {this.renderDateView(sectionDate)}
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <Text
              numberOfLines={1}
              style={[
                titleStyle,
                { width: sectionDate === '' ? WIDTH * 0.8 : WIDTH * 0.65, color: this.getColor() }
              ]}
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
          <MaterialIcons
            name="keyboard-arrow-right"
            style={continueIconIndicatorStyle}
            color={this.getColor()}
            size={60}
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
    flexDirection: 'row',
    alignItems: 'center',
    width: WIDTH,
    borderWidth: 1,
    marginTop: 10
  },
  titleStyle: {
    fontSize: 20,
    marginLeft: 8,
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
    backgroundColor: 'transparent'
  }
};

const mapStateToProps = ({ currentTheme }) => {
  const { theme } = currentTheme;
  return { theme };
};

export default connect(mapStateToProps, null)(SectionListItem);
