import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';

const CustomButton = (props) => {
  const { width, height, onPress, color, text } = props;
  return (<TouchableOpacity
    onPress={onPress}
    style={[styles.container, getWidth(width), getHeight(height), getColor(color)]}
  >
    <Text>{text}</Text>
  </TouchableOpacity>);
};

const getWidth = (width) => {
  if (typeof width === 'undefined') {
    return { width: Dimensions.get('window').width };
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
  if (typeof color === 'undefined') {
    return { backgroundColor: 'red' };
  }
  return { backgroundColor };
};

const styles = {
  container: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default CustomButton;
