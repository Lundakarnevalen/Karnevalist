import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import CustomButton from '../common/CustomButton';

const HomeScreen = (props) => (
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
    <TouchableOpacity
    style={{ height: 50, backgroundColor: 'green' }}
    onPress={() => props.navigation.navigate('ExampleScreenOne')}
    >
   <Text>Tryck här för att navigera till nästa skärm!</Text>
   </TouchableOpacity>
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
