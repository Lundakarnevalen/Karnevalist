import React, { Component } from 'react';
import { View, ListView, Dimensions } from 'react-native';
import Header from '../../common/Header'
import SectionListItem from '../../common/SectionListItem'

const height = Dimensions.get('window').height

const newsTitles = [
  { title: 'Nyhet!', message: 'Karnevalen är igång!!!' },
  { title: 'Varning!', message: 'John behöver uppmärksamhet!' },
  { title: 'Lugna puckar', message: 'John har fått uppmärksamhet!' },
  { title: 'Ajajaj', message: 'John är borta!' },
  { title: 'Nyhet!', message: 'Karnevalen är slut!' }
]

class NewsScreen extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(newsTitles)
    }
  }

  render() {
    return (
      <View>
        <Header
          textStyle={{ color: '#FBBCC0' }}
          style={{ backgroundColor: '#8A4797' }}
          title='Nyheter'
          leftIcon={null}
          navigation={this.props.navigation}
        />
        <ListView
          style={{ height: (height - 64) }}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <SectionListItem
              sectionTitle={rowData.title}
              sectionInfoText={rowData.message}
              onPress={() =>
                this.props.screenProps.navigate(
                  'SingleNewsScreen',
                  { info:
                    { title: rowData.title, message: rowData.message }
                  }
                )
              }
            />
          }
        />
      </View>
    );
  }
}

export default NewsScreen
