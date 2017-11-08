import React, { Component } from 'react';
import { Modal, TouchableHighlight, TouchableOpacity, View, Alert, Dimensions, Text, ListView } from 'react-native';


const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ModalPicker extends Component {
  constructor(props) {
    super(props);
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
      <View
      style={{ backgroundColor: 'white' }}
      >
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
           <Text
              style={{
              borderBottomWidth: 2,
              textAlign: 'center',
              fontSize: 20,
              paddingTop: 10,
              paddingBottom: 10,
              }}
              onPress={() => this.setValue(rowData)}
            >
            {rowData}
            </Text>
          }
        />
      </View>
    );
  }
}

export default ModalPicker
