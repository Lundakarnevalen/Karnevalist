import React, { Component } from 'react';
import { View, ListView, Dimensions } from 'react-native';
import Header from '../../common/Header'
import SectionListItem from '../../common/SectionListItem'
import BackgroundImage from '../../common/BackgroundImage'

const height = Dimensions.get('window').height

const profileTitles = [
  { key: 'profile', title: 'My profile' },
  { key: 'registration', title: 'My registration' },
  { key: 'logout', title: 'Logout' }
]

class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(profileTitles)
    }
  }

  render() {
    return (
      <View>
        <BackgroundImage
          imagePath={require('../../../../res/background5.png')}
        />
        <Header
          textStyle={{ color: '#FBBCC0' }}
          style={{ backgroundColor: '#FFFFFF' }}
          title='Min profil'
          leftIcon={null}
          navigation={this.props.navigation}
        />
        <ListView
          style={{ height: (height - 64) }}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <SectionListItem
              sectionTitle={rowData.title}
              onPress={() => {
                if (rowData.key === 'profile') {
                  this.props.screenProps.navigate(
                    '',
                    { info: rowData }
                  )
                } else if (rowData.key === 'registration') {
                  this.props.screenProps.navigate(
                    '',
                    { info: rowData }
                  )
                } else if (rowData.key === 'logout') {
                  this.props.screenProps.goBack(null)
                }
              }}
            />
          }
        />
      </View>
    );
  }
}

export default ProfileScreen
