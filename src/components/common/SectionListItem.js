import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width - 16;

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
    return '#F7A021';
  }

  renderDateView(sectionDate) {
    const { dateViewStyle, dateStyle } = styles;
    const sectionDateParts = sectionDate.split('T')[0].split('-');
    if (sectionDate) {
      return (
        <View style={[dateViewStyle, { backgroundColor: this.getColor() }]}>
          <Text style={dateStyle}>{sectionDateParts[2]}</Text>
          <Text style={dateStyle}>{months[sectionDateParts[1] - 1]}</Text>
        </View>
      );
    }
  }

  render() {
    const { containerStyle, titleStyle, contentStyle, continueIconIndicatorStyle } = styles;
    const {
      sectionTitle = '',
      sectionIcon = '',
      sectionInfoText = '',
      sectionDate = '',
      onPress
    } = this.props;
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
                { width: sectionDate === '' ? WIDTH * 0.85 : WIDTH * 0.7, color: this.getColor() }
              ]}
            >
              {sectionIcon === '' ? null : (
                <MaterialIcons name={sectionIcon} size={15} color={this.getColor()} />
              )}
              {sectionIcon === '' || sectionIcon === null ? sectionTitle : ' ' + sectionTitle}
            </Text>
            {sectionInfoText === '' ? null : (
              <Text
                numberOfLines={1}
                style={[contentStyle, { width: sectionDate === '' ? WIDTH * 0.85 : WIDTH * 0.7 }]}
              >
                {sectionInfoText}
              </Text>
            )}
          </View>
        </View>
        <View>
          <MaterialIcons
            name={'keyboard-arrow-right'}
            style={continueIconIndicatorStyle}
            color={this.getColor()}
            size={this.props.icon === 'done' ? 40 : 50}
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
    marginTop: 8
  },
  titleStyle: {
    fontSize: 20,
    marginLeft: 8,
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Medium'
  },
  contentStyle: {
    fontSize: 14,
    marginLeft: 8,
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Medium',
    color: '#333'
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
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold'
  },
  continueIconIndicatorStyle: {
    backgroundColor: 'transparent'
  }
};

export { SectionListItem };
