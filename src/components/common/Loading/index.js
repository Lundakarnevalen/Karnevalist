import React, { Component } from 'react';
import { Text, Animated, Image, Easing, View } from 'react-native';
import PropTypes from 'prop-types';
import images from '~/assets/images';
import { styles } from './styles';

/**
 * Loading class with redirect.
 * If redirect isn't needed redirect should be set to null.
 */
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0),
      size: new Animated.Value(0.3)
    };
  }

  componentDidMount() {
    this.spin(true);
  }

  spin(bigger) {
    this.state.spinValue.setValue(0);
    const duration = Math.floor(Math.random() * 20 + 1) === 1 ? 400 : 2000;
    const size = Math.floor(Math.random() * 5 + 1);
    Animated.parallel([
      Animated.timing(this.state.spinValue, {
        toValue: 1,
        duration,
        easing: Easing.linear
      }),
      Animated.timing(this.state.size, {
        toValue: bigger ? size : 0.2,
        duration,
        easing: Easing.linear
      })
    ]).start(() => {
      if (this.props.loadingComplete) {
        this.props.redirect();
      } else {
        this.spin(!bigger);
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
          style={[
            containerAnimated,
            {
              transform: [
                {
                  rotate: spin
                },
                { scaleY: this.state.size },
                {
                  scaleX: this.state.size
                }
              ]
            }
          ]}
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
