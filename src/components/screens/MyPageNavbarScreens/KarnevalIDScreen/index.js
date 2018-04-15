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
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const strings = getStrings(this.props.language, KARNEVAL_ID_SCREEN_STRINGS);
    const {
      container,
      textStyle,
      cupRowLeftStyle,
      cupRowRightStyle,
      baseImageStyle
    } = styles;

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
          style={baseImageStyle}
        />
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 180,
            transform: [{ rotate: '90deg' }]
          }}
        >
          <View>
            <Text style={textStyle}>
              {`${`NAMN ${this.props.userinfo.firstName}`} ${
                this.props.userinfo.lastName
              }`}
            </Text>
          </View>
          <View style={{ marginTop: 7 }}>
            <Text style={textStyle}>SEKTION</Text>
          </View>
          <View style={{ marginTop: 7 }}>
            <Text style={textStyle}>
              {`PERSONNUMMER ${this.props.userinfo.personalNumber}`}
            </Text>
          </View>
        </Animated.View>
        <Animatable.Image
          animation={{
            from: { translateY: 0 },
            to: { translateY: HEIGHT }
          }}
          easing="linear"
          duration={duration}
          iterationCount="infinite"
          useNativeDriver
          style={cupRowLeftStyle}
          source={karnevalID.cupRowRight}
        />
        <Animatable.Image
          animation={{
            from: { translateY: -HEIGHT - 10 },
            to: { translateY: -10 }
          }}
          easing="linear"
          duration={duration}
          iterationCount="infinite"
          useNativeDriver
          style={cupRowLeftStyle}
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
          style={cupRowRightStyle}
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
          style={cupRowRightStyle}
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
  },
  baseImageStyle: {
    backgroundColor: 'transparent',
    height: VIEW_HEIGHT - 15,
    position: 'absolute',
    top: HEADER_HEIGHT + 10,
    width: WIDTH
  },
  cupRowLeftStyle: {
    height: HEIGHT,
    position: 'absolute',
    left: 0,
    width: 15,
    zIndex: 2
  },
  cupRowRightStyle: {
    height: HEIGHT,
    position: 'absolute',
    right: 0,
    width: 15,
    zIndex: 2
  },
  textStyle: {
    fontSize: 14,
    color: 'purple'
  }
};

const mapStateToProps = ({ currentLanguage, userInformation }) => {
  const { language } = currentLanguage;
  const { userinfo } = userInformation;
  return { language, userinfo };
};

KarnevalIDScreen.propTypes = {
  language: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(KarnevalIDScreen);
