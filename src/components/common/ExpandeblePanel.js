import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { connect } from 'react-redux';

const WIDTH = Dimensions.get('window').width;

class ExpandeblePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      expanded: false,
      animation: new Animated.Value(98.5)
    };
  }

  componentDidUpdate() {
    const animateTo = this.state.expanded
      ? this.state.maxHeight + this.state.minHeight
      : this.state.minHeight;
    Animated.spring(this.state.animation, { toValue: animateTo }).start();
  }

  getColor() {
    return this.props.theme === 'day' ? '#f4376d' : '#F7A021';
  }

  setMaxHeight(event) {
    this.setState({ maxHeight: event.nativeEvent.layout.height + 20 });
  }

  setMinHeight(event) {
    this.setState({ minHeight: event.nativeEvent.layout.height + 10 });
  }

  render() {
    const { containerStyle, rows, textStyle } = styles;
    return (
      <TouchableOpacity onPress={() => this.setState({ expanded: !this.state.expanded })}>
        <Animated.View
          style={[containerStyle, { height: this.state.animation, borderColor: this.getColor() }]}
        >
          <View style={rows} onLayout={event => this.setMinHeight(event)}>
            {this.props.image}
            <Text style={[textStyle, { color: this.getColor() }]}>{this.state.title}</Text>
          </View>
          <View style={{ marginTop: 10 }} onLayout={event => this.setMaxHeight(event)}>
            {this.props.children}
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}
const styles = {
  containerStyle: {
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'white',
    width: WIDTH - 50,
    borderWidth: 1,
    padding: 10
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    fontFamily: 'Avenir Next Bold'
  }
};

const mapStateToProps = ({ currentTheme }) => {
  const { theme } = currentTheme;
  return { theme };
};

export default connect(mapStateToProps, null)(ExpandeblePanel);
