import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Header, BackgroundImage, CountDown } from '../../common';
import Timeline from '../../common/Timeline';
import { HOME_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';
import { PROGRESS } from '../../../helpers/Constants';
import { setSections, setSectionPriorities, setProgress } from '../../../actions';
import { getFavoriteSections } from '../../../helpers/LocalSave'


const WIDTH = Dimensions.get('window').width;

class HomeScreen extends Component {
  getStrings() {
    const { language } = this.props;
    const { fields } = HOME_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = HOME_SCREEN_STRINGS[field][language]));
    return strings;
  }

  render() {
    const { container } = styles;
    const { navigation, screenProps } = this.props;
    const strings = this.getStrings();
    // console.log(this.props.sections.length);
    return (
      <View>
        <BackgroundImage pictureNumber={1} />
        <Header title={strings.title} leftIcon={null} navigation={navigation} />
        <View style={{ height: 20 }} />
        <View style={container}>
          <CountDown />
          <Timeline navigation={navigation} screenProps={screenProps} />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
    width: WIDTH,
    marginTop: 15
  }
};

const mapStateToProps = ({ currentLanguage, sections }) => {
  const { language } = currentLanguage;
  return { language, sectionPrio: sections.sectionPriorities };
};

export default connect(mapStateToProps, { setProgress })(HomeScreen);
