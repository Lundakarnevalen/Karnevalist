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
import { Header, Loading } from 'src/components/common';
import { KARNEVAL_ID_SCREEN_STRINGS } from 'src/helpers/LanguageStrings';
import { getStrings } from 'src/helpers/functions';
import { MaterialIcons } from '@expo/vector-icons';
import {
  HEIGHT,
  HEADER_HEIGHT,
  WIDTH,
  VIEW_HEIGHT,
  PINK,
  PURPLE,
  NOT_FOUND,
  IS_IOS
} from 'src/helpers/Constants';
import { setUserinfo } from 'src/actions';
import images from 'assets/images/';
import { karnevalID } from 'assets/images/KarnevalID';
import * as Animatable from 'react-native-animatable';
import { takeSnapshotAsync } from 'expo';
import { styles } from './styles';
import { fetchMedcheck } from 'src/helpers/ApiManager';
const duration = 15000;

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
const TURNING_DEG = 1;
class KarnevalIDScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0),
      karnevalIDUri: null,
      deg: 0,
      loadingComplete: false
    };
  }

  componentDidMount() {
    if (this.props.userinfo.image) this.setState({ loadingComplete: true });
  }

  componentWillReceiveProps(props) {
    if (props.userinfo.image && this.props.userinfo.image)
      this.setState({ loadingComplete: true });
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

  handleLongPress() {
    const startDuration = 1000;
    this.setState({ released: false }, () => this.superSpin(startDuration));
  }

  superSpin(duration) {
    this.state.spinValue.setValue(0);
    const { deg, spinValue, released } = this.state;
    Animated.timing(spinValue, {
      toValue: 1,
      duration: Math.max(duration, 50),
      easing: Easing.linear
    }).start(() => {
      this.setState({
        deg: deg - TURNING_DEG
      });
      if (!this.state.released) this.superSpin(duration - 50);
    });
  }
  spin() {
    this.state.spinValue.setValue(0);
    const { deg, spinValue } = this.state;
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear
    }).start(() => {
      this.setState({
        deg: deg - TURNING_DEG
      });
    });
  }

  renderRefreshButton() {
    const { userinfo } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          if (userinfo && userinfo.image === NOT_FOUND) {
            this.setState({ karnevalIDUri: null }, () => {
              fetchMedcheck(userinfo.personalNumber, (success, newUserinfo) => {
                if (success) {
                  this.props.setUserinfo({
                    ...userinfo,
                    ...newUserinfo
                  });
                }
              });
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
    const section = userinfo['section' + language] || '';
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
              section
                .split('-')
                .slice(-1)[0]
                .trim()}
          </Text>
        </View>
        <View style={{ marginTop: 7 }}>
          <Text style={textStyle}>
            {strings.personalNumber + ' ' + userinfo.personalNumber || ''}
          </Text>
        </View>
      </View>
    );
  }

  renderCard() {
    const {
      ppContainerStyle,
      imageView,
      idCard,
      loadingCard,
      baseBig,
      loadingContainer
    } = styles;
    const { userinfo, language } = this.props;
    const strings = getStrings(language, KARNEVAL_ID_SCREEN_STRINGS);
    const userImage =
      userinfo.image === NOT_FOUND
        ? karnevalID.placeHolder
        : { uri: userinfo.image };
    return (
      <View style={loadingContainer}>
        <View style={loadingCard}>
          <Loading
            loadingComplete={this.state.loadingComplete}
            redirect={() => this.getIDImage()}
          />
        </View>
        <View
          collapsable={false}
          style={imageView}
          ref={view => (this.image = view)}
        >
          <Image
            resizeMode="contain"
            source={karnevalID.baseBig}
            style={baseBig}
          />
          <View style={ppContainerStyle}>
            <Image resizeMode="cover" source={userImage} style={idCard} />
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
    const { karnevalIDUri, deg, spinValue, showBack } = this.state;

    const strings = getStrings(language, KARNEVAL_ID_SCREEN_STRINGS);
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: [deg + 'deg', deg + 360 - TURNING_DEG + 'deg']
    });
    const anim = { transform: [{ rotate: spin }] };
    return (
      <View style={container}>
        <Header leftIcon={this.renderRefreshButton()} title={strings.title} />
        <TouchableOpacity
          activeOpacity={100}
          onLongPress={() => this.handleLongPress()}
          style={{ zIndex: 1000 }}
          onPressOut={() => this.setState({ released: true })}
          onPress={() => this.spin()}
        >
          <Animated.View style={[card, anim]}>
            <View style={fixCircleClipping} />
            {!!karnevalIDUri &&
              !!userinfo.image && (
                <Image
                  resizeMode="cover"
                  source={{ uri: karnevalIDUri }}
                  style={baseImageStyle}
                />
              )}
            {!karnevalIDUri && !!userinfo.image && this.renderCard()}
            <View style={cups}>{cupImages.map(i => animatableImage(i))}</View>
          </Animated.View>
        </TouchableOpacity>
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
