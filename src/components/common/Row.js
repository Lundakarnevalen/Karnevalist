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

  createRows(data) {
    return (
      <View
      style={{
        flexDirection: 'row',
        flex: 1,
        width: window.width - (30 * 2)
      }}
      >
      <View
      style={{
        justifyContent: 'center'
        }}
      >
        <Text style={styles.headerText}>{this.props.index}</Text>
      </View>

      <Image source={{ uri: data.image }} style={styles.image} />

      <View
      style={{
        flexDirection: 'column',
        marginRight: 32,
        flex: 1
      }}
      >
      <Text style={styles.headerText}>{data.text}</Text>

      <Text style={styles.infoText}>{data.infoText}</Text>


      </View>

      <MaterialIcons
      name='keyboard-arrow-right'
      style={{
        color: '#8A4797',
        position: 'absolute',
        marginTop: (window.height / 5) / 9,
        right: 2
      }}
      size={30}
      />

      </View>

    )
  }
}

const styles = StyleSheet.create({

  title: {
    fontSize: 20,
    paddingVertical: 10,
    color: '#999999',
  },

  row: {
    flexDirection: 'row',
    backgroundColor: '#F4376D',
    padding: 0,
    height: window.height / 9,
    flex: 1,
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 1,

    ...Platform.select({
      ios: {
        width: window.width - (30 * 2),

      },

      android: {
        width: window.width - (30 * 2),
        elevation: 0,
        marginHorizontal: 30,
      },
    })
  },

  image: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 25,
  },

  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  infoText: {
    fontSize: 10,
    color: '#ffffff'
  },
});
export default Row
