import React, { Component } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  CustomButton,
  Header,
  ExpandeblePanel,
  BackgroundImage
} from '../common';
import { REGISTRATION_INFO_SCREEN_STRINGS } from '../../helpers/LanguageStrings';
import { HEIGHT, WIDTH } from '../../helpers/Constants';
import { getStrings } from '../../helpers/functions';

class RegistrationInfoScreen extends Component {
  getColor() {
    return '#F7A021';
  }

  getLanguageStrings() {
    return getStrings(this.props.language, REGISTRATION_INFO_SCREEN_STRINGS);
  }

  render() {
    const { titelTextStyle, containerStyle, imageStyle, textStyle } = styles;
    const { navigation } = this.props;
    const strings = this.getLanguageStrings();
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
        <MaterialCommunityIcons
          size={30}
          name="close"
          color={this.getColor()}
        />
      </TouchableOpacity>
    );

    return (
      <View>
        <BackgroundImage pictureNumber={4} />
        <Header title={strings.title} rightIcon={closeButton} />
        <ScrollView style={{ height: HEIGHT - 64 }}>
          <View style={containerStyle}>
            <Text style={[titelTextStyle, { color: 'white' }]}>
              {strings.header}
            </Text>
            <ScrollView>
              <ExpandeblePanel title={strings.panelTitle1} image={image1}>
                <Text style={textStyle}>{strings.infoText1}</Text>
              </ExpandeblePanel>
            </ScrollView>
            <ScrollView>
              <ExpandeblePanel title={strings.panelTitle2} image={image2}>
                <Text style={textStyle}>{strings.infoText2}</Text>
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

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, null)(RegistrationInfoScreen);
