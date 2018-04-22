import { Constants } from "expo";
import { Platform } from "react-native";
import { WIDTH, IS_IOS } from "~/src/helpers/Constants";

export const styles = {
  containerStyle: {
    width: WIDTH,
    height: IS_IOS ? 64 * 1.5 : 50 * 1.5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
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
    fontSize: 8,
    color: "gray",
    backgroundColor: "transparent",
    fontFamily: "Avenir Next Medium"
  },
  textStyleSelect: {
    fontSize: 11,
    color: "orange",
    backgroundColor: "transparent",
    fontFamily: "Avenir Next Medium"
  },
  bigNumberStyle: {
    fontSize: 28,
    color: "gray",
    backgroundColor: "transparent",
    fontFamily: "Avenir Next Medium"
  },
  backButtonArea: {
    paddingLeft: 20,
    width: 60
  },
  sortContainerStyle: {
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    flexDirection: "row",
    backgroundColor: "white",
    width: 120,
    borderColor: "orange"
  },
  backButtonStyle: {
    flex: 1,
    alignItems: "flex-start"
  },
  iconStyle: {
    flex: 1,
    alignItems: "center"
  },
  rightIconStyle: {
    paddingRight: 20,
    flex: 1,
    alignItems: "flex-end"
  },
  leftIconStyle: {
    paddingLeft: 20,
    flex: 1,
    alignItems: "flex-start"
  },
  textContainerStyle: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  statusBarStyle: {
    backgroundColor: "#F7A021",
    zIndex: 999
  },

  innerContainerStyle: {
    flexDirection: "row"
  }
};
