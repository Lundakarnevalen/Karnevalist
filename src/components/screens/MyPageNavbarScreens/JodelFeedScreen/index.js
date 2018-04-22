import React, { Component } from "react";
import { View } from "react-native";
import { getStrings } from "~/src/helpers/functions";
import PropTypes from "prop-types";
import { JODEL_SCREEN_STRINGS } from "~/src/helpers/LanguageStrings";
import { JodelHeader, JodelItem } from "~/src/components/common";
import { MaterialIcons } from "@expo/vector-icons";

class JodelFeedScreen extends Component {
  getLanguageStrings() {
    return getStrings(this.props.language, JODEL_SCREEN_STRINGS);
  }

  render() {
    const strings = this.getLanguageStrings();
    return (
      <View>
        <JodelHeader
          title=" "
          rightIcon={
            <MaterialIcons
              name="bookmark-border"
              style={{ color: "white", right: 0 }}
              size={30}
            />
          }
        />
        <JodelItem
          time="23"
          place="KC"
          text={strings.Placeholder}
          grade="0"
          color="#F7A021"
        />
        <JodelItem
          time="23"
          place="Lundagård"
          text={strings.Placeholder}
          grade="12"
          color="#F7A021"
        />
      </View>
    );
  }
}
JodelFeedScreen.propTypes = {
  language: PropTypes.string.isRequired
};

export default JodelFeedScreen;
