import { WIDTH } from '~/src/helpers/Constants';

export const ITEM_WIDTH = WIDTH;

export const styles = {
  containerStyle: {
    height: 100,
    backgroundColor: '#F4376D',
    alignItems: 'flex-start',
    // justifyContent: 'left',
    width: ITEM_WIDTH,
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
  timeAndPlaceStyle: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 8
  },
  textStyle: {
    fontSize: 12,
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Medium',
    color: 'white',
    width: WIDTH - 40,
    marginLeft: 10
  },
  innerContainerStyle: {
    flexDirection: 'column',
    // justifyContent: 'left',
    alignItems: 'flex-start'
  },
  textViewStyle: {
    marginTop: 5,
    flexDirection: 'row',
    // justifyContent: 'left',
    alignItems: 'flex-start'
  },
  upAndDownStyle: {
    width: 30
  },
  pointStyle: {
    backgroundColor: '#F4376D',
    alignItems: 'center',
    justifyContent: 'center',
    width: ITEM_WIDTH
  }
};
