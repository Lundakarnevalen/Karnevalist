import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ITEM_WIDTH, styles } from "./styles";

const KarneskojItem = ({ title, icon, onPress }) => {
  const { containerStyle, innerContainerStyle } = styles;
  return (
    <TouchableOpacity onPress={() => onPress()} style={containerStyle}>
      <View style={innerContainerStyle}>
        <MaterialIcons name={icon} size={ITEM_WIDTH / 3.5} color="#F7A021" />
        <Text style={styles.titleStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

KarneskojItem.defaultProps = {
  title: "",
  icon: ""
};

KarneskojItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

export { KarneskojItem };
