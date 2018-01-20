import React, { Component } from 'react';
import { View, Picker, Dimensions, Animated } from 'react-native';
import { CustomButton } from '../common';

const width = Dimensions.get('window').width;

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
      Animated.timing(this.state.bottom, { toValue: -this.state.height - 22 }).start();
    }
  }

  render() {
    const { pickerStyle } = styles;
    const { items, value } = this.props;
    return (
      <Animated.View style={[pickerStyle, { width, bottom: this.state.bottom }]}>
        <View
          onLayout={event => {
            this.setState({ height: event.nativeEvent.layout.height });
          }}
        >
          <CustomButton
            text={'OK'}
            style={'standardButton'}
            width={width - 50}
            onPress={() => this.props.close()}
          />
          <Picker
            onValueChange={itemValue => this.props.onValueChange(itemValue)}
            selectedValue={value}
          >
            {items.map(item => {
              return <Picker.Item key={item} label={item} value={item} />;
            })}
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
