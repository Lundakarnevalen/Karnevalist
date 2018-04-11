import React, { Component } from 'react';
import { Dimensions, Text, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';
// import { CAMERA_STRINGS } from '../../helpers/LanguageStrings';

const SIZE = Dimensions.get('window').width * 0.6;
/**
 * Loading class with redirect.
 * If redirect isn't needed redirect should be set to null.
 */
class CameraButton extends Component {
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

  render() {
    const { containerStyle } = styles;
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        style={[containerStyle, { borderColor: 'white' }]}
      >
        {this.renderPictureOrInfo()}
      </TouchableOpacity>
    );
  }
}

const styles = {
  containerStyle: {
    width: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: SIZE,
    borderWidth: 1,
    alignSelf: 'center',
    margin: 25
  },
  textStyle: {
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold',
    textAlign: 'center',
    fontSize: 24
  },
  imageStyle: {
    width: SIZE - 1,
    height: SIZE - 1,
    position: 'absolute',
    resizeMode: 'cover'
  }
};

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, null)(CameraButton);
