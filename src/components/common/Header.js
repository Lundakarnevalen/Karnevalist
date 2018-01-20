import React, { Component } from 'react';
import { View, Dimensions, Text, Platform, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;

class Header extends Component {
  renderRightIcon() {
    const { rightIcon } = this.props;
    const { iconStyle } = styles;
    if (rightIcon) {
      return <View style={iconStyle}>{rightIcon}</View>;
    }
    return <View style={iconStyle} />;
  }

  renderLeftIcon() {
    const { leftIcon, navigation } = this.props;
    const { backButtonArea, backButtonStyle, iconStyle } = styles;
    if (leftIcon === null) {
      return <View style={iconStyle} />;
    } else if (leftIcon) {
      return <View style={iconStyle}>{leftIcon}</View>;
    }
    const backButton = navigation ? (
      <TouchableOpacity style={backButtonArea} onPress={() => navigation.goBack(null)}>
        <Ionicons size={30} name="md-arrow-back" color={'white'} />
      </TouchableOpacity>
    ) : null;
    return <View style={backButtonStyle}>{backButton}</View>;
  }

  render() {
    const { title } = this.props;
    const { containerStyle, textStyle } = styles;
    return (
      <View style={{ backgroundColor: '#F7A021', zIndex: 999 }}>
        <View style={containerStyle}>
          {this.renderLeftIcon()}
          <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={textStyle}>{title || 'Placeholder'}</Text>
          </View>
          {this.renderRightIcon()}
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    width: WIDTH,
    height: Platform.OS === 'ios' ? 64 : 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#F7A021',
    borderBottomWidth: 1,
    borderColor: 'gray',
    ...Platform.select({
      ios: {
        paddingTop: 15
      },
      android: {
        marginTop: Constants.statusBarHeight
      }
    })
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Medium'
  },
  backButtonArea: {
    paddingLeft: 20,
    width: 60
  },
  backButtonStyle: {
    flex: 1,
    alignItems: 'flex-start'
  },
  iconStyle: {
    flex: 1,
    alignItems: 'center'
  }
};

export default Header;
