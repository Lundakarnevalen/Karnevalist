import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableHighlight } from 'react-native';
import CustomButton from '../common/CustomButton';
import SuperAgileAlert from '../common/SuperAgileAlert';

class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alertVisible: false
    }
  }

  render() {
    return (
  <View style={{ backgroundColor: '#ffbbcc', flex: 1 }}>

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
    <SuperAgileAlert
    header={'Header'}
    info={'Här skriver du in din info...'}
    alertVisible={this.state.alertVisible}
    buttonsIn={[{ text: 'Yes', onPress: () => console.log('Yes was pressed') },
      { text: 'Cancel', onPress: () => this.setState({ alertVisible: false }) },
      { text: 'Later', onPress: () => this.setState({ alertVisible: false }) }]}

    />
    <TouchableHighlight
      onPress={() => {
                  this.setState({ alertVisible: true });
             }}
    >
         <Text>Show Modal</Text>
       </TouchableHighlight>
      <Image
        style={{
          marginBottom: Dimensions.get('window').height / 10,
          width: Dimensions.get('window').width / 2,
          height: Dimensions.get('window').width / 2
        }}
        source={require('../../../res/Karneval.png')}
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
          backgroundColor: '#f4376d',
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
          backgroundColor: '#f4376d',
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
}
}

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
