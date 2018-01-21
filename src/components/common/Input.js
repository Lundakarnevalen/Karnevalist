import React, { Component } from 'react';
import { View, TextInput, Animated, Text } from 'react-native';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: new Animated.Value(18),
      position: new Animated.ValueXY({ x: 9, y: 11 }),
      borderColor: '#000'
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
      this.setState({ borderColor: 'black' });
    }
  }

  addWarningText() {
    const { warningMessage, hasError = false, value } = this.props;
    if (hasError && value !== '') {
      return <Text style={styles.warningTextStyle}>{warningMessage}</Text>;
    }
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

  getBorderColor() {
    const { hasError, value } = this.props;
    if (value !== '' && hasError) return 'red';
    return this.state.borderColor;
  }

  getTextColor() {
    const { hasError, value } = this.props;
    if (value !== '' && hasError) return 'red';
    return '#F7A021';
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
      autoCapitalize = 'sentences',
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
        style={[containerStyle, extraContainerStyle, { width, borderColor: this.getBorderColor() }]}
      >
        {placeholder === '' ? null : (
          <Animated.Text style={[this.getPlaceholderStyle(), { color: this.getTextColor() }]}>
            {placeholder}
          </Animated.Text>
        )}
        {this.addWarningText()}
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
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureText}
          autoCorrect={autoCorrect}
          editable={editable}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          blurOnSubmit
          onSubmitEditing={() => onSubmitEditing()}
          autoFocus={autoFocus}
          maxLength={50}
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
  },
  warningTextStyle: {
    color: 'red',
    fontSize: 10,
    position: 'absolute',
    right: 5,
    fontFamily: 'Avenir Next Medium'
  }
};

export { Input };
