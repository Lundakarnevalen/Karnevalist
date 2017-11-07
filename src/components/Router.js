import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CheckBox from './common/CheckBox';

//Poorly written examples to be removed
const HomeScreen = (props) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => props.navigation.navigate('ExampleScreenOne')}
  >
    <Text>Tryck var som för att navigera till nästa skärm!</Text>
    <CheckBox title='Testing Checking' />
  </TouchableOpacity>
);

const ExampleScreenOne = () => (
  <View style={[styles.container, { backgroundColor: 'blue' }]}>
    <Text>Man kan dra för att gå tillbaka lol!</Text>
  </View>
);

const Router = StackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  ExampleScreenOne: {
    screen: ExampleScreenOne
  }
});

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
};

export default Router;
