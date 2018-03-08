import { WIDTH, IS_IOS } from '~/src/helpers/Constants';

export const styles = {
  talkBubbleTopRight: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: IS_IOS ? 70 : 74,
    right: 5
  },
  talkBubbleTriangleTopRight: {
    width: 0,
    height: 0,
    left: WIDTH / 2,
    marginBottom: -20,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#F7A021'
  },
  talkBubbleBottomLeft: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 4,
    left: WIDTH / 3.12
  },
  talkBubbleSquareSmall: {
    width: WIDTH / 1.62,
    height: 40,
    backgroundColor: '#F7A021',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  talkBubbleSquareBig: {
    width: WIDTH / 1.48,
    height: 40,
    backgroundColor: '#F7A021',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  talkBubbleTriangleBottomLeft: {
    width: 0,
    height: 0,
    marginTop: -20,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    transform: [{ rotate: '180deg' }],
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#F7A021'
  },
  textStyle: {
    color: '#fff'
  }
};
