import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import {
  Header,
  BackgroundImage,
  Popover,
  TimelineItem,
  NewPicker
} from '~/src/components/common';
import { HOME_SCREEN_STRINGS } from '~/src/helpers/LanguageStrings';
import { fetchCheckInStatus } from '~/src/helpers/ApiManager';
import { PROGRESS, WIDTH } from '~/src/helpers/Constants';
import images from '~/assets/images';
import { setPopover, setProgress } from '~/src/actions';
import { getStrings } from '~/src/helpers/functions';
import { styles } from './styles';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: true,
      checkInLoading: false,
      spinValue: new Animated.Value(0)
    };
  }

  getLanguageStrings() {
    return getStrings(this.props.language, HOME_SCREEN_STRINGS);
  }

  animateProgress() {
    const percent = this.props.progress * 25;
    return `${percent}%`;
  }

  renderProgress() {
    if (this.state.animate) {
      this.setState({ animate: false });
      return 0;
    }
    return this.props.progress * 0.25;
  }

  renderPopover(text) {
    const { popover } = this.props;
    if (popover && this.props.progress >= 2) {
      return (
        <Popover
          onPress={() => this.props.setPopover('homeScreenPopover', false)}
          type="bottomLeft"
          text={text}
          big
          name="homeScreenPopover"
        />
      );
    }
  }

  updateProgress() {
    const { email, token } = this.props;
    fetchCheckInStatus(email, token, checkedInStatus => {
      setTimeout(() => {
        if (checkedInStatus === true) {
          this.props.setProgress(PROGRESS.CHECK_IN);
          if (this.props.sectionPriorities.length > 4) {
            this.props.setProgress(PROGRESS.CHOOSE_SECTIONS);
          }
        }
        this.setState({
          checkInLoading: false,
          spinValue: new Animated.Value(0)
        });
      }, 1500);
    });
  }

  renderIcon(prog) {
    if (this.props.progress >= prog) {
      return 'done';
    }
    if (this.props.progress + 1 === prog) {
      if (prog === 2) return 'refresh';
      return 'keyboard-arrow-right';
    }
    return 'none';
  }

  renderStyle(prog) {
    if (this.props.progress + 1 !== prog) {
      return {
        backgroundColor: 'rgba(255,255,255, 0.4)'
      };
    }
    if (this.props.progress + 1 === prog) {
      return {
        height: 70,
        borderWidth: 2
      };
    }
  }

  renderCheckInLoading() {
    const { containerAnimated, image } = styles;
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <Animated.View
        style={[containerAnimated, { transform: [{ rotate: spin }] }]}
      >
        <Image style={image} source={images.monsterGubbe} />
      </Animated.View>
    );
  }

  spin() {
    this.state.spinValue.setValue(0);
    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear
    }).start(() => {
      if (this.state.checkInLoading) {
        this.spin();
      }
    });
  }

  renderOnPress(prog) {
    const { navigation, screenProps } = this.props;
    if (this.props.progress + 1 === prog) {
      if (prog === 2 && !this.state.checkInLoading) {
        this.setState({ checkInLoading: true });
        this.spin();
        this.updateProgress();
      }
      if (prog === 3) {
        navigation.navigate('Sections');
      }
      if (prog === 4) {
        screenProps.navigation.navigate('ConfirmPage');
      }
    }
  }

  render() {
    const { container, textStyleProgress } = styles;
    const { progress } = this.props;
    const strings = this.getLanguageStrings();
    return (
      <View style={{ flex: 1 }}>
        <BackgroundImage pictureNumber={1} />
        <Header title={strings.title} />

        <View style={{ height: 20 }} />
        <View style={container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={textStyleProgress}> {strings.RightNow} </Text>
            <Progress.Circle
              borderWidth={3}
              thickness={9}
              textStyle={{ fontSize: WIDTH / 17, fontWeight: 'bold' }}
              progress={progress * 0.25}
              formatText={() => this.animateProgress()}
              size={WIDTH / 4}
              showsText
              color="#FFF"
            />
            <Text style={textStyleProgress}> {strings.Karnevalist} </Text>
          </View>
          <View style={{ justifyContent: 'center', marginTop: 12 }}>
            <TimelineItem
              title={strings.step1}
              clickable={progress + 1 === PROGRESS.CREATE_PROFILE}
              rightIcon={this.renderIcon(PROGRESS.CREATE_PROFILE)}
              style={this.renderStyle(PROGRESS.CREATE_PROFILE)}
              onPress={() => this.renderOnPress(PROGRESS.CREATE_PROFILE)}
              infoText={strings.createProfile}
            />
            <TimelineItem
              title={strings.step2}
              rightIcon={
                this.state.checkInLoading
                  ? this.renderCheckInLoading()
                  : this.renderIcon(PROGRESS.CHECK_IN)
              }
              clickable={progress + 1 === PROGRESS.CHECK_IN}
              style={this.renderStyle(PROGRESS.CHECK_IN)}
              refresh
              onPress={() => this.renderOnPress(PROGRESS.CHECK_IN)}
              infoText={strings.CheckIn}
            />
            <TimelineItem
              clickable={progress + 1 === PROGRESS.CHOOSE_SECTIONS}
              title={strings.step3}
              rightIcon={this.renderIcon(PROGRESS.CHOOSE_SECTIONS)}
              style={this.renderStyle(PROGRESS.CHOOSE_SECTIONS)}
              onPress={() => this.renderOnPress(PROGRESS.CHOOSE_SECTIONS)}
              infoText={strings.ChooseSections}
            />
            <TimelineItem
              clickable={progress + 1 === PROGRESS.SENT_SECTIONS}
              title={strings.step4}
              rightIcon={this.renderIcon(PROGRESS.SENT_SECTIONS)}
              style={this.renderStyle(PROGRESS.SENT_SECTIONS)}
              onPress={() => this.renderOnPress(PROGRESS.SENT_SECTIONS)}
              infoText={strings.SendIn}
            />
          </View>
        </View>
        {this.renderPopover(strings.popoverText)}
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  language: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  screenProps: PropTypes.shape().isRequired,
  popover: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
  sectionPriorities: PropTypes.arrayOf(PropTypes.number).isRequired,
  setPopover: PropTypes.func.isRequired
};

const mapStateToProps = ({
  currentLanguage,
  popoverStatus,
  userInformation,
  sections
}) => {
  const { language } = currentLanguage;
  const { progress, token, email } = userInformation;
  return {
    language,
    popover: popoverStatus.homeScreenPopover,
    progress,
    token,
    email,
    sectionPriorities: sections.sectionPriorities
  };
};

export default connect(mapStateToProps, { setProgress, setPopover })(
  HomeScreen
);
