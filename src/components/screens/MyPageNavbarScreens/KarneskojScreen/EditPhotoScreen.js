import React, { Component } from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Animated,
  PanResponder
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
      text: '',
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1)
    };
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
        this.state.pan.setValue({ x: 0, y: 0 });
        Animated.spring(this.state.scale, {
          toValue: 1.1,
          friction: 3
        }).start();
      },

      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),

      onPanResponderRelease: e => {
        // Flatten the offset to avoid erratic behavior
        this.state.pan.flattenOffset();
        Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();
      }
    });
  }

  async sendPhoto() {
    let result = await takeSnapshotAsync(this.image, {
      format: 'png',
      result: 'file'
    });
    this.props.setPicture(result);
    this.props.navigation.dispatch(CAMERA_RESET_ACTION);
  }
  handleInputToggle() {
    const newEditing = !this.state.editing;
    if (this.state.editing) {
      this.input.blur();
    }
    this.setState({ editing: newEditing });
  }
  render() {
    const { uri } = this.props.navigation.state.params;
    const {
      containerStyle,
      inputStyle,
      imageStyle,
      clearButtonStyle,
      viewStyle
    } = styles;
    // Destructure the value of pan from the state
    const { pan, scale } = this.state;

    // Calculate the x and y transform from the pan value
    const [translateX, translateY] = [pan.x, pan.y];
    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    const inputViewStyle = {
      ...viewStyle,
      height: Math.max(45, this.state.height),
      transform: [{ translateX }, { translateY }, { scale }]
    };
    const textInputStyle = {
      ...inputStyle,
      height: Math.max(45, this.state.height)
    };
    return (
      <TouchableWithoutFeedback
        style={containerStyle}
        onPress={() => this.handleInputToggle()}
      >
        <View>
          <View style={containerStyle} ref={view => (this.image = view)}>
            <Image source={{ uri }} style={imageStyle} />
            {this.state.editing || this.state.text ? (
              <Animated.View
                style={inputViewStyle}
                {...this._panResponder.panHandlers}
              >
                <TextInput
                  ref={input => (this.input = input)}
                  style={textInputStyle}
                  autoFocus
                  onContentSizeChange={event => {
                    this.setState({
                      height: event.nativeEvent.contentSize.height + 10
                    });
                  }}
                  placeHolder="Text..."
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                  maxLength={50}
                  multiline
                  underlineColorAndroid="rgba(0,0,0,0)"
                />
              </Animated.View>
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
    padding: 10,
    backgroundColor: PINK,
    fontSize: 25,
    color: 'white',
    width: 150,
    zIndex: 3
  },
  clearButtonStyle: {
    position: 'absolute',
    left: 10,
    top: 30,
    zIndex: 10
  },
  viewStyle: {
    top: HEIGHT / 2 - 50,
    width: 150,
    position: 'absolute'
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
