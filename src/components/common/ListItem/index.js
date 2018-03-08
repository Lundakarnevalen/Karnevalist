import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ITEM_WIDTH, styles } from './styles';

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

const renderDateView = itemDate => {
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
  return null;
};

const getTitleStyle = itemDate => [
  styles.titleStyle,
  {
    width: itemDate === '' ? ITEM_WIDTH * 0.85 : ITEM_WIDTH * 0.7
  }
];
const getContentStyle = itemDate => [
  styles.contentStyle,
  {
    width: itemDate === '' ? ITEM_WIDTH * 0.85 : ITEM_WIDTH * 0.7
  }
];

const ListItem = ({ title, icon, infoText, itemDate, onPress }) => {
  const { containerStyle, continueIconStyle, innerContainerStyle } = styles;
  return (
    <TouchableOpacity onPress={() => onPress()} style={containerStyle}>
      <View style={{ flexDirection: 'row' }}>
        {renderDateView(itemDate)}
        <View style={innerContainerStyle}>
          <Text numberOfLines={1} style={getTitleStyle(itemDate)}>
            {icon === '' ? null : (
              <MaterialIcons name={icon} size={15} color="#F7A021" />
            )}
            {icon === '' || icon === null ? title : ` ${title}`}
          </Text>
          {infoText === '' ? null : (
            <Text numberOfLines={1} style={getContentStyle(itemDate)}>
              {infoText}
            </Text>
          )}
        </View>
      </View>
      <View>
        <MaterialIcons
          name="keyboard-arrow-right"
          style={continueIconStyle}
          color="#F7A021"
          size={icon === 'done' ? 40 : 50}
        />
      </View>
    </TouchableOpacity>
  );
};
ListItem.defaultProps = {
  title: '',
  icon: '',
  itemDate: '',
  infoText: ''
};

ListItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  itemDate: PropTypes.string,
  infoText: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

export { ListItem };
