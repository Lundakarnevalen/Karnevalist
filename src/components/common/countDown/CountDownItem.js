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
    const { containerStyle, textStyle } = styles;
    return (
      <View style={containerStyle}>
        <Text style={textStyle}>{this.getText()}</Text>
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
    fontSize: 32,
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold'

  }
}

export default CountDownItem;
