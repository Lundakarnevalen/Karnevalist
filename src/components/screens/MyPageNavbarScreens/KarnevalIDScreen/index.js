import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
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
  PINK,
  IS_IOS
} from '~/src/helpers/Constants';
import { karnevalID } from '~/assets/images/KarnevalID';
import * as Animatable from 'react-native-animatable';
import { takeSnapshotAsync } from 'expo';
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
    startY: -HEIGHT,
    endY: 0,
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

const DEGREE = 1;
class KarnevalIDScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0),
      karnevalIDUri: null,
      deg: 0
    };
  }

  componentWillReceiveProps(props) {
    if (
      (this.image && props.userinfo.image) ||
      this.props.language !== props.language
    )
      this.getIDImage();
  }

  async getIDImage(view) {
    if (!this.state.karnevalIDUri && this.image) {
      let result = await takeSnapshotAsync(this.image, {
        format: 'png',
        result: 'file',
        width: WIDTH - 30,
        height: VIEW_HEIGHT - 20
      });
      this.setState({ karnevalIDUri: result });
    }
  }
  spin() {
    this.state.spinValue.setValue(0);
    const { deg } = this.state;
    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear
    }).start(() => {
      this.setState({ deg: deg - DEGREE });
    });
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
      picStyle,
      fixCircleClipping,
      imageView,
      idCard
    } = styles;
    const { userinfo, language } = this.props;
    const { karnevalIDUri, deg } = this.state;
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: [deg + 'deg', deg + 360 - DEGREE + 'deg']
    });
    const anim = { transform: [{ rotate: spin }] };
    return (
      <View style={container}>
        <Header title={strings.title} />
        <TouchableWithoutFeedback onPress={() => this.spin()}>
          <Animated.View style={[card, anim]}>
            <View style={fixCircleClipping} />
            {karnevalIDUri && (
              <Image
                resizeMode="cover"
                source={{ uri: karnevalIDUri }}
                style={baseImageStyle}
              />
            )}
            {!karnevalIDUri &&
              userinfo.image && (
                <View
                  collapsable={false}
                  style={imageView}
                  ref={view => (this.image = view)}
                >
                  <Image
                    resizeMode="contain"
                    source={karnevalID.baseBig}
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      width: undefined,
                      height: undefined
                    }}
                  />
                  <View style={ppContainerStyle}>
                    {userinfo.image && (
                      <Image
                        resizeMode="cover"
                        source={{ uri: userinfo.image }}
                        style={idCard}
                      />
                    )}
                  </View>
                  <View style={infoView}>
                    <View style={{ marginTop: 7 }}>
                      <Text style={textStyle}>
                        {strings.name +
                          ' ' +
                          userinfo.firstName +
                          ' ' +
                          userinfo.lastName}
                      </Text>
                    </View>
                    <View style={{ marginTop: 7 }}>
                      <Text style={textStyle}>
                        {strings.section +
                          ' ' +
                          userinfo['section' + language]
                            .split('-')
                            .slice(-1)[0]
                            .trim()}
                      </Text>
                    </View>
                    <View style={{ marginTop: 7 }}>
                      <Text style={textStyle}>
                        {strings.personalNumber + ' ' + userinfo.personalNumber}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            <View style={cups}>{images.map(i => animatableImage(i))}</View>
          </Animated.View>
        </TouchableWithoutFeedback>
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
