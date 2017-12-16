import React, { Component } from 'react';
import { Dimensions, Text } from 'react-native';
import { BlurView } from 'expo';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
let interval;
/**
 * Loading class with redirect.
 * If redirect isn't needed redirect should be set to null.
 */
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedPercent: 0
    };
  }

  componentWillMount() {
    interval = setInterval(() => this.countTo99(), 15);
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  countTo99() {
    if (this.props.loadingComplete && this.state.loadedPercent === 99) {
      this.props.redirect();
      clearInterval(interval);
    } else if (this.state.loadedPercent < 99) {
      this.setState({ loadedPercent: ++this.state.loadedPercent });
    }
  }

  render() {
    const { containerStyle, headerStyle } = styles;
    return (
      <BlurView style={containerStyle}>
        <Text style={headerStyle}>LOADING {this.state.loadedPercent.toString()}%</Text>
      </BlurView>
    );
  }
}

const styles = {
  containerStyle: {
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    position: 'absolute',
    padding: 20,
    height: HEIGHT
  },
  headerStyle: {
    fontFamily: 'Avenir Next Medium',
    fontSize: 36,
    color: 'rgb(138, 71, 151)',
    backgroundColor: 'transparent'
  }
};

export default Loading;
