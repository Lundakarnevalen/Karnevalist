import React, { Component } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';

class Dropdownpicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.default || 'Choose a value',
    };
  }

  onChange(value) {
    this.setState({ value })
    this.props.onChange(value)
  }

  render() {
    const { imageStyle, textStyle, items, style, pickerItemStyle, listStyle, navigation } = this.props
    const { container, defaultTextStyle, defaultImageStyle } = styles
    if (navigation) {
      return (
        <View>
          <TouchableOpacity
          style={[container, style]}
          onPress={() =>
            navigation.navigate(
              'DropdownPickerModal',
              {
                items: items,
                onChange: (value) => this.onChange(value),
                listStyle: listStyle,
                pickerItemStyle: pickerItemStyle
              }
            )
          }
          >
            <Text style={[defaultTextStyle, textStyle]}>{ this.state.value }</Text>
            <Image
              style={[defaultImageStyle, imageStyle]}
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
        Dropdownpicker needs navigation as prop to work
        </Text>
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
  defaultTextStyle: {
    fontSize: 20,
    textDecorationLine: 'underline'
  },
  defaultImageStyle: {
    width: 30,
    height: 30
  }
};
export default Dropdownpicker
