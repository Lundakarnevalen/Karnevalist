import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../common/Header';
import CustomButton from '../../common/CustomButton';
import BackgroundImage from '../../common/BackgroundImage';
import CountDown from '../../common/countDown/CountDown';
import { HOME_SCREEN_STRINGS } from '../../../helpers/LangStrings';

const WIDTH = Dimensions.get('window').width;

class HomeScreen extends Component {

  getStrings() {
    const { lang } = this.props
    const { fields } = HOME_SCREEN_STRINGS
    const strings = {}
    fields.forEach(field => (strings[field] = HOME_SCREEN_STRINGS[field][lang]))
    return strings
  }

  render() {
    const { container } = styles;
    const { navigation } = this.props
    const strings = this.getStrings()
    return (
      <View>
        <BackgroundImage pictureNumber={3} />
        <Header title={strings.title} leftIcon={null} navigation={navigation} />
        <View style={container}>
          <CountDown />
          <CustomButton
            style={'standardButton'}
            width={WIDTH - 50}
            text={strings.buttonText}
            onPress={() => navigation.navigate('Sections')}
          />
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

const mapStateToProps = ({ currentTheme, currentLang }) => {
  const { theme } = currentTheme;
  const { lang } = currentLang;
  return { theme, lang };
};

export default connect(mapStateToProps, null)(HomeScreen);
