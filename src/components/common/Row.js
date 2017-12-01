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
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import SectionListItem from '../common/SectionListItem'

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
          <Image source={{ uri: data.image }} style={styles.image} />
        </View>
        <View
          style={{
          flexDirection: 'column'
          }}
        >
          <Text style={styles.headerText}>{data.text}</Text>
          <View
            style={{
              flex: 1,
              width: window.width - (30 * 5) - 6
            }}
          >
            <Text style={styles.infoText}>{data.infoText}</Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 15
            }}
          >
            <MaterialIcons
              name='keyboard-arrow-right'
              style={{ color: '#8A4797', marginTop: (window.height / 9) / 9 }}
              size={30}
            />
          </View>
      </Animated.View>
    );
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
    padding: 1,
    height: window.height / 9,
    flex: 1,
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 1,

    ...Platform.select({
      ios: {
        width: window.width - (30 * 2),
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2,
      },

      android: {
        width: window.width - (30 * 2),
        elevation: 0,
        marginHorizontal: 30,
      },
    })
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 20,
  },

  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#222222',
  },
  infoText: {
    fontSize: 10,
    color: '#222222',
  },
});
export default Row
