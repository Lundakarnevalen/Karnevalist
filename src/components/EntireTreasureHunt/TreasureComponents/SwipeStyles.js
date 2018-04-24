import { HEIGHT, WIDTH } from '../assets/Constants'

const styles = {
  mainContainer: {
    height: HEIGHT - 90 /* (IS_IOS ? 113 : 135), */,
    width: WIDTH,
    justifyContent: 'flex-start'
  },
  countDown: {
    fontSize: 22,
    color: 'white'
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#d999fa',
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Avenir Next Medium'
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginRight: 10,
    marginLeft: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 3
  },
  headerText: {
    fontSize: 40,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Avenir Next Medium',
    backgroundColor: 'transparent'
  },
  bodyText: {
    fontSize: 22,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Avenir Next Medium',
    backgroundColor: 'transparent'
  },
  countDownContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  navItem: {
    backgroundColor: 'transparent',
    color: '#d999fa'
  },
  navContainer: {
    marginTop: 5,
    backgroundColor: 'transparent',
    marginRight: 10
  },
  buttonContainer: {
    marginTop: 5,
    marginLeft: 10,
    width: WIDTH - 55,
    borderRadius: 5,
    backgroundColor: '#F7A021'
  },
  bottomContain: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end'
  }
}

module.exports = styles