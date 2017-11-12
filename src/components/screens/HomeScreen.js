import React from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import CustomButton from '../common/CustomButton';

const HomeScreen = () => (
  <View style={{ backgroundColor: '#FF992C', flex: 1 }}>
    <View style={styles.container2}>
      <CustomButton
        text='Change to English'
        noBorder='true'
        textColor='blue'
        underline='true'
      />
    </View>
    <View style={styles.container1}>
      <Image
        style={{
          marginBottom: Dimensions.get('window').height / 10,
          width: Dimensions.get('window').width / 2,
          height: Dimensions.get('window').width / 2
        }}
        source={require('../../../res/Karneval.png')}
      />
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
  </View>
);

const styles = {
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2: {
    flex: 0,
    margin: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
};

export default HomeScreen;
