import React from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import CustomButton from '../common/CustomButton';
import ButtonChoiceManager from '../ButtonChoiceManager';

const HomeScreen = () => (
  <View style={{ backgroundColor: '#ffb3ec', flex: 1 }}>
    <View style={styles.container2}>
      <CustomButton
        text='Change to English'
        textStyle={{
          color: 'blue',
          textDecorationLine: 'underline'
        }}
        buttonStyle={{
          backgroundColor: 'transparent',
          borderWidth: 0
        }}
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
      <ButtonChoiceManager
      size={20}
      multipleChoice={false}
      alignment={'row'}
      buttonInputVector={['Ja', 'Nej']}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 20
        }}
      >
        Logga in med ditt
      </Text>
      <CustomButton
        text='Personnummer'
        textStyle={{
          color: 'white',
          fontSize: 20
        }}
        buttonStyle={{
          backgroundColor: '#e600ac',
          padding: 10,
          width: Dimensions.get('window').width / 1.5
        }}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 20
        }}
      >
        eller
      </Text>
      <CustomButton
        text='Skapa profil'
        textStyle={{
          color: 'white',
          fontSize: 20
        }}
        buttonStyle={{
          backgroundColor: '#e600ac',
          padding: 10,
          width: Dimensions.get('window').width / 1.5
        }}
      />
      <CustomButton
        text='Läs mer om registreringen'
        textStyle={{
          color: 'blue',
          textDecorationLine: 'underline'
        }}
        buttonStyle={{
          backgroundColor: 'transparent',
          borderWidth: 0
        }}
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
