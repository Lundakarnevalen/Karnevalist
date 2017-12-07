import React, { Component } from 'react';
import { Dimensions, Image, View } from 'react-native';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class BackgroundImage extends Component {
  render() {
    const { containerStyle, backgroundImageStyle, opacityStyle } = styles;
    return (
      <View style={containerStyle}>
        <Image
          source={this.props.imagePath}
          style={backgroundImageStyle}
        />
        <View style={opacityStyle} />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT
  },
  backgroundImageStyle: {
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute'
  },
  opacityStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute'
  }
}

export default BackgroundImage
