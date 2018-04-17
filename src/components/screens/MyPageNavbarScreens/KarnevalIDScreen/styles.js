import {
  HEIGHT,
  HEADER_HEIGHT,
  WIDTH,
  VIEW_HEIGHT,
  PINK
} from '~/src/helpers/Constants';

export const styles = {
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: PINK
  },
  baseImageStyle: {
    backgroundColor: 'transparent',
    height: VIEW_HEIGHT - 15,
    position: 'absolute',
    top: HEADER_HEIGHT + 10,
    width: WIDTH
  },
  cupRowLeftStyle: {
    height: HEIGHT,
    position: 'absolute',
    left: 0,
    width: 15,
    zIndex: 2
  },
  cupRowRightStyle: {
    height: HEIGHT,
    position: 'absolute',
    right: 0,
    width: 15,
    zIndex: 2
  },
  textStyle: {
    fontSize: 14,
    color: 'purple'
  },
  infoView: {
    position: 'absolute',
    bottom: 180,
    transform: [{ rotate: '90deg' }]
  }
};
