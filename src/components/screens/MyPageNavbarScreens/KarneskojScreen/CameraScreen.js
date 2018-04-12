import React from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Camera, Permissions } from 'expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { setPicture } from '~/src/actions';
import images from '~/assets/images';

const WIDTH = Dimensions.get('window').width;
const flashToggle = {
  off: 'auto',
  auto: 'on',
  on: 'off'
};
class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photo: null,
    flash: 'off'
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snap() {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      this.props.navigation.navigate('EditPhoto', { uri: photo.uri });
    }
  }
  getFlashIcon() {
    switch (this.state.flash) {
      case 'on':
        return 'flash-on';
      case 'off':
        return 'flash-off';
      case 'auto':
        return 'flash-auto';
      default:
        return 'flash-off';
    }
  }

  render() {
    const { hasCameraPermission, type, photo } = this.state;
    const {
      innerContainerStyle,
      flipCameraStyle,
      snapPictureStyle,
      imageStyle,
      cancelStyle,
      flashCamerastyle
    } = styles;
    const { front, back } = Camera.Constants.Type;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={type}
          flashMode={this.state.flash}
          ref={ref => {
            this.camera = ref;
          }}
        >
          <Image style={imageStyle} source={images.karlKlocka} />
          <View style={innerContainerStyle}>
            <TouchableOpacity
              style={flashCamerastyle}
              onPress={() => {
                this.setState({ flash: flashToggle[this.state.flash] });
              }}
            >
              <MaterialIcons
                name={this.getFlashIcon()}
                size={WIDTH / 7}
                color={'white'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={flipCameraStyle}
              onPress={() =>
                this.setState({ type: type === back ? front : back })
              }
            >
              <MaterialIcons name={'cached'} size={WIDTH / 7} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={cancelStyle}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>
                {this.props.language === 'SE' ? 'Avbryt' : 'Cancel'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={snapPictureStyle}
              onPress={() => this.snap()}
            >
              <MaterialIcons
                name={'brightness-1'}
                size={WIDTH / 5}
                color={'yellow'}
                style={{ borderColor: 'white' }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = {
  innerContainerStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  flipCameraStyle: {
    position: 'absolute',
    top: 20,
    right: 15
  },
  flashCamerastyle: {
    position: 'absolute',
    top: 20,
    left: 15
  },
  flipCameraTextStyle: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white'
  },
  imageStyle: {
    width: 210,
    height: 360,
    resizeMode: 'cover',
    position: 'absolute',
    left: WIDTH - 120
  },
  snapPictureStyle: {
    position: 'absolute',
    bottom: 20,
    left: WIDTH * 0.4
  },
  cancelStyle: {
    position: 'absolute',
    bottom: 40,
    left: 30
  }
};
const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return {
    language
  };
};
export default connect(mapStateToProps, { setPicture })(CameraScreen);
