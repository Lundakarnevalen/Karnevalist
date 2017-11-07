import React, { Component } from 'react';
import { TouchableOpacity, View, Alert, Dimensions, Text, ListView } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class Dropdownpicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'default',
      isOpen: false,
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }
//Possible to change mode in Android: dropdown or dialog

  openListView() {
    Alert.alert('Alert Title')
  }
  renderList() {
    if (this.state.isOpen) {
      return (
        <View
        style={{
          width: WIDTH,
          height: HEIGHT,
          backgroundColor: 'white',
          zIndex: 2,
          top: 0,
          left: 0,
          position: 'absolute' }}
        >
          <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
          />
        </View>);
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ isOpen: true })}>
        <Text>Press me!</Text>
        </TouchableOpacity>
        { this.renderList() }
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  }
};
export default Dropdownpicker
