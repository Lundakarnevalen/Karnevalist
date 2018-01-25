import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import PulsatingView from './PulsatingView';

const WIDTH = Dimensions.get('window').width;

class Popover extends Component {
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
    if (this.props.type === 'bottomLeft')
      return (
        <TouchableOpacity
          onPress={this.props.onPress}
          style={[talkBubbleBottomLeft, this.zIndexWorkaround(1000)]}
        >
          <PulsatingView animate>
            <View animate style={this.props.big ? talkBubbleSquareBig : talkBubbleSquareSmall}>
              <Text style={[textStyle, { marginLeft: 16 }]}>{this.props.text}</Text>
            </View>
            <View style={talkBubbleTriangleBottomLeft} />
          </PulsatingView>
        </TouchableOpacity>
      );
    if (this.props.type === 'topRight')
      return (
        <TouchableOpacity
          onPress={this.props.onPress}
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
    top: Platform.OS === 'ios' ? 70 : 74,
    right: 5
  },
  talkBubbleTriangleTopRight: {
    width: 0,
    height: 0,
    left: WIDTH / 2,
    marginBottom: -20,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#F7A021'
  },
  talkBubbleBottomLeft: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 4,
    left: WIDTH / 3.12
  },
  talkBubbleSquareSmall: {
    width: WIDTH / 1.62,
    height: 40,
    backgroundColor: '#F7A021',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  talkBubbleSquareBig: {
    width: WIDTH / 1.48,
    height: 40,
    backgroundColor: '#F7A021',
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
    borderBottomColor: '#F7A021'
  },
  textStyle: {
    color: '#fff'
  }
};

export { Popover };
