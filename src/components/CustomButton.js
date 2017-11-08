import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';

const CustomButton = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.container, getWidth(props.width), getHeight(props.height), getColor(props.color)]}
  >
    <Text>{props.text}</Text>
  </TouchableOpacity>
);

const getWidth = (width) => {
  if (typeof width === 'undefined') {
    return {width: Dimensions.get('window').width};
  }
  return {width: width};
};

const getHeight = (height) => {
  if (typeof height === 'undefined') {
    return {height: Dimensions.get('window').height/20};
  }
  return {height: height};
};

const getColor = (color) => {
  if (typeof color === 'undefined') {
    return {backgroundColor: 'red'};
  }
  return {backgroundColor: color};
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