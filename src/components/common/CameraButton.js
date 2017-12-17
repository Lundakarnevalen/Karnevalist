import React, { Component } from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

const SIZE = Dimensions.get('window').width * 0.6;
/**
 * Loading class with redirect.
 * If redirect isn't needed redirect should be set to null.
 */
class CameraButton extends Component {
  getColor() {
    switch (this.props.theme) {
      case 'day':
        return 'rgb(138, 71, 151)';
      case 'morning':
        return '#F7A021';
      default:
        return 'white';
    }
  }

  render() {
    const { containerStyle, textStyle } = styles;
    return (
      <TouchableOpacity style={[containerStyle, { borderColor: this.getColor() }]}>
        <Text style={[textStyle, { color: this.getColor() }]}>Take</Text>
        <Text style={[textStyle, { color: this.getColor() }]}>Your</Text>
        <Text style={[textStyle, { color: this.getColor() }]}>Picture</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  containerStyle: {
    width: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: SIZE,
    borderWidth: 1,
    alignSelf: 'center',
    margin: 25
  },
  textStyle: {
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold',
    textAlign: 'center',
    fontSize: 24
  }
};

const mapStateToProps = ({ currentTheme }) => {
  const { theme } = currentTheme;
  return { theme };
};

export default connect(mapStateToProps, null)(CameraButton);
