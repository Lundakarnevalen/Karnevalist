import React, { Component } from 'react';
import { View, Text, Image, Easing } from 'react-native';
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

class KarnevalIDScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      karnevalIDUri: null
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
      imageView
    } = styles;
    const { userinfo, language } = this.props;
    const { karnevalIDUri } = this.state;

    return (
      <View style={container}>
        <Header title={strings.title} />
        <View style={card}>
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
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        width: 154,
                        height: 197,
                        borderRadius: 17,
                        left: 0,
                        top: IS_IOS ? -10 : 71
                      }}
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
