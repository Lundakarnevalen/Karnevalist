import { WIDTH } from '~/src/helpers/Constants';

export const ITEM_WIDTH = WIDTH;

export const styles = {
  containerStyle: {
    height: 100,
    backgroundColor: '#F4376D',
    alignItems: 'left',
    justifyContent: 'left',
    width: ITEM_WIDTH,
    borderWidth: 1,
    marginTop: 8
  },
  timeStyle: {
    fontSize: 8,
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Medium',
    color: 'white',
    textAlign: 'center',
    marginTop: 5
  },
  timeAndPlaceStyle:{
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5
  },
  textStyle: {
    fontSize: 12,
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Medium',
    color: 'white',
    textAlign: 'center'
  },
  innerContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'left'
  },
  textViewStyle: {
    marginTop: 5,
  }
};
