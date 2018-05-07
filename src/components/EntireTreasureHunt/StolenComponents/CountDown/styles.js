import { WIDTH } from '~/src/helpers/Constants'

const SIZE = WIDTH / 14

export const countDownStyles = {
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 27,
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Avenir Next Medium'
  },
  textStyle2: {
    fontSize: 27,
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Avenir Next Medium'
  },
  containerStyle2: {
    height: SIZE / 6,
    width: SIZE,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export const countDownItemStyles = {
  containerStyle: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: WIDTH / 18 < 22 ? 18 : 22,
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Avenir Next Medium'
  }
}
