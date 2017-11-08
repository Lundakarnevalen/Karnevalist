import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CustomButton from './common/CustomButton';
import Header from './common/Header';

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
    <Header title={'test'} />
    <CustomButton
      text='Tryck här för att gå tillbaka ;)'
      color='orange'
      onPress={() => props.navigation.navigate('HomeScreen')}
    />
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
    backgroundColor: 'green'
  },
};

export default Router;
