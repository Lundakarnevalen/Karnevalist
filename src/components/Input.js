import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      borderColor: '#000'
    }
  }

  getTitle() {
    const { textStyle } = styles
    const { title } = this.props
    if (title) {
      return (
        <Text
          style={textStyle}
        >
          {title}
        </Text>
      )
    }
  }

  onBlur() {
    if (this.state.value === '') {
      this.setState({
        borderColor: 'red'
      })
    } else {
      this.setState({
        borderColor: '#000'
      })
    }
  }

  render() {
    const { inputStyle } = styles
    const { width, placeholder, secureText, autoCorrect = false } = this.props
    return (
      <View>
        {this.getTitle()}
        <TextInput
          onBlur={() => this.onBlur()}
          onChangeText={(value) => this.setState({ value })}
          value={this.state.value}
          placeholder={placeholder}
          style={[inputStyle, { width, borderColor: this.state.borderColor }]}
          secureTextEntry={secureText}
          autoCorrect={autoCorrect}
        />
      </View>
    )
  }

}

const styles = {
  textStyle: {
    paddingLeft: 6,
    paddingBottom: 3,
    fontSize: 16
  },
  inputStyle: {
    height: 44,
    paddingLeft: 8,
    paddingRight: 8,
    color: '#000',
    backgroundColor: '#ecf0f1',
    borderRadius: 6,
    borderWidth: 1
	}
}

export default Input
