import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BackgroundImage, Loading, Header } from '~/src/components/common';
import { KARNEVAL_ID_SCREEN_STRINGS } from '~/src/helpers/LanguageStrings';
import { getStrings } from '~/src/helpers/functions';
import { HEIGHT } from '~/src/helpers/Constants';

class KarnevalIDScreen extends Component {
  render() {
    const strings = getStrings(this.props.language, KARNEVAL_ID_SCREEN_STRINGS);
    const { container } = styles;
    return (
      <View>
        <BackgroundImage pictureNumber={4} />
        <Header title={strings.title} />
        <Text>COMING SOON</Text>
        <View style={container}>
          <Loading loadingComplete={false} redirect={null} />
        </View>
      </View>
    );
  }
}
const styles = {
  container: {
    height: HEIGHT - 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

KarnevalIDScreen.propTypes = {
  language: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(KarnevalIDScreen);
