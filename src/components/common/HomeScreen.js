import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from './CustomButton';

const HomeScreen = () => (
  <View style={[styles.container1, { backgroundColor: '#FF992C' }]}>
  <View style={styles.container2}>
    <CustomButton
      text='asd'
      color='#62EFCD'
      noBorder='true'
      textColor='blue'
      underline='true'
    />
  </View>
    <Text>Logga in med ditt</Text>
    <CustomButton
      color='#62EFCD'
      text='Personnummer'
    />
    <Text>eller</Text>
    <CustomButton
      color='#62EFCD'
      text='Skapa profil'
    />
    <CustomButton
      noBorder='true'
      text='Läs mer om registreringen'
      underline='true'
      textColor='blue'
    />
  </View>
);

const styles = {
  container1: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  container2: {
    margin: 20
  }
};

export default HomeScreen;
