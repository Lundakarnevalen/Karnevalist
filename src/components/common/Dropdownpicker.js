import React, { Component } from 'react';
import { Modal, Image, TouchableOpacity, View, Alert, Dimensions, Text, ListView } from 'react-native';
import ModalPicker from './ModalPicker'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class Dropdownpicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Choose a value',
      isOpen: false,
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6']),
    };
  }
  setValue(value) {
    this.setState({ value })
  }

  render() {
    if (this.props.navigation)
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
        <Text style={styles.textStyle}>{this.state.value}</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={require('./images/dropdownarrow.png')}
        />
        </TouchableOpacity>
      </View>
    );
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
    padding: 6,
    borderWidth: 1
  },
  textStyle: {
    fontSize: 20,
    textDecorationLine: 'underline'
  }
};
export default Dropdownpicker
