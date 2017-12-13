import React, { Component } from 'react';
import { View, Alert, TouchableOpacity, Text, Dimensions, ScrollView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { Constants } from 'expo';
import Header from '../../common/Header'
import { getItem, saveItem, getSections, removeItem } from '../../LocalSave'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class SectionItemScreen extends Component {
  render() {
    getSections(sections => console.log("SECIOSN",sections));
    getItem('sektion501',sections => console.log("SECIOSN",sections))
    const { navigation } = this.props
    const { title, description, image, id } = navigation.state.params
    const { container, scrollStyle } = styles
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <Header
          title={title}
          style={{ backgroundColor: '#8A4797' }}
          textStyle={{ color: '#FBBCC0' }}
          navigation={navigation}
          rightIcon={
            <TouchableOpacity
             style={{ padding: 1, backgroundColor: '#8A4797' }}
             onPress={() => removeItem('sektion' + id)}
            >
               < MaterialIcons name='playlist-add' size={30} />
            </TouchableOpacity>
          }
        />
        <View style={container}>
          {image}
        </View>
        <View style={{ height: 10, backgroundColor: '#8A4797' }} />
        <ScrollView style={scrollStyle}>
          <Text style={{ fontSize: 20, margin: 10 }}>{description}</Text>
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
  scrollStyle: {
    maxHeight: Platform.OS === 'ios' ? HEIGHT - WIDTH - 29 : HEIGHT - WIDTH - 5 - Constants.statusBarHeight,
  }
};

export default SectionItemScreen;
