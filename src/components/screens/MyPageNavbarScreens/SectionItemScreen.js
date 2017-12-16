import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions, ScrollView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Constants } from 'expo';
import Header from '../../common/Header';
import { saveItem, getSections } from '../../../helpers/LocalSave';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class SectionItemScreen extends Component {
  render() {
    getSections(sections => console.log('SECTIONS', sections));
    const { navigation } = this.props;
    const { title, description, image, id } = navigation.state.params;
    const { container, scrollStyle, headerStyle, textStyle } = styles;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          title={title}
          navigation={navigation}
          rightIcon={
            <TouchableOpacity
              style={{ padding: 1, backgroundColor: 'transparent' }}
              onPress={() => saveItem('sektion' + id, title)}
            >
              <MaterialIcons name="playlist-add" size={30} color={'#f4376d'} />
            </TouchableOpacity>
          }
        />
        <View style={container}>{image}</View>
        <View style={{ height: 10, backgroundColor: 'white' }} />
        <ScrollView style={scrollStyle}>
          <Text style={headerStyle}>{title}</Text>
          <Text style={textStyle}>{description}</Text>
        </ScrollView>
      </View>
    );
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
    maxHeight:
      Platform.OS === 'ios' ? HEIGHT - WIDTH - 29 : HEIGHT - WIDTH - 5 - Constants.statusBarHeight
  },
  headerStyle: {
    fontSize: 26,
    margin: 10,
    fontFamily: 'Avenir Next Bold',
    color: '#f4376d',
    backgroundColor: 'transparent'
  },
  textStyle: {
    fontSize: 16,
    margin: 10,
    fontFamily: 'Avenir Next Medium',
    backgroundColor: 'transparent'
  }
};

export default SectionItemScreen;
