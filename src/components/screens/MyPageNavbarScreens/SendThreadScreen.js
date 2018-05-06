import React, { Component } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { connect } from "react-redux";
import {
  Header,
  BackgroundImage,
  ListItem,
  Input,
  CustomButton
} from "../../common";
import { Constants } from "expo";
import { Platform } from "react-native";
import { WIDTH, IS_IOS, HEIGHT } from "~/src/helpers/Constants";
import { MaterialIcons } from "@expo/vector-icons";
import { getStrings } from "~/src/helpers/functions";
// const strings = this.getLanguageStrings();

const SIZE = Dimensions.get("window").width / 11;

class SendThreadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  render() {
    const { navigation, screenProps } = this.props;
    return (
      <View
        style={{
          backgroundColor: "#f4376d",
          width: WIDTH,
          height: HEIGHT,
          position: "absolute"
        }}
      >
        <View>
          <Header
            rightIcon={
              <View style={{ marginRight: 15 }}>
                <MaterialIcons
                  name="camera-enhance"
                  size={SIZE}
                  color="#ffffff"
                />
              </View>
            }
            title=" "
            navigation={navigation}
          />
        </View>

        <Input
          backgroundColor={{ backgroundColor: "transparent" }}
          borderColor={{ borderColor: "transparent" }}
          color={{ color: "#ffffff" }}
          height={HEIGHT}
          ref="secondInput"
          multiline
          width={WIDTH}
          placeholder="Skicka en Karnejodel eller en imaginalkram till andra karnevalister..."
          numberOfLines={10}
          onChangeText={text => this.setState({ text })}
          // returnKeyType="done"
          maxLength={150}
          onSubmitEditing={() => {}}
          value={this.state.text}
          // underlineColorAndroid="#f4376d"
        />

        <TouchableOpacity
          style={styles.CommentStyle}
          onPress={() => navigation.navigate("JodelThread")}
        >
          <Text style={styles.textStyle}>Skicka</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export const styles = {
  textStyle: {
    fontSize: 20,
    color: "white",
    backgroundColor: "transparent",
    fontFamily: "Avenir Next Medium",
    fontStyle: "normal",
    fontWeight: "bold"
  },
  CommentStyle: {
    height: 60,
    backgroundColor: "#F7A021",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  }
};
/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4376d",
    alignItems: "center",
    justifyContent: "center"
  }
}); */

export default connect(mapStateToProps, null)(SendThreadScreen);
