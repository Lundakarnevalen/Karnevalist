import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Loading } from '~/src/components/common';
import { KARNEVAL_ID_SCREEN_STRINGS } from '~/src/helpers/LanguageStrings';
import { getStrings } from '~/src/helpers/functions';
import { MaterialIcons } from '@expo/vector-icons';
import {
  HEIGHT,
  HEADER_HEIGHT,
  WIDTH,
  VIEW_HEIGHT,
  PINK,
  PURPLE,
  IS_IOS
} from '~/src/helpers/Constants';
import { setUserinfo } from '~/src/actions';
import images from '~/assets/images/';
import { karnevalID } from '~/assets/images/KarnevalID';
import * as Animatable from 'react-native-animatable';
import { takeSnapshotAsync } from 'expo';
import { styles } from './styles';
import { fetchMedcheck } from '~/src/helpers/ApiManager';
const duration = 10000;

const cupImages = [
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
      spinValue: new Animated.Value(0),
      karnevalIDUri: null,
      deg: 0,
      turningDeg: Math.floor(Math.random() * 15) + 1,
      loadingComplete: false,
      showBack: false
    };
  }

  componentWillReceiveProps(props) {
    if (props.userinfo.image) this.setState({ loadingComplete: true });
  }

  async getIDImage() {
    if (!this.state.karnevalIDUri && this.image) {
      const result = await takeSnapshotAsync(this.image, {
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
    const { deg, turningDeg } = this.state;
    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear
    }).start(() => {
      this.setState({
        deg: deg - turningDeg,
        turningDeg: Math.floor(Math.random() * 15) + 1
      });
    });
  }

  renderRefreshButton() {
    const { userinfo } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          if (userinfo && !userinfo.image) {
            fetchMedcheck(userinfo.personalNumber, (success, newUserinfo) => {
              if (success) {
                this.props.setUserinfo({
                  ...userinfo,
                  ...newUserinfo
                });
              }
            });
          } else {
            this.setState({ karnevalIDUri: null });
          }
        }}
      >
        <MaterialIcons name="refresh" size={35} color="white" />
      </TouchableOpacity>
    );
  }

  renderUserinfo(strings) {
    const { userinfo, language } = this.props;
    const { textStyle, infoView } = styles;
    return (
      <View style={infoView}>
        <View style={{ marginTop: language === 'EN' ? -5 : 12 }}>
          <Text style={textStyle}>
            {strings.name + ' ' + userinfo.firstName + ' ' + userinfo.lastName}
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
    );
  }
  renderSwapButton() {
    return (
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => this.setState({ showBack: !this.state.showBack })}
      >
        <MaterialIcons name={'cached'} size={35} color={'white'} />
      </TouchableOpacity>
    );
  }

  renderCard() {
    const {
      ppContainerStyle,
      imageView,
      idCard,
      loadingCard,
      baseBig
    } = styles;
    const { userinfo, language } = this.props;
    const strings = getStrings(language, KARNEVAL_ID_SCREEN_STRINGS);
    return (
      <View>
        <View style={loadingCard}>
          <Loading
            loadingComplete={this.state.loadingComplete}
            redirect={() => this.getIDImage()}
          />
        </View>
        <View style={imageView} ref={view => (this.image = view)}>
          <Image
            resizeMode="contain"
            source={karnevalID.baseBig}
            style={baseBig}
          />
          <View style={ppContainerStyle}>
            <Image
              resizeMode="cover"
              source={{ uri: userinfo.image }}
              style={idCard}
            />
          </View>
          {this.renderUserinfo(strings)}
        </View>
      </View>
    );
  }

  render() {
    const {
      container,
      textStyle,
      baseImageStyle,
      card,
      cups,
      fixCircleClipping,
      imageView,
      sponsView
    } = styles;
    const { userinfo, language } = this.props;
    const { karnevalIDUri, deg, spinValue, showBack, turningDeg } = this.state;

    const strings = getStrings(language, KARNEVAL_ID_SCREEN_STRINGS);
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: [deg + 'deg', deg + 360 - turningDeg + 'deg']
    });
    const anim = { transform: [{ rotate: spin }], overflow: 'hidden' };
    return (
      <View style={container}>
        <Header
          rightIcon={this.renderSwapButton()}
          leftIcon={this.renderRefreshButton()}
          title={strings.title}
        />
        <TouchableWithoutFeedback onPress={() => this.spin()}>
          <Animated.View style={[card, anim]}>
            <View style={fixCircleClipping} />
            {showBack && (
              <View style={sponsView}>
                <Text style={[textStyle, { fontSize: 25 }]}>Sponsored by:</Text>
                <Image
                  style={{ width: VIEW_HEIGHT - 100, height: WIDTH / 4 }}
                  source={images.spons}
                />
              </View>
            )}
            {!showBack &&
              karnevalIDUri &&
              userinfo.image && (
                <Image
                  resizeMode="cover"
                  source={{ uri: karnevalIDUri }}
                  style={baseImageStyle}
                />
              )}
            {!showBack && !karnevalIDUri && userinfo.image && this.renderCard()}
            <View style={cups}>{cupImages.map(i => animatableImage(i))}</View>
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

export default connect(mapStateToProps, { setUserinfo })(KarnevalIDScreen);
