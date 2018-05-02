import {
  HEIGHT,
  HEADER_HEIGHT,
  WIDTH,
  VIEW_HEIGHT,
  PINK,
  IS_IOS
} from "~/src/helpers/Constants";

export const styles = {
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: "#474747"
  },
  baseImageStyle: {
    backgroundColor: "transparent",
    height: IS_IOS ? VIEW_HEIGHT - 5 : VIEW_HEIGHT - 20,
    position: "absolute",
    width: WIDTH - 30,
    borderRadius: 5
  },
  cupRowLeftStyle: {
    height: HEIGHT,
    position: "absolute",
    left: 0,
    width: 15
  },
  cupRowRightStyle: {
    height: HEIGHT,
    position: "absolute",
    right: 0,
    width: 15
  },
  textStyle: {
    fontSize: 14,
    color: "purple"
  },
  infoView: {
    position: "absolute",
    bottom: 120,
    transform: [{ rotate: "90deg" }],
    marginLeft: IS_IOS ? -35 : -15
  },
  card: {
    width: WIDTH,
    height: IS_IOS ? HEIGHT - HEADER_HEIGHT - 34 : VIEW_HEIGHT,
    backgroundColor: PINK,
    borderWidth: 8,
    borderRadius: 15,
    borderColor: "#474747"
  },
  cups: {
    height: IS_IOS ? VIEW_HEIGHT : VIEW_HEIGHT - 16,
    overflow: "hidden",
    borderRadius: 10
  },
  fixCircleClipping: {
    position: "absolute",
    top: -15,
    bottom: -15,
    right: -15,
    left: -15,
    borderRadius: 15,
    borderWidth: 16,
    zIndex: 99,
    borderColor: "#474747",
    backgroundColor: "transparent"
  },
  ppContainerStyle: {
    position: "absolute",
    width: 180,
    height: 330,
    top: -61,
    transform: [{ rotate: "90deg" }],
    left: IS_IOS ? -31 : 50
  },
  imageView: {
    backgroundColor: 'transparent',
    height: 460,
    width: 300,
    borderRadius: 5
  }
};
