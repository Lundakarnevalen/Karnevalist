import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

const LeftIcon = ({ icon, navigation }) => {
  if (icon === null) {
    return <View style={styles.iconStyle} />;
  } else if (icon) {
    return <View style={styles.iconStyle}>{icon}</View>;
  }
  const backButton = navigation ? (
    <TouchableOpacity
      style={styles.backButtonArea}
      onPress={() => navigation.goBack()}
    >
      <Ionicons size={30} name="md-arrow-back" color="white" />
    </TouchableOpacity>
  ) : null;
  return <View style={styles.backButtonStyle}>{backButton}</View>;
};

LeftIcon.defaultProps = {
  icon: undefined,
  navigation: undefined,
};

LeftIcon.propTypes = {
  icon: PropTypes.shape(),
  navigation: PropTypes.shape()
};

const Header = ({ title, rightIcon, leftIcon, navigation, backColor }) => (
  <View style={{backgroundColor: backColor, zIndex: 999}}>
    <View style={[styles.containerStyle, {backgroundColor: backColor}]}>
      <LeftIcon icon={leftIcon} navigation={navigation} />
      <View style={styles.textContainerStyle}>
        <Text style={styles.textStyle} numberOfLines={1}>
          {title || 'Placeholder'}
        </Text>
      </View>
      <View style={styles.rightIconStyle}>{rightIcon}</View>
    </View>
  </View>
);

Header.defaultProps = {
  leftIcon: undefined,
  navigation: undefined,
  rightIcon: undefined,
  backColor: '#F7A021'
};

Header.propTypes = {
  leftIcon: PropTypes.shape(),
  navigation: PropTypes.shape(),
  rightIcon: PropTypes.shape(),
  title: PropTypes.string.isRequired,
  backColor: PropTypes.string
};

export { Header };
