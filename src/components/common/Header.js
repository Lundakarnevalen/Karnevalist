import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Text,
  Platform
} from 'react-native';
import { Constants } from 'expo';

const WIDTH = Dimensions.get('window').width;

/**
* TODO: Move alternating options to props
*/
class Header extends Component {

  renderRightIcon() {
    return <View style={{ flex: 1 }} />;
  }

  renderLeftIcon() {
    return <View style={{ flex: 1 }} />;
  }

  render() {
    const { containerStyle, headerStyle } = styles;
    const { title } = this.props;
    return (
      <View style={[containerStyle]}>
        {this.renderLeftIcon()}
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }} >
          <Text style={[headerStyle]}>{title}</Text>
        </View>
        {this.renderRightIcon()}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    width: WIDTH,
    height: 67.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    zIndex: 999,
    ...Platform.select({
      ios: {
        paddingTop: 15
      },
      android: {
        marginTop: Constants.statusBarHeight
      }
    })
  },
  headerStyle: {
    fontSize: 18,
    color: 'black',
    backgroundColor: 'transparent'
  }
};

export default Header;
