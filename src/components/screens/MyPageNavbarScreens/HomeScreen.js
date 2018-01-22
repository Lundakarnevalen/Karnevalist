import React, { Component } from 'react';
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { Header, BackgroundImage, CountDown, Popover } from '../../common';
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
      animate: true
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
    console.log(this.props.progress);
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

  render() {
    const { container, textStyle, textStyleProgress } = styles;
    const { navigation } = this.props;
    const strings = this.getStrings();
    // console.log(this.props.sections.length);
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
          <Text style={textStyleProgress}>Du är just nu </Text>
          <Progress.Circle
            borderWidth={6}
            thickness={12}
            textStyle={{ fontSize: 35, fontWeight: 'bold' }}
            progress={this.renderProgress()}
            formatText={() => this.animateProgress()}
            size={140}
            showsText
            color={'#FFF'}
          />
          <Text style={textStyleProgress}>Karnevalist</Text>

          <View>
            <Text style={[textStyle, this.renderProgressItemStyle(1)]}>1. Skapa profil</Text>
            <Text style={[textStyle, this.renderProgressItemStyle(2)]}>2. Checka in</Text>
            <Text style={[textStyle, this.renderProgressItemStyle(3)]}>
              3. Välj minst 5 sektioner
            </Text>
            <Text style={[textStyle, this.renderProgressItemStyle(4)]}>4. Skicka in dina val</Text>
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
    width: WIDTH
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
    fontSize: 25,
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

<<<<<<< HEAD
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
=======
const mapStateToProps = ({ currentLanguage, sections }) => {
  const { language } = currentLanguage;
  return { language, sectionPrio: sections.sectionPriorities };
>>>>>>> 213bdee84b0c670a4a17873b23f3650352c50bfc
};

export default connect(mapStateToProps, { setProgress })(HomeScreen);
