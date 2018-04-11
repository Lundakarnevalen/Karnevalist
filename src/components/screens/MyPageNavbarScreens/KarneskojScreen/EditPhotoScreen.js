import React, { Component } from 'react';
import { Dimensions, Text, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { CustomButton } from '~/src/components/common';
import { WIDTH, HEIGHT } from '~/src/helpers/Constants';
// import { CAMERA_STRINGS } from '../../helpers/LanguageStrings';
import { MaterialIcons } from '@expo/vector-icons';
import { takeSnapshotAsync } from 'expo';
import { setPicture } from '~/src/actions';

const SIZE = Dimensions.get('window').width * 0.6;
/**
 * Loading class with redirect.
 * If redirect isn't needed redirect should be set to null.
 */
class EditPhotoscreen extends Component {
  // getColor() {
  //   switch (this.props.theme) {
  //     case 'day':
  //       return 'rgb(138, 71, 151)';
  //     case 'morning':
  //       return '#F7A021';
  //     default:
  //       return 'white';
  //   }
  // }
  // getStrings() {
  //   const { language } = this.props;
  //   const { fields } = CAMERA_STRINGS;
  //   const strings = {};
  //   fields.forEach(field => (strings[field] = CAMERA_STRINGS[field][language]));
  //   return strings;
  // }

  renderPictureOrInfo() {
    const { textStyle, imageStyle } = styles;
    const { source } = this.props;
    // const strings = this.getStrings();
    if (source === null || source === undefined) {
      return (
        <View>
          <Text style={[textStyle, { color: 'white' }]}>Take</Text>
          <Text style={[textStyle, { color: 'white' }]}>YOur</Text>
          <Text style={[textStyle, { color: 'white' }]}>Picutre</Text>
        </View>
      );
    }
    return <Image source={{ uri: source }} style={imageStyle} />;
  }
  async sendPhoto() {
    let result = await takeSnapshotAsync(this.image, {
      format: 'png',
      result: 'file'
    });
    this.props.setPicture(result);
  }

  render() {
    const { picture } = this.props;
    const { containerStyle } = styles;
    return (
      <View style={containerStyle} onPress={() => this.props.onPress()}>
        <View
          style={{
            width: WIDTH,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            height: HEIGHT
          }}
          ref={view => {
            this.image = view;
          }}
        >
          <Image source={{ uri: picture }} style={styles.imageStyle} />
          <Text
            style={{
              position: 'absolute',
              top: 200,
              fontSize: 40,
              color: 'yellow'
            }}
          >
            HEJDASDSADASDA
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{ position: 'absolute', left: 10, top: 30, zIndex: 10 }}
        >
          <MaterialIcons name="clear" size={30} color="white" />
        </TouchableOpacity>
        <View style={{ position: 'absolute', bottom: -10 }}>
          <CustomButton
            onPress={() => this.sendPhoto()}
            text="Send"
            style="standardButton"
            width={WIDTH}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    width: WIDTH,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: HEIGHT
  },
  textStyle: {
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold',
    textAlign: 'center',
    fontSize: 24
  },
  imageStyle: {
    width: WIDTH - 1,
    height: HEIGHT - 1,
    position: 'absolute',
    resizeMode: 'cover'
  }
};

const mapStateToProps = ({ currentLanguage, userInformation }) => {
  const { language } = currentLanguage;
  const { picture } = userInformation;
  return { language, picture };
};

export default connect(mapStateToProps, {
  setPicture
})(EditPhotoscreen);
