import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
            <Ionicons
            style={[defaultImageStyle, imageStyle]}
            name="ios-arrow-dropdown-circle"
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
    padding: 5,
    fontSize: 27
  },

};
export default Dropdownpicker
