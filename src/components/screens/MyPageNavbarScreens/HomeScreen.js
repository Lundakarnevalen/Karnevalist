import React, { Component } from 'react';
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import {
  Header,
  BackgroundImage,
  CountDown,
  Popover,
  SectionListItem,
  SuperAgileAlert
} from '../../common';
import Timeline from '../../common/Timeline';
import { HOME_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';
import { fetchCheckInStatus } from '../../../helpers/ApiManager';
import { getFavoriteSections } from '../../../helpers/LocalSave';
import { setHomeScreenPopover, setProgress } from '../../../actions';

const WIDTH = Dimensions.get('window').width;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: true,
      alertVisible: false
    };
  }

  componentWillMount() {
    this.update();
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
    // console.log(this.props.progress);
    if (popover && this.props.progress >= 2) {
      console.log('test');
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

  renderProgressItemStyle(progressItem) {
    if (this.props.progress >= progressItem) {
      return { textDecorationLine: 'line-through' };
    }
    if (this.props.progress + 1 === progressItem) {
      return { color: '#F7A021', fontWeight: 'bold' };
    }
  }

  update() {
    const { email, token } = this.props;
    this.props.setProgress(1);
    fetchCheckInStatus(email, token, bool => {
      if (true) {
        this.props.setProgress(2);
        getFavoriteSections(sections => {
          if (sections.length >= 5) {
            this.props.setProgress(3);
          }
          if (this.props.sectionPriorities.length > 0) {
            this.props.setProgress(4);
          }
        });
      }
    });
  }

  renderRightIcon() {
    return (
      <TouchableOpacity style={styles.rightIconStyle} onPress={() => this.update()}>
        <MaterialIcons name="refresh" size={30} color={'#fff'} />
      </TouchableOpacity>
    );
  }

  renderIcon(prog) {
    if (this.props.progress >= prog) {
      return 'done';
    }
    if (this.props.progress + 1 === prog) {
      return 'keyboard-arrow-right';
    }
    return;
  }

  renderStyle(prog) {
    if (this.props.progress >= prog) {
      return {
        backgroundColor: 'rgba(255,255,255, 0.4)'
      };
    }
    if (this.props.progress + 1 === prog) {
      return {};
    }
  }

  renderOnPress(prog) {
    if (this.props.progress + 1 === prog) {
      if (prog === 2) {
        this.setState({ alertVisible: true });
      }
      if (prog === 3) {
        this.props.navigation.navigate('Sections');
      }
      if (prog === 4) {
        this.props.navigation.navigate('ConfirmPage');
      }
    }
    return;
  }

  render() {
    const { container, textStyle, textStyleProgress } = styles;
    const { navigation } = this.props;
    const strings = this.getStrings();
    return (
      <View style={{ flex: 1 }}>
        <BackgroundImage pictureNumber={1} />
        <Header
          title={strings.title}
          leftIcon={null}
          rightIcon={this.renderRightIcon()}
          navigation={navigation}
        />
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
            <SectionListItem
              sectionTitle={strings.step1}
              icon={this.renderIcon(1)}
              style={this.renderStyle(1)}
              onPress={() => this.renderOnPress(1)}
              sectionInfoText={strings.createProfile}
            />
            <SectionListItem
              sectionTitle={strings.step2}
              icon={this.renderIcon(2)}
              style={this.renderStyle(2)}
              onPress={() => this.renderOnPress(2)}
              sectionInfoText={strings.CheckIn}
            />
            <SectionListItem
              sectionTitle={strings.step3}
              icon={this.renderIcon(3)}
              style={this.renderStyle(3)}
              onPress={() => this.renderOnPress(3)}
              sectionInfoText={strings.ChooseSections}
            />
            <SectionListItem
              sectionTitle={strings.step4}
              icon={this.renderIcon(4)}
              style={this.renderStyle(4)}
              onPress={() => this.renderOnPress(4)}
              sectionInfoText={strings.SendIn}
            />
          </View>
          <SuperAgileAlert
            alertVisible={this.state.alertVisible}
            setAlertVisible={visible => this.setState({ alertVisible: visible })}
            buttonsIn={1}
            header={strings.CheckIn}
            info={strings.info}
          />
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

export default connect(mapStateToProps, { setProgress } )(HomeScreen);
