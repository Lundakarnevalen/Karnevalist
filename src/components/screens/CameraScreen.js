import React from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Camera, Permissions } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { setPicture } from '../../actions';

const WIDTH = Dimensions.get('window').width;

class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snap() {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      this.props.setPicture(photo.uri);
    }
  }

  render() {
    const { hasCameraPermission, type } = this.state;
    const { innerContainerStyle, flipCameraStyle, snapPictureStyle, imageStyle } = styles;
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
          ref={ref => {
            this.camera = ref;
          }}
        >
          <Image
            style={imageStyle}
            source={require('../../../assets/images/Kaffe_Karl_Klocka.png')}
          />
          <View style={innerContainerStyle}>
            <TouchableOpacity
              style={flipCameraStyle}
              onPress={() => {
                this.setState({ type: type === back ? front : back });
              }}
            >
              <Ionicons name={'ios-reverse-camera-outline'} size={WIDTH / 7} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={snapPictureStyle} onPress={() => this.snap()}>
              <Entypo name={'circle'} size={WIDTH / 5} color={'white'} />
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
    top: 5,
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
  }
};

export default connect(null, { setPicture })(CameraScreen);
