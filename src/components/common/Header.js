import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { WIDTH, IS_IOS } from '../../helpers/Constants';

class Header extends Component {
  renderRightIcon() {
    const { rightIcon } = this.props;
    const { rightIconStyle } = styles;
    if (rightIcon) {
      return <View style={rightIconStyle}>{rightIcon}</View>;
    }
    return <View style={rightIconStyle} />;
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
            <Text style={textStyle} numberOfLines={1}>
              {title || 'Placeholder'}
            </Text>
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
    height: IS_IOS ? 64 : 50,
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
  },
  rightIconStyle: {
    flex: 1,
    alignItems: 'flex-end'
  }
};

export { Header };
