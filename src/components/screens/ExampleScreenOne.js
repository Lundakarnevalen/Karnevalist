import React from 'react';
import { View, Alert } from 'react-native';
import CustomButton from '../common/CustomButton';
import Dropdownpicker from '../common/Dropdownpicker'


const exampleArray = []
for (let i = 0; i < 25; i++) exampleArray.push('Option ' + i)

const ExampleScreenOne = (props) => (
  <View style={[styles.container, { backgroundColor: 'blue' }]}>
    <CustomButton
      text='Tryck här för att gå tillbaka ;)'
      color='orange'
      onPress={() => props.navigation.navigate('HomeScreen')}
    />
    <Dropdownpicker
      default="This is now default"
      navigation={props.navigation}
      items={exampleArray}
      style={{ width: 250, borderRadius: 10, backgroundColor: 'lightblue' }}
      textStyle={{ color: 'black' }}
      listStyle={{ backgroundColor: 'lightgrey' }}
      pickerItemStyle={{ backgroundColor: 'white', color: 'green' }}
      onChange={(value) => Alert.alert('You chose ' + value)}
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
