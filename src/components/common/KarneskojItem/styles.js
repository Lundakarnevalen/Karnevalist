import { WIDTH } from "~/src/helpers/Constants";

export const ITEM_WIDTH = WIDTH / 2 - 16;

export const styles = {
  containerStyle: {
    height: 100,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: ITEM_WIDTH,
    borderWidth: 1,
    marginTop: 8,
    borderColor: "#F7A021",
    marginLeft: 10
  },
  titleStyle: {
    fontSize: 20,
    backgroundColor: "transparent",
    fontFamily: "Avenir Next Medium",
    color: "#F7A021",
    textAlign: "center"
  },
  innerContainerStyle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};
