import React, { Component } from 'react'
import { View, ListView, Text, Dimensions } from 'react-native'
import Header from '../common/Header'

const height = Dimensions.get('window').height

const newsTitles = [
  'Karnevalen är igång!',
  'John behöver uppmärksamhet!',
  'John har fått uppmärksamhet!',
  'John är borta!',
  'Karnevalen är slut!'
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
    const { cellStyle } = styles;
    return (
      <View>
        <Header
          title='News'
          navigation={this.props.navigation}
        />
        <ListView
          style={{ height: (height - 64) }}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={cellStyle}>
              <Text>
                {rowData}
              </Text>
            </View>
          }
        />
      </View>
    )
  }
}

const styles = {
  cellStyle: {
    paddingTop: 32,
    paddingRight: 16,
    paddingBottom: 64,
    paddingLeft: 16
  }
}

export default NewsScreen
