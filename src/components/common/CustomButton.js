import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomButton = (props) => {
  const { onPress, text, buttonStyle, textStyle } = props;
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[
        styles.button,
        buttonStyle
      ]}
    >
    <Text 
      style={[styles.text, textStyle]}
    >
      {text}
    </Text>
  </TouchableOpacity>);
};

const styles = {
  button: {
    margin: 10,
    borderColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default CustomButton;
