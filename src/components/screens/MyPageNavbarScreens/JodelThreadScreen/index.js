import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  Header,
  BackgroundImage,
  JodelItem
} from '~/src/components/common';
import { JODEL_SCREEN_STRINGS } from '~/src/helpers/LanguageStrings';
import { setPopover, setProgress } from '~/src/actions';
import { getStrings } from '~/src/helpers/functions';

class JodelThread extends Component {

  getLanguageStrings() {
    return getStrings(this.props.language, JODEL_SCREEN_STRINGS);
  }

  render() {
    const { navigation } = this.props;
    const strings = this.getLanguageStrings();
    return (
      <View style={{ flex: 1 }}>
        <BackgroundImage pictureNumber={1} />
        <Header title={strings.title} />
        <View style={{marginTop:2, flexDirection: 'row', marginBottom: 10}}>
          <JodelItem
            title={strings.Place}
            icon="location-on"
            onPress={() => navigation.navigate('JodelThread')}
            text={strings.Placeholder}
          />
        </View>
      </View>
    );
  }
}

JodelThread.propTypes = {
  language: PropTypes.string.isRequired,
  navigation: PropTypes.shape().isRequired
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
  JodelThread
);
