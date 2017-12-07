import React, { Component } from 'react';
import { View, ListView, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import Header from '../../common/Header'
import SectionListItem from '../../common/SectionListItem'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const exampleArray = []
for (let i = 0; i < 25; i++) {
 exampleArray.push({
  title: 'Sektion ' + i, info: 'Kul stuff här är en text som testar hur mycket text'
})
}
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
    return (
      <View>
        <View>
        <Header
          rightIcon={
            <TouchableOpacity onPress={() => this.props.screenProps.navigate('ConfirmPage')}>
              <FontAwesome name='list-alt' size={30} />
            </TouchableOpacity>}
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
                onPress={(title) => Alert.alert(title + '\n ' + rowData.info)}
              />
            }
          />
        </View>
      </View>
    );
  }
}

const styles = {
};

export default SectionScreen
