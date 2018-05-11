import { HEIGHT, IS_IOS } from 'src/helpers/Constants';

export const styles = {
  scrollStyle: {
    height: HEIGHT - (IS_IOS ? 74 : 70),
    paddingTop: 4,
    paddingRight: 16,
    paddingLeft: 16
  },
  loadingText: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold',
    fontSize: 36
  },
  loading: {
    marginTop: HEIGHT / 3
  },
  rightIconStyle: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: 60
  }
};
