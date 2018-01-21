import React, { Component } from 'react';
import { TouchableOpacity, Text, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;

class TimelineItem extends Component {

  getDone() {
    const borderWidth = 0;
    const backgroundColor = '#F7A021';
    return {
      backgroundColor,
      padding: 10,
      borderWidth
    };
  }
  getNotDone() {
    const borderWidth = 3;
    const backgroundColor = 'rgba(247, 160, 33, 0.5)';
    const borderColor = 'rgba(247, 160, 33, 1)';
    return {
      backgroundColor,
      padding: 10,
      borderWidth,
      borderColor,
    };
  }

  getDoneText() {
    const borderWidth = 0;
    const backgroundColor = 'transparent';
    return {
      backgroundColor,
      padding: 10,
      borderWidth
    };
  }

  getNotDoneText() {
    const borderWidth = 0;
    const backgroundColor = 'transparent';
    return {
      backgroundColor,
      padding: 10,
      borderWidth,
    };
  }

  getStyle() {
    switch (this.props.style) {
      case 'done':
        return this.getDone();
      case 'notDone':
        return this.getNotDone();
      default:
        return styles.button;
    }
  }

  getTextStyle() {
    switch (this.props.style) {
      case 'done':
        return this.getDoneText();
      case 'notDone':
        return this.getNotDoneText();
      default:
        return styles.button;
    }
  }

  getFocused() {
    if (this.props.focus) {
      return { backgroundColor: 'rgba(247, 160, 33, 1)' };
    }
  }
  render() {
    const { text, navigation } = this.props;
    const { button, roundView, textButton, textView } = styles;
    return (
      <TouchableOpacity
        style={[button]}
        onPress={() => this.props.onPress()}
      >
        <View style={[this.getStyle(), roundView]} />
        <View style={[textView, this.getFocused()]}>
        <Text style={[this.getTextStyle(), textButton]}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  button: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  textButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: Dimensions.get('window').width / 2,
    fontFamily: 'Avenir Next Medium',
    color: '#fff',
    fontSize: 17
  },
  focusView: {
    backgroundColor: 'rgba(247, 160, 33, 1)'
  },
  textView: {
    backgroundColor: 'rgba(247, 160, 33, 0.5)',
    borderRadius: 15,
    marginLeft: 6
  },
  roundView: {
    height: Dimensions.get('window').width / 6.5,
    width: Dimensions.get('window').width / 6.5,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barView: {
    width: Dimensions.get('window').width / 9 / 4,
    height: Dimensions.get('window').width / 8,
    backgroundColor: '#F7A021'
  }
};

export default (TimelineItem);
