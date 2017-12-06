import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import CustomButton from '../common/CustomButton';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Header from '../common/Header';

class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alertVisible: false,
      socSecNbr: '',
      password: ''
    }
  }

  render() {
    const { titelTextStyle, container, containerStyle, line } = styles
    const { sectionTitle, onPress, } = this.props
    return (
      <View>
        <Header
          textStyle={{ color: '#FBBCC0' }}
          style={{ backgroundColor: '#8A4797' }}
          title='Om registreringen'
          navigation={this.props.navigation}
        />

        <View style={container}>
          <Text style={titelTextStyle}>
            3 enkla steg för att bli
          </Text>
          <Text style={titelTextStyle}>
            Karnevalist
          </Text>

          <TouchableOpacity
            onPress={() => Alert.alert('Information om detta steget')}
            style={containerStyle}
          >
            <View style={{ flex: 1 }}>
              <MaterialCommunityIcons
                name="numeric-1-box-outline"
                style={{ marginRight: 0, color: '#8A4797' }}
                size={120}
                hej={sectionTitle}
              />
            </View>
          </TouchableOpacity>

          <View style={line} />

          <TouchableOpacity
            onPress={() => Alert.alert('Information om detta steget')}
            style={containerStyle}
          >
            <View style={{ flex: 1 }}>
              <MaterialCommunityIcons
                name="numeric-2-box-outline"
                style={{ marginRight: 0, color: '#8A4797' }}
                size={120}
                hej={sectionTitle}
              />
            </View>
          </TouchableOpacity>

          <View style={line} />

          <TouchableOpacity
            onPress={() => Alert.alert('Information om detta steget')}
            style={containerStyle}
          >
            <View style={{ flex: 1 }}>
              <MaterialCommunityIcons
                name="numeric-3-box-outline"
                style={{ marginRight: 0, color: '#8A4797' }}
                size={120}
                hej={sectionTitle}
              />
            </View>
          </TouchableOpacity>

          <CustomButton
            style='standardButton'
            text='Jag förstår'
            onPress={() => {
              this.props.navigation.goBack(null)
            }}
          />

        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    height: 130,
    width: 330,
    // borderBottomWidth: 10,
    // borderBottomColor: '#FBBCC0',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBBCC0',
  },
  line: {
    height: 10,
    backgroundColor: '#FBBCC0'
  },
  container: {
    alignItems: 'center',
    marginTop: 15
  },
  titelTextStyle: {
    fontSize: 30
  }
};

export default HomeScreen;
