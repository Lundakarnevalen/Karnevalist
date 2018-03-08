import { HEIGHT, WIDTH } from 'helpers/Constants';

const text = {
  fontSize: 16,
  fontFamily: 'Avenir Next Medium'
};
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
    ...text
  },
  blackText: {
    color: 'black',
    ...text
  },
  underlineButtonText: {
    color: '#ffffff',
    textDecorationLine: 'underline',
    fontFamily: 'Avenir Next Medium'
  },
  standardButtonText: {
    color: 'white',
    ...text
  },
  tintStandardButtonText: {
    color: 'rgba(255, 255, 255, 0.5)',
    ...text
  },
  standardButton: {
    borderWidth: 0,
    backgroundColor: '#F7A021',
    padding: 10
  },
  tintStandardButton: {
    backgroundColor: 'rgba(247, 160, 33, 0.8)',
    padding: 10,
    borderWidth: 0
  }
};
