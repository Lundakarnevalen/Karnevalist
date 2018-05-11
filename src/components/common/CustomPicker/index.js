import React, { Component } from 'react';
import {
  View,
  Picker,
  Animated,
  Keyboard,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import { WIDTH, IS_IOS } from 'src/helpers/Constants';
import { CustomButton } from 'src/components/common';
import { styles } from './styles';

class CustomPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottom: new Animated.Value(-1337),
      height: 0,
      isShowing: false
    };
  }

  animateDropdown(showPicker) {
    if (showPicker) {
      Animated.timing(this.state.bottom, { toValue: 0 }).start();
    } else {
      Animated.timing(this.state.bottom, {
        toValue: -this.state.height - 22
      }).start(() => this.setState({ isShowing: false }));
    }
  }

  renderModalBackground() {
    return (
      <TouchableWithoutFeedback
        style={{
          position: 'absolute'
        }}
        onPress={() => this.animateDropdown(false)}
      >
        <View style={styles.modalBackground} />
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { pickerStyle, androidPicker } = styles;
    const { selectedValue, onValueChange, items, defaultValue } = this.props;
    return IS_IOS ? ( // Custom component for iOS since we wan't an ok button and a nicer animation
      <View>
        <Modal
          transparent
          visible={this.state.isShowing}
          onShow={() => this.animateDropdown(true)}
          onRequestClose={() => {}}
        >
          {this.renderModalBackground()}
          <Animated.View style={[pickerStyle, { bottom: this.state.bottom }]}>
            <View
              onLayout={event => {
                this.setState({ height: event.nativeEvent.layout.height });
              }}
            >
              <CustomButton
                text="OK"
                style="standardButton"
                width={WIDTH - 50}
                onPress={() => this.animateDropdown(false)}
              />
              <Picker
                onValueChange={value => onValueChange(value)}
                selectedValue={selectedValue}
              >
                {items.map(item => (
                  <Picker.Item key={item} label={item} value={item} />
                ))}
              </Picker>
            </View>
          </Animated.View>
        </Modal>
        {/* The button that opens the modal */}
        <CustomButton
          text={selectedValue === '' ? `${defaultValue}*` : selectedValue}
          style="dropDownButton"
          width={WIDTH * 0.9}
          onPress={() => {
            Keyboard.dismiss();
            this.setState({ isShowing: true });
          }}
        />
      </View>
    ) : (
      // ANDROID, uses standard picker
      <View>
        <Picker
          onValueChange={value => onValueChange(value)}
          selectedValue={selectedValue === '' ? defaultValue : selectedValue}
          style={androidPicker}
        >
          {defaultValue ? <Picker.Item label={defaultValue} value="" /> : []}
          {items.map(item => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
      </View>
    );
  }
}
CustomPicker.defaultProps = {
  defaultValue: ''
};

CustomPicker.propTypes = {
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
export { CustomPicker };
