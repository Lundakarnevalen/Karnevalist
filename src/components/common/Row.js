import React, { Component } from 'react';
import {
  Animated,
  Easing,
  Text,
  Image,
  Platform,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

const window = Dimensions.get('window');
const size = 60;

class Row extends Component {

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },
        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

  render() {
   const { data, active } = this.props;
    return (
      <Animated.View
        style={[
          styles.row,
          this._style,
        ]}
      >
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
        {this.createRows(data)}
        </View>
      </Animated.View>
    );
  }

  getHeaderStyle() {
    const headerText = {
        fontSize: this.props.data.text.length < 10 ? 12 : 10,
        fontWeight: 'bold',
        color: '#F4376D',
        left: 0
      };
      return headerText;
  }

  createRows(data) {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          padding: 10,
          width: window.width - 20,
        }}
      >
        <Text style={styles.indexStyle}>{this.props.index}</Text>
        <Image source={{ uri: data.image }} style={styles.image} />
      <View
        style={{
          flex: 0.7,
          justifyContent: 'center',

        }}
      >
        <Text style={this.getHeaderStyle()}>{data.text}</Text>
      </View>
        <MaterialIcons
          name='drag-handle'
          style={{
            color: '#F4376D',
            alignSelf: 'center',
            position: 'absolute',
            right: 25,
          }}
          size={40}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#999999',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 0,
    height: size * 1.5,
    flex: 1,
    marginTop: 7,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: '#F4376D',
    borderRadius: 1,
    alignSelf: 'center',
    width: window.width - 40,
    elevation: 0,
  },
  image: {
    width: size,
    height: size,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: size / 2,
  },
  indexStyle: {
    alignSelf: 'center',
    fontSize: 22,

    fontWeight: 'bold',
    color: '#F4376D',
  },
  headerText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#F4376D',
    alignSelf: 'center'
  },
  infoText: {
    fontSize: 10,
    color: '#F4376D'
  },
});
export default Row
