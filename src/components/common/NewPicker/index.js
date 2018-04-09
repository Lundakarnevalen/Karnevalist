import React, { Component } from 'react';
import {
  View,
  Picker,
  Animated,
  Keyboard,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { BlurView } from 'expo';
import PropTypes from 'prop-types';
import { WIDTH, IS_IOS, HEIGHT } from '~/src/helpers/Constants';
import { CustomButton } from '~/src/components/common';
import { styles } from './styles';

class NewPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottom: new Animated.Value(-1337),
      height: 0,
      isShowing: false
    };
  }

  componentDidUpdate() {
    if (this.state.isShowing) {
      Animated.timing(this.state.bottom, { toValue: 0 }).start();
    } else {
      Animated.timing(this.state.bottom, {
        toValue: -this.state.height - 22
      }).start();
    }
  }
  renderCloser() {
    return this.state.isShowing ? (
      <TouchableWithoutFeedback
        style={{ position: 'absolute' }}
        onPress={() =>
          this.setState({
            isShowing: false
          })
        }
      >
        <View
          style={{
            position: 'absolute',
            width: WIDTH + 32,
            height: HEIGHT,
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }}
        />
      </TouchableWithoutFeedback>
    ) : null;
  }

  render() {
    const { pickerStyle, androidPicker } = styles;
    const { selectedValue, onValueChange, items, defaultValue } = this.props;
    return IS_IOS ? (
      <View>
        {/* this.renderCloser() */}
        <Modal
          animationType="slide"
          transparent
          visible={this.state.isShowing}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <TouchableWithoutFeedback
            style={{ position: 'absolute' }}
            onPress={() =>
              this.setState({
                isShowing: false
              })
            }
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: 'white',
              height: HEIGHT / 2,
              width: WIDTH + 32
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <CustomButton
                text="OK"
                style="standardButton"
                width={WIDTH - 50}
                onPress={() => this.setState({ isShowing: false })}
              />
            </View>
            <Picker
              onValueChange={itemValue => onValueChange(itemValue)}
              selectedValue={selectedValue}
            >
              {items.map(item => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
          </View>
        </Modal>

        <CustomButton
          text={selectedValue === '' ? `${defaultValue}*` : selectedValue}
          style="dropDownButton"
          width={WIDTH}
          onPress={() => {
            Keyboard.dismiss();
            this.setState({ isShowing: true });
          }}
        />
      </View>
    ) : (
      <View>
        <Picker
          onValueChange={item => {
            onValueChange(item);
          }}
          selectedValue={selectedValue === '' ? defaultValue : selectedValue}
          style={androidPicker}
        >
          <Picker.Item label={defaultValue} value="" />
          {items.map(item => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
        {this.renderCloser()}
      </View>
    );
  }
}
NewPicker.defaultProps = {
  defaultValue: ''
};

NewPicker.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]).isRequired,
  onValueChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ])
};
export { NewPicker };
