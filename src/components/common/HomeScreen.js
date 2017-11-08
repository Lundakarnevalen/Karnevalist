import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from './CustomButton';

const HomeScreen = () => (
  <View style={[styles.container, { backgroundColor: '#FF992C' }]}>
    <Text>Logga in med ditt</Text>
    <CustomButton
      color='#62EFCD'
      text='Personnummer'
    />
    <Text>eller</Text>
    <CustomButton
      color='#62EFCD'
      text='Skapa profil'
      noBorder='true'
      underline='true'
      textColor='blue'
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

export default HomeScreen;
