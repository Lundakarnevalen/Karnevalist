import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Dropdownpicker from './common/Dropdownpicker'
import ModalPicker from './common/ModalPicker'

//Poorly written examples to be removed
const HomeScreen = (props) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => props.navigation.navigate('ExampleScreenOne')}
  >
    <Text>Tryck var som för att navigera till nästa skärm!</Text>
  </TouchableOpacity>
);

const ExampleScreenOne = (props) => (
  <View style={[styles.container, { backgroundColor: 'blue' }]}>
    <Text>Man kan dra för att gå tillbaka lol!</Text>
    <Dropdownpicker navigation={props.navigation} items={['hej','bra', 'skit', '123']} />
  </View>

);

const Router = StackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  ExampleScreenOne: {
    screen: ExampleScreenOne
  },
  ModalDropDownPicker: {
    screen: ModalPicker
  }
});

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
};

export default Router;
