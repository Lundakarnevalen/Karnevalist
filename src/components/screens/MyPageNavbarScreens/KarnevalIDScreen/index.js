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
import { styles } from './styles';

const duration = 10000;

const images = [
  {
    key: 0,
    startY: 0,
    endY: HEIGHT,
    source: karnevalID.cupRowRight,
    style: styles.cupRowLeftStyle
  },
  {
    key: 1,
    startY: -HEIGHT - 10,
    endY: -10,
    source: karnevalID.cupRowRight,
    style: styles.cupRowLeftStyle
  },
  {
    key: 2,
    startY: 0,
    endY: -HEIGHT,
    source: karnevalID.cupRowRight,
    style: styles.cupRowRightStyle
  },
  {
    key: 3,
    startY: HEIGHT,
    endY: 0,
    source: karnevalID.cupRowRight,
    style: styles.cupRowRightStyle
  }
];

const animatableImage = ({ key, startY, endY, source, style }) => (
  <Animatable.Image
    key={key}
    animation={{
      from: { translateY: startY },
      to: { translateY: endY }
    }}
    easing="linear"
    duration={duration}
    iterationCount="infinite"
    useNativeDriver
    style={style}
    source={source}
  />
);

class KarnevalIDScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const strings = getStrings(this.props.language, KARNEVAL_ID_SCREEN_STRINGS);
    const { container, textStyle, baseImageStyle, infoView, card, cups} = styles;
    return (
      <View style={container}>
        <Header title={strings.title} />
        <View style={card}>
          <Image
            resizeMode="contain"
            source={karnevalID.baseBig}
            style={baseImageStyle}
          />
          <Animated.View style={infoView}>
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
          <View style={cups}>
            {images.map(i => animatableImage(i))}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ currentLanguage, userInformation }) => {
  const { language } = currentLanguage;
  const { userinfo } = userInformation;
  return { language, userinfo };
};

KarnevalIDScreen.propTypes = {
  language: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(KarnevalIDScreen);
