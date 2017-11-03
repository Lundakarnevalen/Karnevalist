import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

const HomeScreen = (props) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => props.navigation.navigate('ExampleScreenOne')}
  >
    <Text>Tryck var som för att navigera till nästa skärm!</Text>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
};

export default Router;
