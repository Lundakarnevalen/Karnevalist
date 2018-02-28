import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../../common';
import { HEIGHT, WIDTH } from '../../../helpers/Constants'

class ThirdScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Header title={'Third'} />
        <Text>Imthe MyComponent component</Text>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
            <MaterialIcons
              name={'keyboard-arrow-left'}
              size={30}
              style={{ backgroundColor: 'transparent' }}
            />
            </TouchableOpacity>
            </View>
          </View>
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    height: HEIGHT - (Platform.OS === 'ios' ? 113 : 135), width: WIDTH
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
}
export default ThirdScreen
