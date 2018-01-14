import React, { Component } from 'react';
import { View, Dimensions, Text, Platform, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

const WIDTH = Dimensions.get('window').width;

class Header extends Component {
  getTextColor() {
        return 'white';
  }

  getBackgroundColor() {
        return '#F7A021';
  }

  getContainerStyle() {
    return {
      width: WIDTH,
      height: Platform.OS === 'ios' ? 64 : 50,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: this.getBackgroundColor(),
      zIndex: 999,
      ...Platform.select({
        ios: {
          paddingTop: 15
        },
        android: {
          marginTop: Constants.statusBarHeight
        }
      })
    };
  }

  getTextStyle() {
    return {
      fontSize: 18,
      color: this.getTextColor(),
      backgroundColor: 'transparent',
      fontFamily: 'Avenir Next Medium'
    };
  }

  renderRightIcon() {
    const { rightIcon } = this.props;
    if (rightIcon) {
      return <View style={{ flex: 1, alignItems: 'center' }}>{rightIcon}</View>;
    }
    return <View style={{ flex: 1, alignItems: 'center' }} />;
  }

  renderLeftIcon() {
    const { leftIcon, navigation } = this.props;
    if (leftIcon === null) {
      return <View style={{ flex: 1, alignItems: 'center' }} />;
    } else if (leftIcon) {
      return <View style={{ flex: 1, alignItems: 'center' }}>{leftIcon}</View>;
    }
    const backButton = navigation ? (
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Ionicons size={30} name="md-arrow-back" color={this.getTextColor()} />
      </TouchableOpacity>
    ) : null;
    return <View style={{ flex: 1, alignItems: 'center' }}>{backButton}</View>;
  }

  render() {
    const { title } = this.props;
    return (
      <View style={this.getContainerStyle()}>
        {this.renderLeftIcon()}
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={this.getTextStyle()}>{title || 'Placeholder'}</Text>
        </View>
        {this.renderRightIcon()}
      </View>
    );
  }
}

const mapStateToProps = ({ currentTheme }) => {
  const { theme } = currentTheme;
  return { theme };
};

export default connect(mapStateToProps, null)(Header);
