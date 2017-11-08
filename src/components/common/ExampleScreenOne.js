import React from 'react';
import { View } from 'react-native';
import CustomButton from './CustomButton';
import Header from './Header';

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

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
};

export default ExampleScreenOne;
