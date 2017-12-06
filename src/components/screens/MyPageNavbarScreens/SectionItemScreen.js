import React, { Component } from 'react';
import { View, Alert, TouchableOpacity, Text, Dimensions, ScrollView, Platform, Image } from 'react-native';
import { MaterialIcons} from '@expo/vector-icons'
import { Constants } from 'expo';
import Header from '../../common/Header'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

class SectionItemScreen extends Component {
  render() {
    console.log(Platform.OS);
    const { navigation } = this.props
    const { title, description, image } = navigation.state.params
    return (
      <View
      style={{ flex: 1, backgroundColor: 'white' }}
      >
        <Header
        title={title}
        style={{ backgroundColor: '#8A4797' }}
        textStyle={{ color: '#FBBCC0' }}
        navigation={navigation}
        rightIcon={
          <TouchableOpacity
           style={{ padding: 1, backgroundColor: '#8A4797' }}
           onPress={() => Alert.alert('Tillagd')}
          >
             < MaterialIcons name='playlist-add' size={30} />
          </TouchableOpacity>
        }
        />
        <View style={[styles.container, {}]}>
          {image}
        </View>
        <View style={{height: 10, backgroundColor: '#8A4797'}}/>
        <ScrollView style={styles.someStyle}>
          <Text style={{ fontSize: 20, margin: 4 }}>{description}</Text>
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  container: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width
  },
  someStyle: {
    maxHeight: Platform.OS === 'ios' ? HEIGHT - WIDTH - 32 : HEIGHT - WIDTH - 5 - Constants.statusBarHeight,
  }
};

export default SectionItemScreen;
