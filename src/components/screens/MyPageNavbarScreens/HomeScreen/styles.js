import { PROGRESS, WIDTH } from 'src/helpers/Constants';

export const styles = {
  container: {
    alignItems: 'center',
    width: WIDTH,
    backgroundColor: 'transparent'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  rightIconStyle: {
    alignItems: 'center',
    padding: 1,
    backgroundColor: 'transparent',
    width: 60
  },
  buttons: {
    position: 'absolute',
    flexDirection: 'row',
    flex: 1,
    top: 0,
    left: 0,
    marginTop: 20
  },
  textStyleProgress: {
    fontSize: WIDTH / 19,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Avenir Next Medium',
    margin: 10
  },
  textStyle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Avenir Next Medium'
  },
  popoverContainer: {
    backgroundColor: '#114B5F',
    padding: 8,
    borderRadius: 5
  },
  popoverText: {
    color: '#E4FDE1'
  },
  containerAnimated: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 45,
    height: 45,
    resizeMode: 'contain'
  }
};
