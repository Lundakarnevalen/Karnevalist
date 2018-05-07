import {
  HEIGHT,
  HEADER_HEIGHT,
  WIDTH,
  VIEW_HEIGHT,
  PINK,
  PURPLE,
  IS_IOS
} from '~/src/helpers/Constants';

export const styles = {
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: PURPLE
  },
  baseImageStyle: {
    backgroundColor: 'transparent',
    height: IS_IOS ? VIEW_HEIGHT - 5 : VIEW_HEIGHT - 20,
    position: 'absolute',
    width: WIDTH - 30,
    borderRadius: 5
  },
  cupRowLeftStyle: {
    height: HEIGHT,
    position: 'absolute',
    left: 0,
    width: 15,
    zIndex: 20
  },
  cupRowRightStyle: {
    height: HEIGHT,
    position: 'absolute',
    right: 0,
    width: 15,
    zIndex: 20
  },
  textStyle: {
    fontSize: 14,
    color: 'purple'
  },
  infoView: {
    position: 'absolute',
    bottom: 120,
    transform: [{ rotate: '90deg' }],
    marginLeft: IS_IOS ? -35 : -15
  },
  card: {
    width: WIDTH,
    height: IS_IOS ? HEIGHT - HEADER_HEIGHT - 34 : VIEW_HEIGHT,
    backgroundColor: PINK,
    borderWidth: 8,
    borderRadius: 15,
    borderColor: PURPLE
  },
  cups: {
    height: IS_IOS ? VIEW_HEIGHT : VIEW_HEIGHT - 16,
    overflow: 'hidden',
    borderRadius: 10
  },
  fixCircleClipping: {
    position: 'absolute',
    top: -15,
    bottom: -15,
    right: -15,
    left: -15,
    borderRadius: 15,
    borderWidth: 16,
    zIndex: 99,
    borderColor: PURPLE,
    backgroundColor: 'transparent'
  },
  ppContainerStyle: {
    position: 'absolute',
    width: 180,
    height: 330,
    top: -61,
    transform: [{ rotate: '90deg' }],
    left: IS_IOS ? -31 : 50
  },
  imageView: {
    backgroundColor: 'transparent',
    height: 460,
    width: 300,
    borderRadius: 5,
    overflow: 'hidden'
  },
  idCard: {
    position: 'absolute',
    zIndex: 10,
    width: 154,
    height: 197,
    borderRadius: 17,
    left: 0,
    top: IS_IOS ? -10 : 71
  },
  loadingCard: {
    backgroundColor: PINK,
    zIndex: 40,
    overflow: 'hidden',
    position: 'absolute',
    height: HEIGHT,
    width: WIDTH - 16
  },
  baseBig: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },
  sponsView: {
    position: 'absolute',
    top: VIEW_HEIGHT / 3,
    transform: [{ rotate: '90deg' }],
    left: IS_IOS ? -25 : -15
  }
};
