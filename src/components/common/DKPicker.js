import React, { Component } from 'react'
import { View, Picker, Dimensions, Animated, Platform } from 'react-native'
import CustomButton from '../common/CustomButton'

const width = Dimensions.get('window').width

class DKPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottom: new Animated.Value(-1337),
      height: 0
    }
  }

  componentDidUpdate() {
      if (this.props.isShowing) {
        Animated.timing(
          this.state.bottom,
          { toValue: 0 }
        ).start()
      } else {
        Animated.timing(
          this.state.bottom,
          { toValue: (-this.state.height - 22) }
        ).start()
      }
  }

  render() {
    const { picker } = styles;
    const { items, value } = this.props;
    return (
      <Animated.View
        style={[picker, { width, bottom: this.state.bottom }]}
      >
      <View
        onLayout={(event) => {
          this.setState({ height: event.nativeEvent.layout.height })
        }}
      >
        <CustomButton
          text="OK"
          style='acceptButton'
          onPress={() => this.props.close()}
        />
        <Picker
          onValueChange={(itemValue) => this.props.onValueChange(itemValue)}
          selectedValue={value}
        >
        {items.map(item => {
          return (<Picker.Item key={item.label} label={item.label} value={item.value} />);
        })}
        </Picker>
      </View>
      </Animated.View>
    )
  }
}

const styles = {
  picker: {
    backgroundColor: 'white',
    position: 'absolute'
  }
}

export default DKPicker
