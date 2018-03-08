import React, { Component } from 'react';
import { Text, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';

class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      animatedValue: new Animated.Value(0)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showToast) this.callToast(nextProps.message);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  callToast() {
    if (this.state.modalShown) return;
    this.setState({ modalShown: true });
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
    const { message } = this.props;
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

Toast.defaultProps = {
  onClose: null
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  showToast: PropTypes.bool.isRequired
};
export { Toast };
