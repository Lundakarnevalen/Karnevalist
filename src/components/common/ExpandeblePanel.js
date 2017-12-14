import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Animated } from 'react-native';

class ExpandeblePanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      expanded: false,
      animation: new Animated.Value(142)
    };
  }

  toggle() {
    const initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
    const finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, { toValue: finalValue })
      .start();
  }

  setMaxHeight(event) {
    this.setState({ maxHeight: event.nativeEvent.layout.height + 10 });
  }

  setMinHeight() {
    this.setState({ minHeight: 142 });
  }

  render() {
    const { container, titleContainer, rows } = styles

    return (
      <Animated.View
        style={[container, { height: this.state.animation }]}
      >
        <View style={titleContainer} onLayout={() => this.setMinHeight()}>
          <TouchableHighlight
            onPress={() => this.toggle()}
            underlayColor="#FBBCC0"
          >
            <View style={rows}>
              {this.props.image}
              <Text style={this.props.style}>{this.state.title}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.body} onLayout={(event) => this.setMaxHeight(event)}>
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}
const styles = {
  container: {
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#FBBCC0',
    height: 100,
    width: 330,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row'
  },
  body: {
    padding: 10,
    paddingTop: 0
  },
  rows: {
    flexDirection: 'row',
    width: 280,
    alignItems: 'center',
  }
};

export default ExpandeblePanel;
