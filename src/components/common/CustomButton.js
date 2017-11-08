import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';

const CustomButton = (props) => {
  const { width, height, onPress, color, text, noBorder, underline, textColor } = props;
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[
        styles.button,
        getWidth(width),
        getHeight(height),
        getColor(color),
        getNoBorder(noBorder)
        ]}
    >
    <Text 
      style={[getUnderline(underline), getTextColor(textColor), styles.text]}
    >
      {text}
    </Text>
  </TouchableOpacity>);
};

const getWidth = (width) => {
  if (typeof width === 'undefined') {
    return { width: Dimensions.get('window').width / 2 };
  }
  return { width };
};

const getHeight = (height) => {
  if (typeof height === 'undefined') {
    return { height: Dimensions.get('window').height / 20 };
  }
  return { height };
};

const getColor = (backgroundColor) => {
  if (typeof backgroundColor === 'undefined') {
    return { backgroundColor: 'red' };
  }
  return { backgroundColor };
};

const getNoBorder = (noBorder) => {
  if (typeof noBorder === 'undefined') {
    return { borderWidth: 2 };
  }
  return { 
    borderWidth: 0,
    backgroundColor: 'transparent'
  };
};

const getUnderline = (underline) => {
  if (typeof underline === 'undefined') {
    return { textDecorationLine: 'none' };
  }
  return { textDecorationLine: 'underline' };
};

const getTextColor = (textColor) => {
  if (typeof textColor === 'undefined') {
    return { color: 'black' };
  }
  return { color: textColor };
};

const styles = {
  button: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default CustomButton;
