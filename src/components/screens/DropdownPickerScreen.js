import React, { Component } from 'react';
import { TouchableOpacity, View, Text, ListView } from 'react-native';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class DropdownPickerScreen extends Component {
  constructor(props) {
    super(props)
    const items = props.navigation.state.params.items || ['']
    this.state = {
      isOpen: false,
      dataSource: ds.cloneWithRows(items),
    };
  }

  onPress(value) {
    const { onChange } = this.props.navigation.state.params;
    onChange(value)
    this.props.navigation.goBack(null);
  }

  render() {
    const { pickerItemStyle, listStyle } = this.props.navigation.state.params
    const { container, defaultItemStyle } = styles
    return (
      <View style={[container, listStyle]}>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <TouchableOpacity
          onPress={() => this.onPress(rowData)}
          >
            <Text
            style={[defaultItemStyle, pickerItemStyle]}
            >
            {rowData}
            </Text>
          </TouchableOpacity>
          }
        />
      </View>
    )
  }
}
const styles = {
  container: {
    backgroundColor: 'white'
  },
  defaultItemStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  }
};

export default DropdownPickerScreen
