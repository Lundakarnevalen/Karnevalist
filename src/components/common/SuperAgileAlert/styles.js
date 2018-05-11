import { WIDTH } from 'src/helpers/Constants';

export const styles = {
  containerStyle: {
    width: WIDTH / 1.1
  },
  outerViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  alertBoxStyle: {
    alignItems: 'center',
    flexDirection: 'column',
    width: WIDTH / 1.1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderColor: '#F7A021',
    overflow: 'hidden',
    paddingBottom: 20
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderColor: 'white',
    flex: 1
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Avenir Next Medium'
  },
  headerTextStyle: {
    textAlign: 'center',
    fontFamily: 'Avenir Next Bold',
    color: '#F7A021',
    marginTop: 10
  },
  infoTextStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Avenir Next Medium',
    color: '#F7A021',
    marginTop: 10,
    marginBottom: 10
  },
  buttonContainerStyle: {
    flexDirection: 'row'
  }
};
