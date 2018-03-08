import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

const LeftIcon = ({ icon, navigation }) => {
  const { backButtonArea, backButtonStyle, iconStyle } = styles;
  if (icon === null) {
    return <View style={iconStyle} />;
  } else if (icon) {
    return <View style={iconStyle}>{icon}</View>;
  }
  const backButton = navigation ? (
    <TouchableOpacity
      style={backButtonArea}
      onPress={() => navigation.goBack(null)}
    >
      <Ionicons size={30} name="md-arrow-back" color="white" />
    </TouchableOpacity>
  ) : null;
  return <View style={backButtonStyle}>{backButton}</View>;
};

LeftIcon.propTypes = {};

const Header = ({ title, rightIcon, leftIcon, navigation }) => (
  <View style={styles.statusBarStyle}>
    <View style={styles.containerStyle}>
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

export { Header };
