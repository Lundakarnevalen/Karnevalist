import React, { Component } from 'react';
import { View, Text, Image, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '~/src/components/common';
import { KARNEVAL_ID_SCREEN_STRINGS } from '~/src/helpers/LanguageStrings';
import { getStrings } from '~/src/helpers/functions';
import {
  HEIGHT,
  HEADER_HEIGHT,
  WIDTH,
  VIEW_HEIGHT,
  PINK
} from '~/src/helpers/Constants';
import { karnevalID } from '~/assets/images/KarnevalID';
import * as Animatable from 'react-native-animatable';

const duration = 10000;

class KarnevalIDScreen extends Component {
  render() {
    const strings = getStrings(this.props.language, KARNEVAL_ID_SCREEN_STRINGS);
    const { container } = styles;

    return (
      <View
        style={{
          width: WIDTH,
          height: HEIGHT,
          backgroundColor: PINK
        }}
      >
        <Header title={strings.title} />
        <Image
          resizeMode="contain"
          source={karnevalID.baseBig}
          style={{
            backgroundColor: 'transparent',
            height: VIEW_HEIGHT - 10,
            position: 'absolute',
            top: HEADER_HEIGHT + 10,
            width: WIDTH
          }}
        />
        <Animatable.Image
          animation={{
            from: { translateY: 0 },
            to: { translateY: HEIGHT }
          }}
          easing="linear"
          duration={duration}
          iterationCount="infinite"
          useNativeDriver
          style={{
            height: HEIGHT,
            position: 'absolute',
            left: 0,
            width: 15,
            zIndex: 2
          }}
          source={karnevalID.cupRowRight}
        />
        <Animatable.Image
          animation={{
            from: { translateY: -HEIGHT },
            to: { translateY: 0 }
          }}
          easing="linear"
          duration={duration}
          iterationCount="infinite"
          useNativeDriver
          style={{
            height: HEIGHT,
            position: 'absolute',
            left: 0,
            width: 15,
            zIndex: 2
          }}
          source={karnevalID.cupRowRight}
        />
        <Animatable.Image
          animation={{
            from: { translateY: 0 },
            to: { translateY: -HEIGHT }
          }}
          easing="linear"
          duration={duration}
          iterationCount="infinite"
          useNativeDriver
          style={{
            height: HEIGHT,
            position: 'absolute',
            right: 0,
            width: 15,
            zIndex: 2
          }}
          source={karnevalID.cupRowRight}
        />
        <Animatable.Image
          animation={{
            from: { translateY: HEIGHT },
            to: { translateY: 0 }
          }}
          easing="linear"
          duration={duration}
          iterationCount="infinite"
          useNativeDriver
          style={{
            height: HEIGHT,
            position: 'absolute',
            right: 0,
            width: 15,
            zIndex: 2
          }}
          source={karnevalID.cupRowRight}
        />
      </View>
    );
  }
}
const styles = {
  container: {
    height: HEIGHT - 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

KarnevalIDScreen.propTypes = {
  language: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(KarnevalIDScreen);
// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image, // we want to use an image
//   PanResponder, // we want to bring in the PanResponder system
//   Animated // we wil be using animated value
// } from 'react-native';
// import { WIDTH, HEIGHT } from '~/src/helpers/Constants';
//
// class KarnevalIDScreen extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       pan: new Animated.ValueXY(),
//       scale: new Animated.Value(1)
//     };
//   }
//
//   componentWillMount() {
//     this._panResponder = PanResponder.create({
//       onMoveShouldSetResponderCapture: () => true,
//       onMoveShouldSetPanResponderCapture: () => true,
//
//       onPanResponderGrant: (e, gestureState) => {
//         // Set the initial value to the current state
//         this.state.pan.setOffset({
//           x: this.state.pan.x._value,
//           y: this.state.pan.y._value
//         });
//         this.state.pan.setValue({ x: 0, y: 0 });
//         Animated.spring(this.state.scale, {
//           toValue: 1.1,
//           friction: 3
//         }).start();
//       },
//
//       // When we drag/pan the object, set the delate to the states pan position
//       onPanResponderMove: Animated.event([
//         null,
//         { dx: this.state.pan.x, dy: this.state.pan.y }
//       ]),
//
//       // onPanResponderMove: ({ nativeEvent: { touches } }) => {
//       //   const { length } = touches;
//       //   console.log(length);
//       //   if (length === 1) {
//       //     Animated.event([
//       //       null,
//       //       { dx: this.state.pan.x, dy: this.state.pan.y }
//       //     ]);
//       //     // const [{ pageX, pageY }] = touches;
//       //     // this.processTouch(pageX, pageY);
//       //   } else if (length === 2) {
//       //     const [touch1, touch2] = touches;
//       //     this.processPinch(
//       //       touch1.pageX,
//       //       touch1.pageY,
//       //       touch2.pageX,
//       //       touch2.pageY
//       //     );
//       //   }
//       // },
//       onPanResponderRelease: (e, { vx, vy }) => {
//         // Flatten the offset to avoid erratic behavior
//         this.state.pan.flattenOffset();
//         Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();
//       }
//     });
//   }
//
//   render() {
//     // Destructure the value of pan from the state
//     const { pan, scale } = this.state;
//
//     // Calculate the x and y transform from the pan value
//     const [translateX, translateY] = [pan.x, pan.y];
//
//     const rotate = '0deg';
//
//     // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
//     const imageStyle = {
//       transform: [{ translateX }, { translateY }, { rotate }, { scale }]
//     };
//
//     return (
//       <View style={styles.container}>
//         <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
//           <Image
//             style={{ width: 200, height: 200 }}
//             source={require('~/assets/images/KaffeKarl.png')}
//           />
//         </Animated.View>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: WIDTH,
//     height: HEIGHT,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5
//   }
// });
//
// export default KarnevalIDScreen;
