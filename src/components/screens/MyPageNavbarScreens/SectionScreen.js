import React, { Component } from 'react';
import { View, ListView, TouchableOpacity, Text } from 'react-native';
import Header from '../../common/Header'
import SectionListItem from '../../common/SectionListItem'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const exampleArray = []
for (let i = 0; i < 25; i++) exampleArray.push({ title:'Option ' + i, info:"Kul stuff här är en text som testar hur mycket text"})

class SectionScreen extends Component {
  constructor(props) {
    super(props)
    const items = props.items || exampleArray || ['']
    this.state = {
      isOpen: false,
      dataSource: ds.cloneWithRows(items),
    };
  }

  render() {
    const { container, defaultItemStyle } = styles
    return (
      <View>
        <View>
        <Header
          textStyle={{ color: '#FBBCC0' }}
          style={{ backgroundColor: '#8A4797' }}
          title='Sektioner'
          leftIcon={null}
          navigation={this.props.navigation}
        />
        </View>
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <SectionListItem
                sectionTitle={rowData.title}
                sectionInfoText={rowData.info}
              onPress={() => this.onPress(rowData)}
              />
            }
          />
        </View>
      </View>
    );
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

export default SectionScreen
