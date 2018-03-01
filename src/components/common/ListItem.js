import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { WIDTH } from '../../helpers/Constants';

const ITEM_WIDTH = WIDTH - 16
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

class ListItem extends Component {

  renderDateView(itemDate) {
    const { dateViewStyle, dateStyle } = styles;
    const dateParts = itemDate.split('T')[0].split('-');
    if (itemDate) {
      return (
        <View style={dateViewStyle}>
          <Text style={dateStyle}>{dateParts[2]}</Text>
          <Text style={dateStyle}>{months[dateParts[1] - 1]}</Text>
        </View>
      );
    }
  }

  render() {
    const { containerStyle, titleStyle, contentStyle, continueIconIndicatorStyle } = styles;
    const {
      title = '',
      icon = '',
      infoText = '',
      itemDate = '',
      onPress
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={containerStyle}
      >
        <View style={{ flexDirection: 'row' }}>
          {this.renderDateView(itemDate)}
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <Text
              numberOfLines={1}
              style={[
                titleStyle,
                { width: itemDate === '' ? ITEM_WIDTH * 0.85 : ITEM_WIDTH * 0.7 }
              ]}
            >
              {icon === '' ? null : (
                <MaterialIcons name={icon} size={15} color={'#F7A021'} />
              )}
              {icon === '' || icon === null ? title : ' ' + title}
            </Text>
            {infoText === '' ? null : (
              <Text
                numberOfLines={1}
                style={[contentStyle, { width: itemDate === '' ? ITEM_WIDTH * 0.85 : ITEM_WIDTH * 0.7 }]}
              >
                {infoText}
              </Text>
            )}
          </View>
        </View>
        <View>
          <MaterialIcons
            name={'keyboard-arrow-right'}
            style={continueIconIndicatorStyle}
            color={'#F7A021'}
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
    width: ITEM_WIDTH,
    borderWidth: 1,
    marginTop: 8,
    borderColor: '#F7A021'
  },
  titleStyle: {
    fontSize: 20,
    marginLeft: 8,
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Medium',
    color: '#F7A021'
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
    width: ITEM_WIDTH * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7A021'
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

export { ListItem };
