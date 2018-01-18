import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PulsatingView from './PulsatingView';

class Popover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  renderBubbleStyle() {
    if (!this.state.isVisible) {
      return {
        display: 'none'
      };
    }
    return styles.talkBubble;
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.setState({ isVisible: false })}
        style={this.renderBubbleStyle()}
      >
        <PulsatingView animate>
          <View animate style={styles.talkBubbleSquare}>
            <Text>Här väljer du sektioner</Text>
          </View>
          <View style={styles.talkBubbleTriangle} />
        </PulsatingView>
      </TouchableOpacity>
    );
  }
}

const styles = {
  talkBubble: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 387,
    left: 20
  },
  talkBubbleSquare: {
    width: 200,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  talkBubbleTriangle: {
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
    borderBottomColor: '#FFF'
  }
};

export default Popover;
