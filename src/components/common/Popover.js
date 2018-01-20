import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import PulsatingView from './PulsatingView';

class Popover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  zIndexWorkaround = val => {
    return Platform.select({
      ios: { zIndex: val },
      android: { elevation: val }
    });
  };

  renderBubble() {
    const {
      talkBubbleSquareBig,
      talkBubbleSquareSmall,
      talkBubbleTopRight,
      talkBubbleBottomLeft,
      talkBubbleTriangleTopRight,
      talkBubbleTriangleBottomLeft,
      textStyle
    } = styles;
    if (!this.state.isVisible) {
      return <View />;
    }
    if (this.props.type === 'bottomLeft')
      return (
        <TouchableOpacity
          onPress={() => this.setState({ isVisible: false })}
          style={[talkBubbleBottomLeft, this.zIndexWorkaround(1000)]}
        >
          <PulsatingView animate>
            <View animate style={this.props.big ? talkBubbleSquareBig : talkBubbleSquareSmall}>
              <Text style={textStyle}>{this.props.text}</Text>
            </View>
            <View style={talkBubbleTriangleBottomLeft} />
          </PulsatingView>
        </TouchableOpacity>
      );
    if (this.props.type === 'topRight')
      return (
        <TouchableOpacity
          onPress={() => this.setState({ isVisible: false })}
          style={[talkBubbleTopRight, this.zIndexWorkaround(1000)]}
        >
          <PulsatingView animate>
            <View style={talkBubbleTriangleTopRight} />
            <View animate style={this.props.big ? talkBubbleSquareBig : talkBubbleSquareSmall}>
              <Text style={textStyle}>{this.props.text}</Text>
            </View>
          </PulsatingView>
        </TouchableOpacity>
      );

    return <View />;
  }

  render() {
    return this.renderBubble();
  }
}

const styles = {
  talkBubbleTopRight: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 72,
    left: 152
  },
  talkBubbleTriangleTopRight: {
    width: 0,
    height: 0,
    left: 160,
    marginBottom: -20,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#333'
  },
  talkBubbleBottomLeft: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 477,
    left: 20
  },
  talkBubbleSquareSmall: {
    width: 200,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  talkBubbleSquareBig: {
    width: 248,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  talkBubbleTriangleBottomLeft: {
    width: 0,
    height: 0,
    marginTop: -20,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    transform: [{ rotate: '180deg' }],
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#333'
  },
  textStyle: {
    color: '#fff'
  }
};

export default Popover;
