import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ITEM_WIDTH, styles } from './styles';

const JodelItem = ({ title, icon, onPress, text }) => {
  const { containerStyle, innerContainerStyle, timeAndPlaceStyle, textStyle, textViewStyle } = styles;
  return (
    <TouchableOpacity onPress={() => onPress()} style={containerStyle}>
        <View style={innerContainerStyle}>
          <View style={timeAndPlaceStyle}>
            <MaterialIcons name={icon} size={15} color="white"/>
            <Text style= {styles.timeStyle}>
              {title}
            </Text>
          </View>
          <View style={textViewStyle}>
            <Text style= {textStyle}>
              {text}
            </Text>
          </View>
        </View>
    </TouchableOpacity>
  );
};

JodelItem.defaultProps = {
  title: '',
  icon: '',
};

JodelItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

export { JodelItem };
