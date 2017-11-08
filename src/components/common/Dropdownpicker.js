import React, { Component } from 'react';
import { Image, TouchableOpacity, View, Alert, Dimensions, Text } from 'react-native';

const WIDTH = Dimensions.get('window').width;

class Dropdownpicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Choose a value',
    };
  }
  setValue(value) {
    this.setState({ value })
  }

  render() {
    if (this.props.navigation) {
      return (
        <View>
          <TouchableOpacity
          style={styles.container}
            onPress={() =>
            this.props.navigation.navigate('ModalDropDownPicker',
              {
              items: this.props.items,
              setValue: (value) => this.setValue(value)
            }
          )}
          >
          <Text style={styles.textStyle}>{ this.state.value }</Text>
          <Image
            style={{ width: 50, height: 50 }}
            source={require('./images/dropdownarrow.png')}
          />
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View>
      {Alert.alert('Needs navigation as prop')}
      </View>
    )
  }
}

const styles = {
  container: {
    minWidth: WIDTH / 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 3,
    borderWidth: 1
  },
  textStyle: {
    fontSize: 20,
    textDecorationLine: 'underline'
  }
};
export default Dropdownpicker
