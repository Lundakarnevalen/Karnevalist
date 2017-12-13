import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

class ExpandeblePanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      expanded: false,
      animation: new Animated.Value(150)
    };
  }

  toggle() {
    //Step 1
    const initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
    const finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
        expanded: !this.state.expanded  //Step 2
    });

    this.state.animation.setValue(initialValue);  //Step 3
    Animated.spring(     //Step 4
        this.state.animation,
        {
            toValue: finalValue
        }
    ).start();  //Step 5
  }
  _setMaxHeight(event) {
    this.setState({
        maxHeight: event.nativeEvent.layout.height
    });
}

_setMinHeight(event) {
    this.setState({
        minHeight: event.nativeEvent.layout.height
    });
}

  render() {
    const { container, titleContainer, title, button, rows, one } = styles

      //Step 5
      return (
        <Animated.View
          style={[container, { height: this.state.animation }]}
        >
              <View style={titleContainer} onLayout={(event) => this._setMinHeight(event)}>
                  <TouchableHighlight
                      style={button}
                      onPress={() => this.toggle()}
                      underlayColor="#f1f1f1"
                  >
                  <View style={rows}>
                    <MaterialCommunityIcons
                      name="numeric-1-box-outline"
                      style={one}
                      size={140}
                    />
                    <Text style={{ fontSize: 20, textAlign: 'center', color: 'brown', flex: 3 }}>
                      {this.state.title}
                    </Text>
                  </View>
                  </TouchableHighlight>
              </View>

              <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                {this.props.children}
              </View>

        </Animated.View>
      );
  }
}
const styles = {
  container: {
    alignItems: 'center',
    marginTop: 15,
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold'
  },
  button: {

  },
  body: {
    padding: 10,
    paddingTop: 0
  },
  rows: {
    flexDirection: 'row',
    width: 280,
    alignItems: 'center',
    marginTop: 10,
  },
  one: {
    marginRight: 0,
    color: 'brown',
    flex: 4,
    backgroundColor: 'transparent',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
};

export default ExpandeblePanel;
