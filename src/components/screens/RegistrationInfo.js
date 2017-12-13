import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, TouchableHighlight, Animated, ScrollView } from 'react-native';
import CustomButton from '../common/CustomButton';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Header from '../common/Header';
import ExpandeblePanel from '../common/ExpandeblePanel';


class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alertVisible: false,
      socSecNbr: '',
      password: '',
      animation: new Animated.Value(),
      expanded: false
    }
  }

  toggle() {
    //Step 1
    let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
        finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
        expanded: !this.state.expanded  //Step 2
    });

    this.state.animation.setValue(initialValue);  //Step 3
    Animated.spring(     //Step 4
        this.state.animation,
        {
            toValue: finalValue
        }
    ).start();  //Step 5
  }

  setMaxHeight(event) {
    this.setState({
        maxHeight: event.nativeEvent.layout.height
    });
  }

  setMinHeight(event) {
    this.setState({
        minHeight: event.nativeEvent.layout.height
    });
  }

  render() {
    const { titelTextStyle, container, containerStyle, line, rows, one, body, button, buttonImage, title, container1, titleContainer, container4 } = styles

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

          <ScrollView>
            <ExpandeblePanel title="Skapa profil">
              <Text>Första steget är att skp en profil,
                antingen här eller på Karnevalist.se.
                När du skapat en profil tilldelas du ett profil-ID
                som du använder vid incheckning under uppropsdagen.
              </Text>
            </ExpandeblePanel>
          </ScrollView>


          <TouchableOpacity
            onPress={() => Alert.alert('Information om detta steget')}
            style={containerStyle}
          >
            <View style={rows}>
              <MaterialCommunityIcons
                name="numeric-1-box-outline"
                style={one}
                size={140}
              />
              <Text style={{ fontSize: 20, textAlign: 'center', color: 'brown', flex: 3 }}>
                Skapa Profil
              </Text>
            </View>
          </TouchableOpacity>

          <View style={line} />

          <TouchableOpacity
            onPress={() => Alert.alert('Information om detta steget')}
            style={containerStyle}
          >
            <View style={rows}>
              <MaterialCommunityIcons
                name="numeric-2-box-outline"
                style={{ marginRight: 0, color: 'grey', flex: 4, backgroundColor: 'transparent' }}
                size={140}
              />
              <Text style={{ fontSize: 20, textAlign: 'center', color: 'grey', flex: 3 }}>
                Kom på uppropet och välj sektion
              </Text>
            </View>
          </TouchableOpacity>

          <View style={line} />

          <TouchableOpacity
            onPress={() => Alert.alert('Information om detta steget')}
            style={containerStyle}
          >
            <View style={rows}>
              <MaterialCommunityIcons
                name="numeric-3-box-outline"
                style={{ marginRight: 0, color: 'orange', flex: 4, backgroundColor: 'transparent' }}
                size={140}
              />
              <Text style={{ fontSize: 20, textAlign: 'center', color: 'orange', flex: 3 }}>
                Skicka din ansökan
              </Text>
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
  rows: {
    flexDirection: 'row',
    width: 280,
    alignItems: 'center',
    marginTop: 10,
  },
  one: {
    marginRight: 0,
    color: 'brown',
    flex: 4,
    backgroundColor: 'transparent',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  containerStyle: {
    height: 130,
    width: 330,
    // borderBottomWidth: 10,
    // borderBottomColor: '#FBBCC0',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBBCC0',
    borderRadius: 10,
  },
  line: {
    height: 10,
    backgroundColor: '#FBBCC0'
  },
  container: {
    alignItems: 'center',
    marginTop: 15,
  },
  container4: {
    flex            : 1,
    backgroundColor : '#f4f7f9',
    paddingTop      : 30
  },
  titelTextStyle: {
    fontSize: 30
  },
  container1: {
    backgroundColor: '#fff',
    margin:10,
    overflow:'hidden'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    padding: 10,
    color:'#2a2f43',
    fontWeight:'bold'
  },
  button: {

  },
  buttonImage: {
    width: 30,
    height: 25
  },
  body: {
    padding: 10,
    paddingTop: 0
  }
};

export default HomeScreen;
