import { HEIGHT, WIDTH } from 'src/helpers/Constants';

export const styles = {
  container: {
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    padding: 20,
    height: HEIGHT
  },
  containerAnimated: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 227,
    height: 200,
    resizeMode: 'contain'
  },
  text: {
    marginTop: 50,
    fontSize: 30,
    color: 'white',
    fontFamily: 'Avenir Next Medium',
    backgroundColor: 'transparent'
  }
};
