import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList, Text } from "react-native";
import { connect } from "react-redux";
import { Header, JodelItem, Input } from "~/src/components/common";
import { JODEL_SCREEN_STRINGS } from "~/src/helpers/LanguageStrings";
import { setPopover, setProgress } from "~/src/actions";
import { getStrings } from "~/src/helpers/functions";
import { HEIGHT, IS_IOS } from "~/src/helpers/Constants";
import { MaterialIcons } from "@expo/vector-icons";

class JodelThread extends Component {
  constructor(props) {
    super(props);
    const strings = this.getLanguageStrings();
    this.state = {
      data: [
        {
          time: "47",
          place: "Lundagård",
          grade: "12",
          onPress: () => {},
          text: strings.Placeholder,
          nbr: "1",
          color: "#F7A021",
          disable: "false"
        },
        {
          time: "2",
          place: "Delphi",
          grade: "22",
          nbr: "2",
          color: "#F7A021",
          disable: "false",
          text: strings.Placeholder,
          onPress: () => {},
          text: strings.Placeholder
        }
      ],
      commentedText: ""
    };
  }

  getLanguageStrings() {
    return getStrings(this.props.language, JODEL_SCREEN_STRINGS);
  }

  render() {
    const { navigation } = this.props;
    const strings = this.getLanguageStrings();
    const { commentedText } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          title=" "
          leftIcon={
            <MaterialIcons
              name="arrow-back"
              style={{ color: "black", right: 0 }}
              size={30}
            />
          }
          rightIcon={
            <MaterialIcons
              name="bookmark-border"
              style={{ color: "black", right: 0 }}
              size={30}
            />
          }
          backColor="white"
        />
        <View
          style={{ flexDirection: "column", marginBottom: 15, marginTop: -10 }}
        >
          <JodelItem
            time="23"
            place="KC"
            grade="0"
            onPress={() => navigation.navigate("JodelThread")}
            text={strings.Placeholder}
            nbr="TS"
            color="#F7A021"
          />
        </View>
        <View style={{ flexDirection: "column" }}>
          <FlatList
            enableEmptySections
            style={{ height: HEIGHT - (IS_IOS ? 250 : 135) }}
            data={this.state.data}
            contentContainerStyle={{ alignItems: "center" }}
            renderItem={({ item }) => (
              <JodelItem
                time={item.time}
                place={item.place}
                grade={item.grade}
                onPress={item.onPress}
                text={item.text}
                nbr={item.nbr}
                color={item.color}
              />
            )}
          />
          <Input
            onSubmitEditing={() => this.refs.fourthInput.focus()}
            placeholder="Karnejodla du med..."
            onChangeText={text => {
              this.setState({ commentedText: text });
            }}
            value={commentedText}
          />
          <View>
            <Text color="black">Hej</Text>
          </View>
        </View>
      </View>
    );
  }
}

JodelThread.propTypes = {
  language: PropTypes.string.isRequired,
  navigation: PropTypes.shape().isRequired
};

const mapStateToProps = ({
  currentLanguage,
  popoverStatus,
  userInformation,
  sections
}) => {
  const { language } = currentLanguage;
  const { progress, token, email } = userInformation;
  return {
    language,
    popover: popoverStatus.homeScreenPopover,
    progress,
    token,
    email,
    sectionPriorities: sections.sectionPriorities
  };
};

export default connect(mapStateToProps, { setProgress, setPopover })(
  JodelThread
);
