import React, { Component } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import CustomButton from '../common/CustomButton';
import Header from '../common/Header';
import ExpandeblePanel from '../common/ExpandeblePanel';
import BackgroundImage from '../common/BackgroundImage';
import { REGISTRATION_INFO_SCREEN_STRINGS } from '../../helpers/LanguageStrings'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class RegistrationInfoScreen extends Component {

  getColor() {
    return '#F7A021';
  }

  getStrings() {
    const { language } = this.props
    const { fields } = REGISTRATION_INFO_SCREEN_STRINGS
    const strings = {}
    fields.forEach(field => (strings[field] = REGISTRATION_INFO_SCREEN_STRINGS[field][language]))
    return strings
  }

  render() {
    const { titelTextStyle, containerStyle, imageStyle, textStyle } = styles;
    const { theme, navigation } = this.props;
    const strings = this.getStrings()
    const image1 = (
      <MaterialCommunityIcons
        name="numeric-1-box-outline"
        color={this.getColor()}
        style={imageStyle}
        size={90}
      />
    );
    const image2 = (
      <MaterialCommunityIcons
        name="numeric-2-box-outline"
        color={this.getColor()}
        style={imageStyle}
        size={90}
      />
    );
    const image3 = (
      <MaterialCommunityIcons
        name="numeric-3-box-outline"
        color={this.getColor()}
        style={imageStyle}
        size={90}
      />
    );

    const closeButton = (
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <MaterialCommunityIcons size={30} name="close" color={this.getColor()} />
      </TouchableOpacity>
    );

    return (
      <View>
        <BackgroundImage pictureNumber={4} />
        <Header title={strings.title} rightIcon={closeButton} />
        <ScrollView style={{ height: HEIGHT - 64 }}>
          <View style={containerStyle}>
            <Text style={[titelTextStyle, { color: theme === 'night' ? 'white' : 'black' }]}>
              {strings.header}
            </Text>
            <ScrollView>
              <ExpandeblePanel title={strings.panelTitle1} image={image1}>
                <Text style={textStyle}>
                  {strings.infoText1}
                </Text>
              </ExpandeblePanel>
            </ScrollView>
            <ScrollView>
              <ExpandeblePanel title={strings.panelTitle2} image={image2}>
                <Text style={textStyle}>
                  {strings.infoText2}
                </Text>
              </ExpandeblePanel>
            </ScrollView>
            <ScrollView>
              <ExpandeblePanel title={strings.panelTitle3} image={image3}>
                <Text style={textStyle}> {strings.infoText3} </Text>
              </ExpandeblePanel>
            </ScrollView>
            <CustomButton
              style="standardButton"
              text={strings.buttonText}
              width={WIDTH - 50}
              onPress={() => {
                navigation.goBack(null);
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  imageStyle: {
    backgroundColor: 'transparent'
  },
  containerStyle: {
    alignItems: 'center',
    paddingTop: 15
  },
  titelTextStyle: {
    fontSize: 25,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: 'Avenir Next Bold'
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Medium'
  }
};

const mapStateToProps = ({ currentTheme, currentLanguage }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  return { theme, language };
};

export default connect(mapStateToProps, null)(RegistrationInfoScreen);
