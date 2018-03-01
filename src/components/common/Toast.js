import React, { Component } from 'react';
import { Text, Animated } from 'react-native';
import { WIDTH } from '../../helpers/Constants';

class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      toastColor: props.color,
      message: props.message,
      animatedValue: new Animated.Value(0)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showToast) this.callToast(nextProps.message);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  callToast(message) {
    if (this.state.modalShown) return;
    this.setState({ modalShown: true, message });
    this.setState({ color: this.state.toastColor });
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 350
    }).start(this.closeToast());
  }

  closeToast() {
    this.timer = setTimeout(() => {
      this.setState({ modalShown: false });
      this.props.onClose();
      Animated.timing(this.state.animatedValue, {
        toValue: 0,
        duration: 350
      }).start();
    }, 2000);
  }

  render() {
    const { message = '' } = this.props;
    const animation = this.state.animatedValue.interpolate({
      inputRange: [0, 0.3, 1],
      outputRange: [-70, -40, 0]
    });
    const style = { transform: [{ translateY: animation }] };
    return (
      <Animated.View style={[style, styles.animatedStyle]}>
        <Text style={styles.textStyle}>{message}</Text>
      </Animated.View>
    );
  }
}

const styles = {
  animatedStyle: {
    height: 40,
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    width: WIDTH,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#F7A021'
  },
  textStyle: {
    marginLeft: 10,
    color: '#F7A021',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
};

export { Toast };
