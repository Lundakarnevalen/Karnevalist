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
    const borderWidth = 2;
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
  render() {
    const { onPress, text, width = WIDTH / 1.5 } = this.props;
    const { button, roundView, textButton, barView, textView } = styles;
    return (
      <TouchableOpacity onPress={onPress} style={[button]}>
        <View style={[this.getStyle(), roundView]} />
        <Text style={[this.getTextStyle()]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  button: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  textButton: {
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  roundView: {
    height: Dimensions.get('window').width / 7,
    width: Dimensions.get('window').width / 7,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barView: {
    width: Dimensions.get('window').width / 9 / 4,
    height: Dimensions.get('window').width / 8,
    backgroundColor: '#F7A021'
  },
  textView: {
    backgroundColor: 'white',
    justifyContent: 'left',
    alignItems: 'left',
    margin: Dimensions.get('window').width / 7 - 10,
    width: Dimensions.get('window').width / 2
  }
};

const mapStateToProps = ({ currentTheme }) => {
  const { theme } = currentTheme;
  return { theme };
};

export default connect(mapStateToProps, null)(TimelineItem);
