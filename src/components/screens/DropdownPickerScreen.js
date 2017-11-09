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
    const { goBack } = this.props.navigation;
    const { onChange } = this.props.navigation.state.params;
    onChange(value)
    goBack(null)
  }

  render() {
    const { params } = this.props.navigation.state
    const propsItemStyle = params.pickerItemStyle || {}
    const propsStyle = params.listStyle || {}
    return (
      <View style={[styles.container, propsStyle]}>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <TouchableOpacity
          onPress={() => this.onPress(rowData)}
          >
            <Text
            style={[styles.textStyle, propsItemStyle]}
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
  textStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  }
};

export default DropdownPickerScreen
