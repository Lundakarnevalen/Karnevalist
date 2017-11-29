import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'

const SIZE = Dimensions.get('window').width / 6;

/**
 * Uppropet är den 4:e februari
 *
 */
class CountDownItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getText() {
    const { time } = this.props;
    if (time.toString().length === 1) {
      return '0' + time;
    }
    return time
  }

  render() {
    const { circleStyle, textStyle, secondCircle, thirdCircle, fourthCircle, fifthCircle, containerStyle } = styles;
    return (
      <View style={containerStyle}>
        <View style={circleStyle} />
        <View style={[circleStyle, secondCircle]} />
        <View style={[circleStyle, thirdCircle]} />
        <View style={[circleStyle, fourthCircle]} />
        <View style={[circleStyle, fifthCircle]} />
        <Text numberOfLines={1} style={textStyle}>{this.getText()}</Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleStyle: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE / 2,
    backgroundColor: '#F4376D',
    position: 'absolute',
    flexWrap: 'nowrap'
  },
  secondCircle: {
    width: SIZE * 0.8,
    height: SIZE * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (SIZE * 0.8) / 2,
    backgroundColor: '#8A4797',
    left: SIZE * 0.1,
    top: SIZE * 0.1
  },
  thirdCircle: {
    width: SIZE * 0.6,
    height: SIZE * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (SIZE * 0.6) / 2,
    backgroundColor: '#F4376D',
    left: SIZE * 0.2,
    top: SIZE * 0.2
  },
  fourthCircle: {
    width: SIZE * 0.4,
    height: SIZE * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (SIZE * 0.4) / 2,
    backgroundColor: '#8A4797',
    left: SIZE * 0.3,
    top: SIZE * 0.3
  },
  fifthCircle: {
    width: SIZE * 0.2,
    height: SIZE * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (SIZE * 0.2) / 2,
    backgroundColor: '#F4376D',
    left: SIZE * 0.4,
    top: SIZE * 0.4
  },
  textStyle: {
    fontSize: 32,
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold'

  }
}

export default CountDownItem;
