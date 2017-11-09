import React, { Component } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';

class Dropdownpicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.default || 'Choose a value',
    };
  }
  setValue(value) {
    this.setState({ value })
    this.props.onChange(value)
  }

  render() {
    const propsStyle = this.props.style || {}
    const propsImageStyle = this.props.imageStyle || {}
    if (this.props.navigation) {
      return (
        <View >
          <TouchableOpacity
          style={[styles.container, propsStyle]}
            onPress={() =>
              this.props.navigation.navigate('DropdownPickerScreen',
                {
                items: this.props.items,
                setValue: (value) => this.setValue(value),
                listStyle: this.props.listStyle,
                pickerItemStyle: this.props.pickerItemStyle
                }
              )
            }
          >
          <Text style={styles.textStyle}>{ this.state.value }</Text>
          <Image
            style={[styles.imageStyle, propsImageStyle]}
            source={require('./images/dropdownarrow.png')}
          />
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={{ borderRadius: 3 }}>
      <Text
      style={{ color: 'red', backgroundColor: 'white' }}
      >
      Dropdownpicker needs navigation as prop to work</Text>
      </View>
    )
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 3,
    borderWidth: 1,
  },
  textStyle: {
    fontSize: 20,
    textDecorationLine: 'underline'
  },
  imageStyle: {
    width: 30,
    height: 30 }
};
export default Dropdownpicker
