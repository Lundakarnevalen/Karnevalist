import React, { Component } from 'react';
import { Dimensions, Text, Animated, Image, Easing, View } from 'react-native';
import { connect } from 'react-redux';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
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
        this.spin()
      }
    });
  }

  render() {
    const { container, containerrr, text, image } = styles;
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={container}>
        <Animated.View style={[containerrr, { transform: [{ rotate: spin }] }]}>
          <Text style={text}> LOADING </Text>
          <Image style={image} source={require('../../../res/Monstergubbe.png')} />
        </Animated.View>
      </View>
    );
  }
}

const styles = {
  container: {
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    padding: 20,
    height: HEIGHT
  },
  headerStyle: {
    fontFamily: 'Avenir Next Medium',
    fontSize: 36,
    color: 'rgb(138, 71, 151)',
    backgroundColor: 'transparent'
  },
  containerrr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 227,
    height: 200,
    resizeMode: 'contain'
  },
  text: {
    marginTop: 50,
    fontSize: 30,
    color: 'white',
    fontFamily: 'Avenir Next Medium',
    backgroundColor: 'transparent'
  }
};

const mapStateToProps = ({ currentTheme, currentLanguage }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  return { theme, language };
};

export default connect(mapStateToProps, null)(Loading);
