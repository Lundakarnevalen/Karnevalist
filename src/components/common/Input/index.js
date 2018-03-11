import React, { Component } from 'react';
import {
  View,
  TextInput,
  Animated,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';

const getContainerStyle = (props, borderColor) => {
  const { hasError, extraContainerStyle, value, width } = props;
  if (value !== '' && hasError) borderColor = 'red';
  return [styles.containerStyle, extraContainerStyle, { width, borderColor }];
};

const getInputStyle = ({ multiline, extraInputStyle }) => [
  styles.inputStyle,
  { height: multiline ? 133 : 44, paddingTop: multiline ? 15 : 10 },
  extraInputStyle
];

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

  getPlaceholderStyle() {
    const { fontSize, position } = this.state;
    return {
      fontSize,
      backgroundColor: 'transparent',
      fontFamily: 'Avenir Next Medium',
      position: 'absolute',
      top: position.y,
      left: position.x,
      color: this.getTextColor(),
      ...this.props.extraPlaceHolderStyle
    };
  }

  getTextColor() {
    const { hasError, value } = this.props;
    if (value !== '' && hasError) return 'red';
    return '#F7A021';
  }

  focus() {
    this.input.focus();
  }

  addWarningText() {
    const { warningMessage, hasError, value } = this.props;
    if (hasError && value !== '') {
      return <Text style={styles.warningTextStyle}>{warningMessage}</Text>;
    }
    return null;
  }

  inputDeselected() {
    const { value } = this.props;
    if (value === '') {
      Animated.parallel([
        Animated.timing(this.state.fontSize, { toValue: 18, duration: 150 }),
        Animated.timing(this.state.position, {
          toValue: { x: 9, y: 11 },
          duration: 150
        })
      ]).start();
      this.setState({ borderColor: 'black' });
    }
  }

  inputSelected() {
    Animated.parallel([
      Animated.timing(this.state.fontSize, { toValue: 10, duration: 150 }),
      Animated.timing(this.state.position, {
        toValue: { x: 9, y: 0 },
        duration: 150
      })
    ]).start();
    this.setState({ borderColor: '#F7A021' });
  }

  handleOnFocus() {
    if (typeof this.props.scrollToInput !== 'undefined') {
      this.props.scrollToInput(this.state.screenPosition);
    }
    this.inputSelected();
  }

  render() {
    const { iconTouchableStyle, innerContainerStyle } = styles;
    const {
      value,
      placeholder,
      secureText,
      autoCorrect,
      autoCapitalize,
      editable,
      keyboardType,
      multiline,
      numberOfLines,
      returnKeyType,
      onChangeText,
      onSubmitEditing,
      autoFocus,
      icon,
      iconOnPress,
      maxLength
    } = this.props;
    return (
      <View
        onLayout={event =>
          this.setState({
            screenPosition: (multiline ? 200 : 100) + event.nativeEvent.layout.y
          })
        }
        style={getContainerStyle(this.props, this.state.borderColor)}
      >
        {placeholder === '' ? null : (
          <Animated.Text style={this.getPlaceholderStyle()}>
            {placeholder}
          </Animated.Text>
        )}
        {this.addWarningText()}
        <View style={innerContainerStyle}>
          <TextInput
            ref={ref => {
              this.input = ref;
            }}
            onFocus={() => this.handleOnFocus()}
            underlineColorAndroid="transparent"
            onEndEditing={() => this.inputDeselected()}
            onChangeText={text => onChangeText(text)}
            value={value}
            style={getInputStyle(this.props)}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureText}
            autoCorrect={autoCorrect}
            editable={editable}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            blurOnSubmit
            onSubmitEditing={() => onSubmitEditing()}
            autoFocus={autoFocus}
            maxLength={maxLength}
            multiline={multiline}
            numberOfLines={numberOfLines}
          />
          {icon ? (
            <TouchableOpacity style={iconTouchableStyle} onPress={iconOnPress}>
              <FontAwesome name={icon} style={{ color: '#F7A021' }} size={20} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

Input.defaultProps = {
  autoCapitalize: 'sentences',
  autoCorrect: false,
  autoFocus: false,
  editable: true,
  extraContainerStyle: null,
  extraInputStyle: null,
  extraPlaceHolderStyle: null,
  icon: null,
  hasError: false,
  keyboardType: 'default',
  maxLength: 50,
  multiline: false,
  numberOfLines: 1,
  onChangeText: () => {},
  onSubmitEditing: () => {},
  iconOnPress: () => {},
  returnKeyType: null,
  scrollToInput: undefined,
  secureText: false,
  warningMessage: '',
  width: null
};

Input.propTypes = {
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.bool,
  autoFocus: PropTypes.bool,
  extraContainerStyle: PropTypes.shape(),
  extraInputStyle: PropTypes.shape(),
  extraPlaceHolderStyle: PropTypes.shape(),
  editable: PropTypes.bool,
  hasError: PropTypes.bool,
  icon: PropTypes.string,
  iconOnPress: PropTypes.func,
  keyboardType: PropTypes.string,
  maxLength: PropTypes.number,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  returnKeyType: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  scrollToInput: PropTypes.func,
  secureText: PropTypes.bool,
  value: PropTypes.string.isRequired,
  warningMessage: PropTypes.string,
  width: PropTypes.number
};

export { Input };
