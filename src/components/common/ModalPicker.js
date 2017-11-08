import React, { Component } from 'react';
import { TouchableOpacity, View, Text, ListView } from 'react-native';


const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class ModalPicker extends Component {
  constructor(props) {
    super(props)
    const { items } = props.navigation.state.params
    this.state = {
      value: 'default',
      isOpen: false,
      dataSource: ds.cloneWithRows(items),
    };
  }
  setValue(value) {
    const { goBack } = this.props.navigation;
    const { setValue } = this.props.navigation.state.params;
    setValue(value)
    goBack(null)
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <TouchableOpacity
          onPress={() => this.setValue(rowData)}
          >
            <Text
            style={styles.textStyle}
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

export default ModalPicker
