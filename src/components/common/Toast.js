import React, { Component } from 'react'
import {
  Text,
  View,
  Animated,
  Platform
} from 'react-native';
import { Constants } from 'expo';

const topMargin = Platform.OS === 'ios' ? 15 : Constants.statusBarHeight

class Toast extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalShown: false,
      toastColor: props.color,
      message: props.message,
      animatedValue: new Animated.Value(0)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showToast)
      this.callToast(this.props.message)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  callToast(message) {
    if (this.state.modalShown) return
    this.setState({ modalShown: true })
    this.setState({ color: this.state.toastColor })
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 350
      }).start(this.closeToast())
  }

  closeToast() {
      this.timer = setTimeout(() => {
        this.setState({ modalShown: false })
        Animated.timing(
          this.state.animatedValue,
          {
            toValue: 0,
            duration: 350
          }).start()
      }, 2000)
  }

  render() {
    const animation = this.state.animatedValue.interpolate({
       inputRange: [0, 0.3, 1],
       outputRange: [-70, -40, -topMargin]
    })
    const style = { backgroundColor: this.state.color, transform: [{ translateY: animation }] }
    return (
      <View>
        <Animated.View
        style={[style, styles.animatedStyle]}
        >
          <Text style={styles.textStyle}>
            { this.state.message }
          </Text>
        </Animated.View>
      </View>
    );
      }
}


const styles = {
  container: {
  },
  buttonContainer: {
    marginTop: 10
  },
  animatedStyle: {
    height: 40,
    position: 'absolute',
    left: 0,
    top: topMargin,
    right: 0,
    justifyContent: 'center',
    zIndex: 10,
  },
  textStyle: {
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
};

export default Toast
