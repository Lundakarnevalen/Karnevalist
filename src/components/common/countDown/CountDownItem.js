import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

const SIZE = Dimensions.get('window').width / 14;

/**
 * Uppropet är den 4:e februari
 *
 */
class CountDownItem extends Component {
  getText() {
    const { time } = this.props;
    if (time.toString().length === 1) {
      return '0' + time;
    }
    return time;
  }

  render() {
    const { containerStyle, textStyle } = styles;
    return (
      <View style={containerStyle}>
        <Text style={[textStyle, { color: 'white' }]}>{this.getText()}</Text>
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
  textStyle: {
    fontSize: 22,
    backgroundColor: 'transparent',
    color: '#f4376d',
    fontWeight: 'bold',
    fontFamily: 'Avenir Next Medium'
  }
};

export { CountDownItem };
