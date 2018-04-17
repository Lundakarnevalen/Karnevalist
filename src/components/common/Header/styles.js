import { Constants } from 'expo';
import { Platform } from 'react-native';
import { WIDTH, IS_IOS } from '~/src/helpers/Constants';

export const styles = {
  containerStyle: {
    width: WIDTH,
    height: IS_IOS ? 64 : 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#F7A021',
    borderColor: 'gray',
    ...Platform.select({
      ios: {
        paddingTop: 15
      },
      android: {
        marginTop: Constants.statusBarHeight
      }
    })
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Medium'
  },
  backButtonArea: {
    paddingLeft: 20,
    width: 60
  },
  backButtonStyle: {
    flex: 1,
    alignItems: 'flex-start'
  },
  iconStyle: {
    flex: 1,
    alignItems: 'center'
  },
  rightIconStyle: {
    flex: 1,
    alignItems: 'center'
  },
  textContainerStyle: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
