import { HEIGHT, WIDTH, IS_IOS} from '../../assets/Constants'

export const styles = {
  mainContainer: {
    height: HEIGHT - (IS_IOS ? 55 : 75) ,
    width: WIDTH,
    justifyContent: 'flex-start'
  },
  countDown: {
    fontSize: WIDTH / 18 < 22 ? 18 : 22,
    fontFamily: 'Avenir Next Regular',
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
    fontFamily: 'Avenir Next Regular',
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    padding: 2,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 3
  },
  headerText: {
    fontSize: 35,
    margin: 1,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Avenir Next Regular',
    backgroundColor: 'transparent'
  },
  bodyText: {
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Avenir Next Regular',
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
  },
  lockStyle: {
    width: (WIDTH - 20) / 3,
    maxHeight: (WIDTH - 20) / 3,
    marginLeft: (WIDTH - 20) / 3,
    marginRight: (WIDTH - 20) / 3,
    marginTop: 10,
    marginBottom: 10
  },
  secretHeaderText: {
    fontSize: 30,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Avenir Next Regular',
    backgroundColor: 'transparent'
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  }
}
