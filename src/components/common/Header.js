import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Text,
  Platform
} from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons'

const WIDTH = Dimensions.get('window').width;

/**
* TODO: Move alternating options to props
*/
class Header extends Component {

  renderRightIcon() {
    if (this.props.rightIcon === null)
      return <View style={{ flex: 1, alignItems: 'center' }} />
    if (this.props.rightIcon)
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        {this.props.rightIcon}
      </View>
    )
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Ionicons
        size={30}
        name="md-information-circle"
        />
      </View>
  )
  }

  renderLeftIcon() {
    if (this.props.leftIcon === null)
      return <View style={{ flex: 1, alignItems: 'center' }} />
    if (this.props.leftIcon)
      return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          {this.props.leftIcon}
        </View>
    )
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Ionicons
        size={30}
        name="md-arrow-back"
        />
      </View>
  )
  }

  render() {
    const { containerStyle, headerStyle } = styles;
    const { title, textStyle, style } = this.props;
    return (
      <View style={[containerStyle, style]}>
        {this.renderLeftIcon()}
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }} >
          <Text style={[headerStyle, textStyle]}>{title}</Text>
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
