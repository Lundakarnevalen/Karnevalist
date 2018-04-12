import React, { Component } from 'react';
import { Dimensions, Text, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { CustomButton } from '~/src/components/common';
import { WIDTH, HEIGHT, CAMERA_RESET_ACTION } from '~/src/helpers/Constants';
import { MaterialIcons } from '@expo/vector-icons';
import { takeSnapshotAsync } from 'expo';
import { setPicture } from '~/src/actions';

class EditPhotoscreen extends Component {
  async sendPhoto() {
    let result = await takeSnapshotAsync(this.image, {
      format: 'png',
      result: 'file'
    });
    this.props.setPicture(result);
    this.props.navigation.dispatch(CAMERA_RESET_ACTION);
  }

  render() {
    const { uri } = this.props.navigation.state.params;
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
          <Image source={{ uri }} style={styles.imageStyle} />
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
