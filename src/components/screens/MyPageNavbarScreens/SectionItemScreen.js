import React, { Component } from 'react';
import { View, Alert, TouchableOpacity, Text, Dimensions, ScrollView, Platform } from 'react-native';
import { Constants } from 'expo';
import Header from '../../common/Header'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class SectionItemScreen extends Component {
  render() {
    const { navigation } = this.props
    const { title, description, image } = navigation.state.params
    return (
      <View
      style={{ flex: 1, backgroundColor: 'white' }}
      >
        <Header
        title={title}
        style={{ backgroundColor: '#8A4797' }}
        textStyle={{ fontSize: 30 }}
        navigation={navigation}
        rightIcon={
          <TouchableOpacity
           style={{ padding: 10, backgroundColor: 'red' }}
           onPress={() => Alert.alert('Tillagd')}
          >
            <Text>Lägg till</Text>
          </TouchableOpacity>
        }
        />
        <View style={[styles.container, { }]}>
          {image}
          <ScrollView style={styles.someStyle}>
            <Text style={{ fontSize: 20, margin: 4 }}>{description}</Text>
          </ScrollView>
        </View>
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
    maxHeight: Platform.os === 'ios' ? HEIGHT - WIDTH - 67.5 - 15 : HEIGHT - WIDTH - 5 - Constants.statusBarHeight,
    borderTopWidth: 4,
    borderTopColor: '#8A4797',
    marginTop: 3
  }
};

export default SectionItemScreen;
