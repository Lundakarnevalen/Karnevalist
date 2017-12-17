import React, { Component } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { connect } from 'react-redux';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class BackgroundImage extends Component {
  getPath() {
    const { theme, pictureNumber = 0 } = this.props;
    /*
    TODO: Bug in current version of react native doesn't allow us to do this solution atm.
          When we update, we should do this solution instead of the long ugly one beneath.
    const imagePath = '../../../assets/images/' + theme + pictureNumber + '1.png';
    */
    switch (theme) {
      case 'morning':
        switch (pictureNumber) {
          case 1:
            return require('../../../assets/images/morning1.png');
          case 2:
            return require('../../../assets/images/morning2.png');
          case 3:
            return require('../../../assets/images/morning3.png');
          case 4:
            return require('../../../assets/images/morning4.png');
          default:
            return require('../../../assets/images/morning5.png');
        }
      case 'day':
        switch (pictureNumber) {
          case 1:
            return require('../../../assets/images/day1.png');
          case 2:
            return require('../../../assets/images/day2.png');
          case 3:
            return require('../../../assets/images/day3.png');
          case 4:
            return require('../../../assets/images/day4.png');
          default:
            return require('../../../assets/images/day5.png');
        }
      default:
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
  }

  getOpacityStyle() {
    let backgroundColor;
    if (this.props.theme === 'day') {
      backgroundColor = 'rgba(255, 255, 255, 0.7)';
    } else {
      backgroundColor = 'rgba(255, 255, 255, 0.3)';
    }
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
        <Image source={this.getPath()} style={backgroundImageStyle} />
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

const mapStateToProps = ({ currentTheme }) => {
  const { theme } = currentTheme;
  return { theme };
};

export default connect(mapStateToProps, null)(BackgroundImage);
