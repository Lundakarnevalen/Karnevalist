import React, { Component } from "react";
import { View, Text, Image, Animated, Easing } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header } from "~/src/components/common";
import { KARNEVAL_ID_SCREEN_STRINGS } from "~/src/helpers/LanguageStrings";
import { getStrings } from "~/src/helpers/functions";
import {
  HEIGHT,
  HEADER_HEIGHT,
  WIDTH,
  VIEW_HEIGHT,
  PINK
} from "~/src/helpers/Constants";
import { karnevalID } from "~/assets/images/KarnevalID";
import * as Animatable from "react-native-animatable";
import { styles } from "./styles";

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
    startY: -HEIGHT,
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

animatableImage.propTypes = {
  key: PropTypes.number.isRequired,
  startY: PropTypes.number.isRequired,
  endY: PropTypes.number.isRequired,
  source: PropTypes.shape().isRequired,
  style: PropTypes.shape().isRequired
};
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
      baseImageStyle,
      infoView,
      card,
      cups,
      ppContainerStyle,
      picStyle
    } = styles;
    return (
      <View style={container}>
        <Header title={strings.title} />
        <View style={card}>
          <View style={styles.fixCircleClipping} />
          <Image
            resizeMode="contain"
            source={karnevalID.baseBig}
            style={baseImageStyle}
          />
          <View style={ppContainerStyle}>
            {this.props.userinfo.image && <Image
              resizeMode="cover"
              source={{uri: this.props.userinfo.image}}
              style={{
                position: "absolute",
                zIndex: 10,
                width: 145,
                height: 186,
                borderRadius: 17
              }}
            />}
          </View>
          <Animated.View style={infoView}>
            <View>
              <Text style={textStyle}>
                {strings.name + ' ' + this.props.userinfo.firstName+ ' ' + this.props.userinfo.lastName}
              </Text>
            </View>
            <View style={{ marginTop: 7 }}>
              <Text style={textStyle}>{strings.section + ' ' + this.props.userinfo['section' + this.props.language]}</Text>
            </View>
            <View style={{ marginTop: 7 }}>
              <Text style={textStyle}>
                {strings.personalNumber + ' ' + this.props.userinfo.personalNumber}
              </Text>
            </View>
          </Animated.View>
          <View style={cups}>{images.map(i => animatableImage(i))}</View>
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
  language: PropTypes.string.isRequired,
  userinfo: PropTypes.shape().isRequired
};

export default connect(mapStateToProps)(KarnevalIDScreen);
