import { WIDTH } from '~/src/helpers/Constants';

export const ITEM_WIDTH = WIDTH - 16;

export const styles = {
  containerStyle: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    width: ITEM_WIDTH,
    borderWidth: 1,
    marginTop: 8,
    borderColor: '#F7A021'
  },
  titleStyle: {
    fontSize: 20,
    marginLeft: 8,
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Medium',
    color: '#F7A021'
  },
  contentStyle: {
    fontSize: 14,
    marginLeft: 8,
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Medium',
    color: '#333'
  },
  dateViewStyle: {
    height: 60,
    width: ITEM_WIDTH * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7A021'
  },
  dateStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold'
  },
  continueIconStyle: {
    backgroundColor: 'transparent'
  },
  innerContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center'
  }
};
