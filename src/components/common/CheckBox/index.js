import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';

const CheckBox = ({ size, color, name, onPress, value }) => (
    <TouchableOpacity style={styles.checkBoxStyle} onPress={onPress}>
      <MaterialIcons
        name={value ? 'check-box' : 'check-box-outline-blank'}
        size={size}
        color={color}
        style={{ backgroundColor: 'transparent' }}
      />
      <Text style={[styles.textStyle, { color }]}>{name}</Text>
    </TouchableOpacity>
  );

CheckBox.defaultProps = {
  color: null,
  name: ''
};

CheckBox.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  value: PropTypes.bool.isRequired
};
export { CheckBox };
