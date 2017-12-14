import React, { Component } from 'react';
import { View, TouchableOpacity, Alert, Image, Dimensions, FlatList, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import Header from '../../common/Header'
import SectionListItem from '../../common/SectionListItem'
import BackgroundImage from '../../common/BackgroundImage'

const exampleArray = []

for (let i = 0; i < 25; i++) {
 exampleArray.push({
  key: i, title: 'Sektion ' + i, info: 'Kul stuff här är en text som testar hur mycket text som faktiskt får plats här. Kan nog vara ganska mycket förhoppningvis! Sök till denna sektionen om du gillar att testa att se om långa texter får plats,Kul stuff här är en text som testar hur mycket text som faktiskt får plats här. Kan nog vara ganska mycket förhoppningvis! Sök till denna sektionen om du gillar att testa att se om långa texter får platsKul stuff här är en text som testar hur mycket text som faktiskt får plats här. Kan nog vara ganska mycket förhoppningvis! Sök till denna sektionen om du gillar att testa att se om långa texter får plats,Kul stuff här är en text som testar hur mycket text som faktiskt får plats här. Kan nog vara ganska mycket förhoppningvis! Sök till denna sektionen om du gillar att testa att se om långa texter får plats'
})
}
const WIDTH = Dimensions.get('window').width

class SectionScreen extends Component {
  constructor(props) {
    super(props)
    const items = props.items || exampleArray || ['']
    this.state = {
      isOpen: false,
      data: items
    };
  }

  render() {
    const { navigation, screenProps } = this.props
    return (
      <View>
        <BackgroundImage
          imagePath={require('../../../../assets/images/background1.png')}
        />
        <View>
        <Header
          rightIcon={
            <TouchableOpacity onPress={() => this.props.screenProps.navigate('ConfirmPage')}>
              <FontAwesome name='list-alt' size={30} />
            </TouchableOpacity>}
          textStyle={{ color: '#f4376d' }}
          style={{ backgroundColor: 'white' }}
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
                contentContainerStyle={{ alignItems: 'center' }}
                onPress={() => screenProps.navigate(
                  'SectionItemScreen',
                  {
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
    paddingBottom: (Platform.OS === 'ios') ? 132 : 148,
    width: WIDTH,
    justifyContent: 'center',
    alignItems: 'center'
  },
};

export default SectionScreen
