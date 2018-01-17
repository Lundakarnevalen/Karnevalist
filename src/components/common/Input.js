import React, { Component } from 'react';
import { View, TextInput, Animated } from 'react-native';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: new Animated.Value(18),
      position: new Animated.ValueXY({ x: 9, y: 11 }),
      borderColor: '#000',
      screenPosition: null
    };
  }

  componentWillMount() {
    if (this.props.value !== '') this.inputSelected();
  }

  inputSelected() {
    Animated.parallel([
      Animated.timing(this.state.fontSize, { toValue: 10, duration: 150 }),
      Animated.timing(this.state.position, { toValue: { x: 9, y: 0 }, duration: 150 })
    ]).start();
    this.setState({ borderColor: '#F7A021' });
  }

  inputDeselected() {
    const { value } = this.props;
    if (value === '') {
      Animated.parallel([
        Animated.timing(this.state.fontSize, { toValue: 18, duration: 150 }),
        Animated.timing(this.state.position, { toValue: { x: 9, y: 11 }, duration: 150 })
      ]).start();
    }
    this.setState({ borderColor: 'black' });
  }

  getPlaceholderStyle() {
    const { fontSize, position } = this.state;
    return {
      fontSize,
      backgroundColor: 'transparent',
      fontFamily: 'Avenir Next Medium',
      position: 'absolute',
      top: position.y,
      left: position.x,
      color: '#F7A021'
    };
  }

  focus() {
    this.refs.input.focus();
  }

  render() {
    const { inputStyle, containerStyle } = styles;
    const {
      value,
      width,
      placeholder,
      secureText,
      textInputStyle,
      autoCorrect = false,
      editable = true,
      keyboardType = 'default',
      extraContainerStyle,
      returnKeyType,
      onSubmitEditing = () => {},
      autoFocus = false
    } = this.props;
    return (
      <View
        onLayout={event => this.setState({ screenPosition: 100 + event.nativeEvent.layout.y })}
        style={[
          containerStyle,
          extraContainerStyle,
          { width, borderColor: this.state.borderColor }
        ]}
      >
        {placeholder === '' ? null : (
          <Animated.Text style={this.getPlaceholderStyle()}>{placeholder}</Animated.Text>
        )}
        <TextInput
          ref={'input'}
          onFocus={() => {
            if (typeof this.props.scrollToInput !== 'undefined') {
              this.props.scrollToInput(this.state.screenPosition);
            }
            this.inputSelected();
          }}
          underlineColorAndroid={'transparent'}
          onEndEditing={() => this.inputDeselected()}
          onChangeText={text => this.props.onChangeText(text)}
          value={value}
          style={[inputStyle, { width }, textInputStyle]}
          autoCapitalize={'words'}
          secureTextEntry={secureText}
          autoCorrect={autoCorrect}
          editable={editable}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          blurOnSubmit
          onSubmitEditing={() => onSubmitEditing()}
          autoFocus={autoFocus}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 2,
    borderWidth: 1
  },
  inputStyle: {
    height: 44,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    color: '#000',
    fontFamily: 'Avenir Next Medium'
  }
};

export default Input;
