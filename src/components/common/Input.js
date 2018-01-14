import React, { Component } from 'react';
import { View, TextInput, Animated, Text } from 'react-native';
import { connect } from 'react-redux';
import { ERROR_MSG_INPUT_FIELD } from '../../helpers/LanguageStrings';

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

  componentWillMount() {
    if (this.props.value !== '') this.inputSelected();
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

  getStrings() {
    const { language } = this.props;
    const { fields } = ERROR_MSG_INPUT_FIELD;
    const strings = {};
    fields.forEach(field => (strings[field] = ERROR_MSG_INPUT_FIELD[field][language]));
    return strings;
  }

  inputSelected() {
    this.setState({ warningVisible: false, borderColor: this.getThemeColor() });
    Animated.parallel([
      Animated.timing(this.state.fontSize, { toValue: 10, duration: 150 }),
      Animated.timing(this.state.position, { toValue: { x: 9, y: 0 }, duration: 150 })
    ]).start();
  }

  inputDeselected() {
    const { value } = this.props;
    if (value === '') {
      Animated.parallel([
        Animated.timing(this.state.fontSize, { toValue: 18, duration: 150 }),
        Animated.timing(this.state.position, { toValue: { x: 9, y: 11 }, duration: 150 })
      ]).start();
      this.setState({ borderColor: 'black' });
    } else {
      this.checkWarningConditions();
    }
  }

  checkWarningConditions() {
    const { value, restriction } = this.props;
    switch (restriction) {
      case 'onlyLetters':
        if (this.containsOnlyLetters(value)) this.stopWarn();
        else this.doWarn();
        break;
      case 'onlyDigits':
        if (this.containsOnlyDigits(value)) this.stopWarn();
        else this.doWarn();
        break;
      case 'isEmail':
        if (this.isEmail(value)) this.stopWarn();
        else this.doWarn();
        break;
      case 'isValidPwd':
      if (this.isValidPwd(value)) this.stopWarn();
      else this.doWarn();
      break;
      default:
        break;
    }
    if (typeof restriction === 'function') {
      const result = restriction(value);
      if (result === false) this.doWarn();
    }
  }

  doWarn() {
    this.setState({ warningVisible: true, borderColor: 'red' });
  }

  stopWarn() {
    this.setState({ warningVisible: false, borderColor: 'black' });
  }

  addWarningText() {
    const { warningVisible } = this.state;
    const { warningMessage, restriction, language } = this.props;
    const strings = this.getStrings();
    let message = '';
    if (warningMessage !== undefined && warningVisible) {
      switch (language) {
        case 'SE':
          message = warningMessage[0];
          break;
        case 'EN':
          message = warningMessage[1];
          break;
        default:
          break;
      }
    } else if (warningVisible) {
      switch (restriction) {
        case 'onlyLetters':
          message = strings.errorMsgOnlyLetters;
          break;
        case 'onlyDigits':
          message = strings.errorMsgOnlyDigits;
          break;
        case 'isEmail':
          message = strings.errorMsgEmail;
          break;
        case 'isValidPwd':
        message = strings.errorMsgPwd;
        break;
        default:
          break;
      }
    }
    return <Text style={styles.warningTextStyle}>{message}</Text>;
  }

  containsOnlyDigits(t) {
    return /^\d+$/.test(t);
  }

  containsOnlyLetters(t) {
    return /^[a-zåäöA-ZÅÄÖ]+$/.test(t);
  }
  isEmail(t) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t);
  }
  isValidPwd(t) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(t);
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
      editable = true,
      keyboardType = 'default',
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
          autoCapitalize="words"
          secureTextEntry={secureText}
          autoCorrect={autoCorrect}
          editable={editable}
          keyboardType={keyboardType}
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

const mapStateToProps = ({ currentTheme, currentLanguage }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  return { theme, language };
};

export default connect(mapStateToProps, null)(Input);
