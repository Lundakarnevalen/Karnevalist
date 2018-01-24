import React, { Component } from 'react';
import { Dimensions, Image, View } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class BackgroundImage extends Component {
  getPath() {
    const { pictureNumber = 0 } = this.props;
    switch (pictureNumber) {
      case 1:
        return require('../../../assets/images/night1.png');
      case 2:
        return require('../../../assets/images/night2.png');
      case 3:
        return require('../../../assets/images/night3.png');
      case 4:
        return require('../../../assets/images/night4.png');
      default:
        return require('../../../assets/images/night5.png');
    }
  }

  getOpacityStyle() {
    const backgroundColor = 'rgba(0, 0, 0, 0.3)';
    return {
      backgroundColor,
      width: WIDTH,
      height: HEIGHT,
      position: 'absolute'
    };
  }

  render() {
    const { containerStyle, backgroundImageStyle } = styles;
    return (
      <View style={containerStyle}>
        <Image
          defaultSource={this.getPath()}
          source={this.getPath()}
          style={backgroundImageStyle}
        />
        <View style={this.getOpacityStyle()} />
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
  }
};

export { BackgroundImage };
