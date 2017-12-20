import React, { Component } from 'react';
import { View, TextInput, Animated, Text } from 'react-native';
import { connect } from 'react-redux';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: new Animated.Value(18),
      position: new Animated.ValueXY({ x: 9, y: 11 }),
      borderColor: '#000',
      warningVisible: false
    };
  }

  getThemeColor() {
    switch (this.props.theme) {
      case 'morning':
        return '#F7A021';
      case 'day':
        return 'rgb(138, 71, 151)';
      default:
        return '#F7A021';
    }
  }

  inputSelected() {
    this.setState({ warningVisible: false });
    Animated.parallel([
      Animated.timing(this.state.fontSize, { toValue: 10, duration: 150 }),
      Animated.timing(this.state.position, { toValue: { x: 9, y: 0 }, duration: 150 })
    ]).start();
    this.setState({ borderColor: this.getThemeColor() });
  }

  inputDeselected() {
    const { value, onlyLetters, onlyNumbers, warnIfFalse } = this.props;
    if (value === '') {
      Animated.parallel([
        Animated.timing(this.state.fontSize, { toValue: 18, duration: 150 }),
        Animated.timing(this.state.position, { toValue: { x: 9, y: 11 }, duration: 150 })
      ]).start();
      this.setState({ borderColor: 'black' });
    } else if (onlyLetters) {
      if (!this.containsOnlyLetters(value)) {
        this.doWarn();
      } else {
        this.stopWarn();
      }
    } else if (onlyNumbers) {
      if (!this.containsOnlyNumbers(value)) {
        this.doWarn();
      } else {
        this.stopWarn();
      }
    } else if (warnIfFalse !== undefined) {
      const temp = warnIfFalse(value);
      if (temp === false) this.doWarn();
    }
  }

  doWarn() {
    this.setState({ warningVisible: true });
    this.setState({ borderColor: 'red' });
  }

  stopWarn() {
    this.setState({ borderColor: 'black' });
    this.setState({ warningVisible: false });
  }

  addWarningText() {
    const { warningVisible } = this.state;
    const { warningMessage, onlyLetters, onlyNumbers } = this.props;
    let message = warningMessage;
    if (onlyLetters) {
      message = 'This section may only contain letters';
    } else if (onlyNumbers) {
      message = 'This section may only contain digits';
    }
    if (warningVisible) {
      return <Text style={styles.warningTextStyle}>{message}</Text>;
    }
  }

  containsOnlyNumbers(t) {
    return /^\d+$/.test(t);
  }

  containsOnlyLetters(t) {
    return /^[a-zåäöA-ZÅÄÖ]+$/.test(t);
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
      color: this.getThemeColor()
    };
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
      extraContainerStyle
    } = this.props;
    return (
      <View
        style={[
          containerStyle,
          extraContainerStyle,
          { width, borderColor: this.state.borderColor }
        ]}
      >
        {placeholder === '' ? null : (
          <Animated.Text style={this.getPlaceholderStyle()}>{placeholder}</Animated.Text>
        )}
        {this.addWarningText()}
        <TextInput
          onFocus={() => this.inputSelected()}
          underlineColorAndroid={'transparent'}
          onEndEditing={() => this.inputDeselected()}
          onChangeText={text => this.props.onChangeText(text)}
          value={value}
          style={[inputStyle, { width }, textInputStyle]}
          secureTextEntry={secureText}
          autoCorrect={autoCorrect}
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

const mapStateToProps = ({ currentTheme }) => {
  const { theme } = currentTheme;
  return { theme };
};

export default connect(mapStateToProps, null)(Input);
