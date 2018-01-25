import React, { Component } from 'react';
import { View, Dimensions, Text, Image, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import { Header, BackgroundImage, Popover, TimelineItem } from '../../common';
import { HOME_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';
import { fetchCheckInStatus } from '../../../helpers/ApiManager';
import { setHomeScreenPopover, setProgress } from '../../../actions';
import { PROGRESS } from '../../../helpers/Constants';

const WIDTH = Dimensions.get('window').width;

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
          onPress={() => setHomeScreenPopover(false)}
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
      if (this.props.loadingComplete) {
        this.props.redirect();
      } else {
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
              textStyle={{ fontSize: 22, fontWeight: 'bold' }}
              progress={this.renderProgress()}
              formatText={() => this.animateProgress()}
              size={90}
              showsText
              color={'#FFF'}
            />
            <Text style={textStyleProgress}> {strings.Karnevalist} </Text>
          </View>
          <View style={{ justifyContent: 'center', marginTop: 12 }}>
            <TimelineItem
              sectionTitle={strings.step1}
              done={() => progress >= PROGRESS.CREATE_PROFILE}
              icon={this.renderIcon(PROGRESS.CREATE_PROFILE)}
              style={this.renderStyle(PROGRESS.CREATE_PROFILE)}
              onPress={() => this.renderOnPress(PROGRESS.CREATE_PROFILE)}
              sectionInfoText={strings.createProfile}
            />
            <TimelineItem
              sectionTitle={strings.step2}
              icon={
                this.state.checkInLoading
                  ? this.renderCheckInLoading()
                  : this.renderIcon(PROGRESS.CHECK_IN)
              }
              done={() => progress >= PROGRESS.CHECK_IN}
              style={this.renderStyle(PROGRESS.CHECK_IN)}
              refresh
              onPress={() => this.renderOnPress(PROGRESS.CHECK_IN)}
              sectionInfoText={strings.CheckIn}
            />
            <TimelineItem
              done={() => progress >= PROGRESS.CHOOSE_SECTIONS}
              sectionTitle={strings.step3}
              icon={this.renderIcon(PROGRESS.CHOOSE_SECTIONS)}
              style={this.renderStyle(PROGRESS.CHOOSE_SECTIONS)}
              onPress={() => this.renderOnPress(PROGRESS.CHOOSE_SECTIONS)}
              sectionInfoText={strings.ChooseSections}
            />
            <TimelineItem
              done={() => progress >= PROGRESS.SENT_SECTIONS}
              sectionTitle={strings.step4}
              icon={this.renderIcon(PROGRESS.SENT_SECTIONS)}
              style={this.renderStyle(PROGRESS.SENT_SECTIONS)}
              onPress={() => this.renderOnPress(PROGRESS.SENT_SECTIONS)}
              sectionInfoText={strings.SendIn}
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
    fontSize: 20,
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

export default connect(mapStateToProps, { setProgress })(HomeScreen);
