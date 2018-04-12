import React, { Component } from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { CustomButton } from '~/src/components/common';
import {
  WIDTH,
  HEIGHT,
  CAMERA_RESET_ACTION,
  PINK
} from '~/src/helpers/Constants';
import { MaterialIcons } from '@expo/vector-icons';
import { takeSnapshotAsync } from 'expo';
import { setPicture } from '~/src/actions';

class EditPhotoscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      text: ''
    };
  }
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
    const { containerStyle, inputStyle, imageStyle, clearButtonStyle } = styles;
    return (
      <TouchableWithoutFeedback
        style={containerStyle}
        onPress={() => this.setState({ editing: !this.state.editing })}
      >
        <View>
          <View
            style={containerStyle}
            ref={view => {
              this.image = view;
            }}
          >
            <Image source={{ uri }} style={imageStyle} />
            {this.state.editing || this.state.text ? (
              <TextInput
                style={[
                  inputStyle,
                  {
                    height: Math.max(45, this.state.height)
                  }
                ]}
                autoFocus
                onContentSizeChange={event => {
                  this.setState({
                    height: event.nativeEvent.contentSize.height
                  });
                }}
                placeHolder="Text..."
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                maxLength={50}
                multiline
                underlineColorAndroid="rgba(0,0,0,0)"
              />
            ) : null}
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={clearButtonStyle}
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
      </TouchableWithoutFeedback>
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
  },
  inputStyle: {
    position: 'absolute',
    top: HEIGHT / 2 - 50,
    padding: 10,
    backgroundColor: PINK,
    fontSize: 25,
    color: 'white',
    width: 150
  },
  clearButtonStyle: {
    position: 'absolute',
    left: 10,
    top: 30,
    zIndex: 10
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
