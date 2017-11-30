import React, { Component } from 'react';
import { View, ListView, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import Header from '../../common/Header'
import SectionListItem from '../../common/SectionListItem'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const exampleArray = []
for (let i = 0; i < 25; i++) exampleArray.push({
  title: 'Sektion ' + i, info: 'Kul stuff här är en text som testar hur mycket text som faktiskt får plats här. Kan nog vara ganska mycket förhoppningvis! Sök till denna sektionen om du gillar att testa att se om långa texter får plats,Kul stuff här är en text som testar hur mycket text som faktiskt får plats här. Kan nog vara ganska mycket förhoppningvis! Sök till denna sektionen om du gillar att testa att se om långa texter får plats'
})
const WIDTH = Dimensions.get('window').width
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
    const { navigation, screenProps } = this.props
    console.log(this.props);
    return (
      <View>
        <View>
        <Header
          rightIcon={
            <TouchableOpacity onPress={() => Alert.alert('Går till confirm..')}>
              <FontAwesome name='list-alt' size={30} />
            </TouchableOpacity>}
          textStyle={{ color: '#FBBCC0' }}
          style={{ backgroundColor: '#8A4797' }}
          title='Sektioner'
          leftIcon={null}
          navigation={navigation}
        />
        </View>
        <View>
          <ListView
          style={{ maxHeight: 420 }} //TODO FIX THIS HEIGHT
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <SectionListItem
                sectionTitle={rowData.title}
                sectionInfoText={rowData.info}
                onPress={(title, description) => screenProps.navigate(
                  'SectionItemScreen',
                  {
                    title,
                    description,
                    image:
                      <Image
                        style={{ width: WIDTH - 10, height: WIDTH - 50 }}
                        source={require('../../../../res/KaffeKarl.png')}
                      />
                  }
                  )
                }
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
