import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WIDTH } from '~/src/helpers/Constants';
import { styles } from './styles';

const isDropDownButton = style => {
  if (style === 'dropDownButton') {
    return (
      <Ionicons
        style={{ position: 'absolute', right: 10 }}
        name="ios-arrow-dropdown"
        size={25}
        color={styles.standardButton.color}
      />
    );
  }
  return null;
};

const getTextStyle = style => {
  switch (style) {
    case 'textButton':
      return styles.underlineButtonText;
    case 'standardButton':
    case 'dropDownButton':
      return styles.standardButtonText;
    case 'tintStandardButton':
      return styles.tintStandardButtonText;
    case 'acceptButton':
      return styles.whiteText;
    case 'alertButton':
      return styles.whiteText;
    default:
      return styles.button;
  }
};

const getButtonStyle = style => {
  switch (style) {
    case 'textButton':
      return styles.textButton;
    case 'standardButton':
    case 'dropDownButton':
      return styles.standardButton;
    case 'tintStandardButton':
      return styles.tintStandardButton;
    case 'acceptButton':
      return styles.acceptButton;
    case 'alertButton':
      return styles.alertButton;
    default:
      return styles.button;
  }
};

const CustomButton = ({ onPress, text, width, style }) => {
  const { button } = styles;
  return (
    <TouchableOpacity
      disabled={style === 'tintStandardButton'}
      onPress={onPress}
      style={[getButtonStyle(style), button, { width }]}
    >
      <Text style={getTextStyle(style)}>{text}</Text>
      {isDropDownButton(style)}
    </TouchableOpacity>
  );
};
CustomButton.defaultProps = {
  width: WIDTH / 1.5,
  style: ''
};

CustomButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.string,
  text: PropTypes.string.isRequired,
  width: PropTypes.number
};
export { CustomButton };
