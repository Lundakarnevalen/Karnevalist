import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomButton = (props) => (
  <TouchableOpacity
    style={[styles.container, { width: props.width, height: props.height }]}
  >
    <Text>{props.text}</Text>
  </TouchableOpacity>
);

const styles = {
  container: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
};

export default CustomButton;