import { HEIGHT, WIDTH } from 'helpers/Constants';

export const styles = {
  button: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  textButton: {
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  acceptButton: {
    backgroundColor: 'green',
    height: 44
  },
  alertButton: {
    height: HEIGHT / (4 * 4),
    backgroundColor: '#f4376d',
    borderRadius: 0,
    margin: 0,
    marginLeft: 0.4,
    marginRight: 0.4
  },
  dropDownButton: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteText: {
    color: '#f4376d',
    fontSize: 16,
    fontFamily: 'Avenir Next Medium'
  },
  blackText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Avenir Next Medium'
  },
  underlineButtonText: {
    color: '#ffffff',
    textDecorationLine: 'underline',
    fontFamily: 'Avenir Next Medium'
  },
  standardButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Avenir Next Medium'
  },
  tintStandardButtonText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    fontFamily: 'Avenir Next Medium'
  }
};
