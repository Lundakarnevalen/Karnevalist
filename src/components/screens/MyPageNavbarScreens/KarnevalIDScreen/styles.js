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
    backgroundColor: '#474747'
  },
  baseImageStyle: {
    backgroundColor: 'transparent',
    height: VIEW_HEIGHT - 5,
    position: 'absolute',
    width: WIDTH-30,
    borderRadius: 5
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
    bottom: 120,
    transform: [{ rotate: '90deg' }],
    marginLeft: -35
  },
  card: {
    width: WIDTH,
    height: HEIGHT-HEADER_HEIGHT-34,
    backgroundColor: PINK,
    borderWidth:8,
    borderRadius: 15,
    borderColor: '#474747'
  },
  cups: {
    height: HEIGHT-HEADER_HEIGHT-50,
    overflow: 'hidden',
    borderRadius: 10
  }
};
