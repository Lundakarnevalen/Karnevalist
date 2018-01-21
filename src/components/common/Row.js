import React, { Component } from 'react';
import {
  Animated,
  Easing,
  Text,
  Platform,
  Dimensions,
  View,
  TouchableOpacity
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const window = Dimensions.get('window');

class Row extends Component {
  constructor(props) {
    super(props);
    this._active = new Animated.Value(0);
    this._style = {
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1]
              })
            }
          ],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10]
          })
        },
        android: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07]
              })
            }
          ],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6]
          })
        }
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active)
      }).start();
    }
  }

  getInfoTextStyle() {
    return {
      fontSize: 14,
      fontFamily: 'Avenir Next Bold',
      color: '#F7A021',
      left: 0
    };
  }

  createRows(data) {
    const { indexStyle } = styles;
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          padding: 8,
          width: window.width - 16
        }}
      >
        <Text style={[indexStyle, { color: '#F7A021' }]}>{this.props.index}</Text>
        {data.rowImage}
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center'
          }}
        >
          <Text style={this.getInfoTextStyle()}>{data.text}</Text>
        </View>
        {this.getIcon()}
      </View>
    );
  }

  getIcon() {
    const { iconStyle } = styles;
    const { iconName } = this.props;
    if (iconName === 'trash') {
      return (
        <TouchableOpacity style={iconStyle} onPress={() => this.props.deleteRow()}>
          <EvilIcons name={iconName} style={{ color: '#F7A021' }} size={35} />
        </TouchableOpacity>
      );
    }
    return <EvilIcons name={iconName} style={[iconStyle, { color: '#F7A021' }]} size={35} />;
  }

  render() {
    const { data } = this.props;
    return (
      <Animated.View style={[styles.row, this._style, { borderColor: '#F7A021' }]}>
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
}

const styles = {
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    marginTop: 8,
    borderWidth: 1,
    alignSelf: 'center',
    width: window.width - 16,
    elevation: 0
  },
  indexStyle: {
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: 'Avenir Next Bold'
  },
  iconStyle: {
    alignSelf: 'center',
    position: 'absolute',
    right: 8
  }
};

export { Row };
