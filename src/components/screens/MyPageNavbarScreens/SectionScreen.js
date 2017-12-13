import React, { Component } from 'react';
import { View, TouchableOpacity, Alert, Image, Dimensions, FlatList, Platform, fetch } from 'react-native';
import * as axios from 'axios';
import { FontAwesome } from '@expo/vector-icons'
import Header from '../../common/Header'
import SectionListItem from '../../common/SectionListItem'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class SectionScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      data: []
    };
  }

  componentWillMount() {
    this.getSectionInfo()
  }

  getSectionInfo() {
    const url = 'http://lundakarnevalen.se/wp-json/wp/v2/lksektion/'
    axios.get(url).then((response) => {
      const sections = response.data.map(item => (
         { key: item.id, id: item.id, title: item.title.rendered, info: item.title.rendered }
      ))
      this.setState({ data: sections })
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { navigation, screenProps } = this.props
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
        <View style={styles.style}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) =>
              <SectionListItem
                sectionTitle={item.title}
                sectionInfoText={item.info}
                onPress={() => screenProps.navigate(
                  'SectionItemScreen',
                  {
                    id: item.id,
                    title: item.title,
                    description: item.info,
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
        </View >
      </View>
    );
  }
}

const styles = {
  style: {
    paddingBottom: (Platform.OS === 'ios') ? 132 : 148
  },
};

export default SectionScreen
