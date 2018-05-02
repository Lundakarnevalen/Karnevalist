import React, { Component } from "react";
import { View, FlatList } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Header,
  ListItem,
  BackgroundImage,
  SuperAgileAlert,
  CustomButton
} from "~/src/components/common";
import { removeItem } from "~/src/helpers/LocalSave";
import { resetData } from "~/src/actions";
import { LOGOUT_RESET_ACTION, WIDTH } from "~/src/helpers/Constants";
import { SETTINGS_SCREEN_STRINGS } from "~/src/helpers/LanguageStrings";
import { getStrings } from "~/src/helpers/functions";

const SETTINGS_TITLES = [{ key: "changeLanguage" }, { key: "sections" }];
class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false
    };
  }

  getItems() {
    const strings = this.getLanguageStrings();
    const items = SETTINGS_TITLES.map(item => ({
      key: item.key,
      title: strings[item.key]
    }));
    return items;
  }

  getLanguageStrings() {
    return getStrings(this.props.language, SETTINGS_SCREEN_STRINGS);
  }

  handleLogout() {
    removeItem("email");
    removeItem("accessToken");
    this.props.resetData();
    this.props.screenProps.navigation.dispatch(LOGOUT_RESET_ACTION);
  }

  renderAlertButtons() {
    const strings = this.getLanguageStrings();
    return [
      {
        text: strings.cancel,
        onPress: () => this.setState({ alertVisible: false })
      },
      { text: strings.ok, onPress: () => this.handleLogout() }
    ];
  }

  render() {
    const { navigation } = this.props;
    const strings = this.getLanguageStrings();
    return (
      <View>
        <BackgroundImage pictureNumber={5} />
        <Header title={strings.title} leftIcon={null} navigation={navigation} />
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          data={this.getItems()}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              onPress={() => {
                if (item.key === "profile") {
                  navigation.navigate("MyProfile");
                } else if (item.key === "registration") {
                  navigation.navigate("MyRegistration", {
                    info: item
                  });
                } else if (item.key === "sections") {
                  navigation.navigate("Sections", {
                    screenProps: navigation
                  });
                } else if (item.key === "changeLanguage") {
                  navigation.navigate("LanguageScreen");
                }
              }}
            />
          )}
        />
        <View style={{ alignItems: "center", marginTop: 100 }}>
          <CustomButton
            text={strings.logout}
            width={WIDTH * 0.9}
            style="alertButton"
            onPress={() => this.setState({ alertVisible: true })}
          />
        </View>
        <SuperAgileAlert
          alertVisible={this.state.alertVisible}
          setAlertVisible={visible => this.setState({ alertVisible: visible })}
          buttonsIn={this.renderAlertButtons()}
          header={strings.alertHeader}
          info={strings.alertMessage}
        />
      </View>
    );
  }
}
SettingsScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  language: PropTypes.string.isRequired,
  resetData: PropTypes.func.isRequired,
  screenProps: PropTypes.shape().isRequired
};

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, { resetData })(SettingsScreen);
