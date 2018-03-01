import React, { Component } from 'react';
import { View, Text, Image, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import { Header, BackgroundImage, Popover, TimelineItem, SuperAgileAlert } from '../../common';
import { HOME_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';
import { fetchCheckInStatus } from '../../../helpers/ApiManager';
import { setHomeScreenPopover, setProgress } from '../../../actions';
import { PROGRESS, WIDTH } from '../../../helpers/Constants';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: true,
      checkInLoading: false,
      alertVisible: false,
      spinValue: new Animated.Value(0)
    };
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = HOME_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = HOME_SCREEN_STRINGS[field][language]));
    return strings;
  }

  renderPopover(text) {
    const { popover } = this.props;
    if (popover && this.props.progress >= 2) {
      return (
        <Popover
          onPress={() => this.props.setHomeScreenPopover(false)}
          type={'bottomLeft'}
          text={text}
          big
          name={'homeScreenPopover'}
        />
      );
    }
  }

  animateProgress() {
    const percent = this.props.progress * 25;
    return percent + '%';
  }

  renderProgress() {
    if (this.state.animate) {
      this.setState({ animate: false });
      return 0;
    }
    return this.props.progress * 0.25;
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
        this.setState({ checkInLoading: false, spinValue: new Animated.Value(0) });
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
      <Animated.View style={[containerAnimated, { transform: [{ rotate: spin }] }]}>
        <Image style={image} source={require('../../../../res/Monstergubbe.png')} />
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
    return;
  }

  render() {
    const { container, textStyleProgress } = styles;
    const { navigation, progress } = this.props;
    const strings = this.getStrings();
    return (
      <View style={{ flex: 1 }}>
        <BackgroundImage pictureNumber={1} />
        <Header title={strings.title} leftIcon={null} rightIcon={null} navigation={navigation} />
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
              color={'#FFF'}
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

const styles = {
  container: {
    alignItems: 'center',
    width: WIDTH,
    backgroundColor: 'transparent'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  rightIconStyle: {
    alignItems: 'center',
    padding: 1,
    backgroundColor: 'transparent',
    width: 60
  },
  buttons: {
    position: 'absolute',
    flexDirection: 'row',
    flex: 1,
    top: 0,
    left: 0,
    marginTop: 20
  },
  textStyleProgress: {
    fontSize: WIDTH / 19,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Avenir Next Medium',
    margin: 10
  },
  textStyle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Avenir Next Medium'
  },
  popoverContainer: {
    backgroundColor: '#114B5F',
    padding: 8,
    borderRadius: 5
  },
  popoverText: {
    color: '#E4FDE1'
  },
  containerAnimated: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 45,
    height: 45,
    resizeMode: 'contain'
  }
};

const mapStateToProps = ({ currentLanguage, popoverStatus, userInformation, sections }) => {
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

export default connect(mapStateToProps, { setProgress, setHomeScreenPopover })(HomeScreen);
