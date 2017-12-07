import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class BackgroundImage extends Component {
  render() {
    const { backgroundImageStyle } = styles
    return (
      <Image
        source={this.props.imagePath}
        style={backgroundImageStyle}
      />
    );
  }
}

const styles = {
  backgroundImageStyle: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT
  }
}

export default BackgroundImage
