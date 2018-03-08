import React, { Component } from 'react';
import { Text, Animated, Image, Easing, View } from 'react-native';
import PropTypes from 'prop-types';
import images from 'assets/images';
import { styles } from './styles';
/**
 * Loading class with redirect.
 * If redirect isn't needed redirect should be set to null.
 */
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0)
    };
  }

  componentWillMount() {
    this.spin();
  }

  spin() {
    this.state.spinValue.setValue(0);
    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }).start(() => {
      if (this.props.loadingComplete) {
        this.props.redirect();
      } else {
        this.spin();
      }
    });
  }

  render() {
    const { container, containerAnimated, text, image } = styles;
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={container}>
        <Animated.View
          style={[containerAnimated, { transform: [{ rotate: spin }] }]}
        >
          <Text style={text}> LOADING </Text>
          <Image style={image} source={images.monsterGubbe} />
        </Animated.View>
      </View>
    );
  }
}
Loading.defaultProps = {
  redirect: null
};

Loading.propTypes = {
  loadingComplete: PropTypes.bool.isRequired,
  redirect: PropTypes.func
};

export { Loading };
