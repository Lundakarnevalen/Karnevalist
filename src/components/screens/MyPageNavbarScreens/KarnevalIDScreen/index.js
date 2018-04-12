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
