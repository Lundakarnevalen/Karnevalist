import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

const JodelHeader = ({ title, rightIcon, leftIcon, navigation }) => {
  const {
    containerStyle,
    innerContainerStyle,
    timeAndPlaceStyle,
    textStyle,
    textViewStyle,
    pointStyle,
    timeStyle
  } = styles;
  return (
    <View style={styles.containerStyle}>
      <View style={styles.innerContainerStyle}>
        <View style={styles.leftIconStyle}>
          <TouchableOpacity onPress={() => onPress()}>
            <MaterialIcons name="exit-to-app" size={30} color="gray" />
          </TouchableOpacity>
          <Text style={styles.textStyle} numberOfLines={1}>
            {"Avsluta"}
          </Text>
        </View>
        <View style={styles.textContainerStyle}>
          <Text style={styles.bigNumberStyle} numberOfLines={1}>
            {"16 532"}
          </Text>
          <Text style={styles.textStyle} numberOfLines={1}>
            {"Min Karma"}
          </Text>
        </View>
        <View style={styles.rightIconStyle}>
          <TouchableOpacity onPress={() => onPress()}>
            <MaterialIcons name="account-circle" size={30} color="gray" />
          </TouchableOpacity>
          <Text style={styles.textStyle} numberOfLines={1}>
            {"Min profil"}
          </Text>
        </View>
      </View>
      <View style={styles.innerContainerStyle}>
        <View style={styles.sortContainerStyle}>
          <Text style={styles.textStyleSelect}>Senaste</Text>
        </View>
        <View style={styles.sortContainerStyle}>
          <Text style={styles.textStyleSelect}>Mest kommenterade</Text>
        </View>
        <View style={styles.sortContainerStyle}>
          <Text style={styles.textStyleSelect}>Högljuddast</Text>
        </View>
      </View>
    </View>
  );
};

JodelHeader.defaultProps = {
  leftIcon: undefined,
  navigation: undefined,
  rightIcon: undefined
};

JodelHeader.propTypes = {
  leftIcon: PropTypes.shape(),
  navigation: PropTypes.shape(),
  rightIcon: PropTypes.shape(),
  title: PropTypes.string.isRequired
};

export { JodelHeader };
