import React from 'react';
import { View, Alert, TouchableOpacity, Text, Dimensions } from 'react-native';
import CustomButton from '../common/CustomButton';
import Dropdownpicker from '../common/Dropdownpicker'
import Header from '../common/Header'

const exampleArray = []
for (let i = 0; i < 25; i++) exampleArray.push('Option ' + i)

const ExampleScreenOne = (props) => (
  <View
  style={{ flex: 1,
    backgroundColor: 'green'
    }}
  >
    <Header
    title='Example Screen'
    navigation={props.navigation}
    rightIcon={
      <TouchableOpacity
       onPress={() => Alert.alert('Alert')}
       style={{ padding: 10, backgroundColor: 'red' }}
      >
        <Text>Alert</Text>
      </TouchableOpacity>
    }
    />
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
        style={{ width: 225, borderRadius: 10, backgroundColor: 'lightblue' }}
        textStyle={{ color: 'black' }}
        listStyle={{ backgroundColor: 'lightgrey' }}
        pickerItemStyle={{ backgroundColor: 'white', color: 'green' }}
        imageStyle={{ paddingLeft: 10, color: 'blue', fontSize: 25 }}
        onChange={(value) => Alert.alert('You chose ' + value)}
      />
    </View>
  </View>
);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    width: Dimensions.get('window').width
  },
};

export default ExampleScreenOne;
