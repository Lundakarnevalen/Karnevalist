import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from './CustomButton';

const ExampleScreenOne = (props) => (
  <View style={[styles.container, { backgroundColor: 'blue' }]}>
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