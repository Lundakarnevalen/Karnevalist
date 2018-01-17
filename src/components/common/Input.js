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

  getStrings() {
    const { language } = this.props;
    const { fields } = ERROR_MSG_INPUT_FIELD;
    const strings = {};
    console.log(fields);
    fields.forEach(field => (strings[field] = ERROR_MSG_INPUT_FIELD[field][language]));
    return strings;
  }

  inputSelected() {
    this.setState({ warningVisible: false });
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
    const { warningMessage = '', language, hasError = false } = this.props;
    let errorMsg = '';
    if (hasError) {
      switch (language) {
        case 'SE':
          errorMsg = warningMessage[0];
          break;
        case 'EN':
          errorMsg = warningMessage[1];
          break;
        default:
          break;
      }
    }
    return <Text style={styles.warningTextStyle}>{errorMsg}</Text>;
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
      autoFocus = false,
      hasError = false
    } = this.props;
    return (
      <View
        onLayout={event => this.setState({ screenPosition: 100 + event.nativeEvent.layout.y })}
        style={[
          containerStyle,
          extraContainerStyle,
          { width, borderColor: hasError ? 'red' : this.state.borderColor }
        ]}
      >
        {placeholder === '' ? null : (
          <Animated.Text
            style={[this.getPlaceholderStyle(), { color: hasError ? 'red' : '#F7A021' }]}
          >
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
          autoCapitalize={'words'}
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

const mapStateToProps = ({ currentTheme, currentLanguage }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  return { theme, language };
};

export default connect(mapStateToProps, null)(Input);
