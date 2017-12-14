import React, { Component } from 'react'
import { View, TextInput, Animated } from 'react-native'

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: new Animated.Value(18),
      position: new Animated.ValueXY({ x: 9, y: 11 }),
      borderColor: '#000'
    };
  }

  inputSelected() {
    Animated.parallel([
      Animated.timing(this.state.fontSize, { toValue: 10, duration: 150 }),
      Animated.timing(this.state.position, { toValue: { x: 9, y: 0 }, duration: 150 })
    ]).start()
    this.setState({ borderColor: 'rgb(138, 71, 151)' })
  }

  inputDeselected() {
    const { value } = this.props;
    if (value === '') {
      Animated.parallel([
        Animated.timing(this.state.fontSize, { toValue: 18, duration: 150 }),
        Animated.timing(this.state.position, { toValue: { x: 9, y: 11 }, duration: 150 })
      ]).start()
    }
    this.setState({ borderColor: 'black' })
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
      color: 'rgb(138, 71, 151)'
    }
  }

  render() {
    const { inputStyle, containerStyle } = styles
    const { value, width, placeholder, secureText, textInputStyle, autoCorrect = false, extraContainerStyle } = this.props
    return (
      <View style={[containerStyle, extraContainerStyle, { width }]}>
        {placeholder === '' ? null
          : <Animated.Text style={this.getPlaceholderStyle()}>{placeholder}</Animated.Text>}
        <TextInput
          onFocus={() => this.inputSelected()}
          underlineColorAndroid={'transparent'}
          onEndEditing={() => this.inputDeselected()}
          onChangeText={(text) => this.props.onChangeText(text)}
          value={value}
          style={[inputStyle, { width, borderColor: this.state.borderColor }, textInputStyle]}
          secureTextEntry={secureText}
          autoCorrect={autoCorrect}
        />
      </View>
    )
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
    color: '#000'
  }
}

export default Input
