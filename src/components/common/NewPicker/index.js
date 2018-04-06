import React, { Component } from 'react';
import { View, Picker, Animated } from 'react-native';
import { WIDTH } from '~/src/helpers/Constants';
import { CustomButton } from '../common';

class DKPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottom: new Animated.Value(-1337),
      height: 0
    };
  }

  componentDidUpdate() {
    if (this.props.isShowing) {
      Animated.timing(this.state.bottom, { toValue: 0 }).start();
    } else {
      Animated.timing(this.state.bottom, {
        toValue: -this.state.height - 22
      }).start();
    }
  }

  renderPickerForPlatform(defaultTitle, tagArray, title, tag) {
    if (IS_IOS) {
      return (
        <CustomButton
          text={title === '' ? `${defaultTitle}*` : title}
          style="dropDownButton"
          width={WIDTH}
          onPress={() => {
            Keyboard.dismiss();
            console.log('IOS');
          }}
        />
      );
    }
    return (
      <View>
        <Picker
          onValueChange={item => {
            console.log(item);
          }}
          selectedValue={title === '' ? defaultTitle : title}
          style={styles.androidPicker}
        >
          <Picker.Item label={defaultTitle} value="" />
          {this.renderPickerArray(tag, tagArray)}
        </Picker>
      </View>
    );
  }

  render() {
    const { pickerStyle } = styles;
    const { items, value } = this.props;
    return (
      <Animated.View
        style={[pickerStyle, { width: WIDTH, bottom: this.state.bottom }]}
      >
        <View
          onLayout={event => {
            this.setState({ height: event.nativeEvent.layout.height });
          }}
        >
          <CustomButton
            text="OK"
            style="standardButton"
            width={WIDTH - 50}
            onPress={() => this.props.close()}
          />
          <Picker
            onValueChange={itemValue => this.props.onValueChange(itemValue)}
            selectedValue={value}
          >
            {items.map(item => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>
      </Animated.View>
    );
  }
}

const styles = {
  pickerStyle: {
    backgroundColor: 'white',
    position: 'absolute',
    alignItems: 'center'
  }
};

export { DKPicker };
