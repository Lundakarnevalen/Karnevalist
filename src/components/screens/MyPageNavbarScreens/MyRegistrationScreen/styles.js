import { HEIGHT, IS_IOS } from 'src/helpers/Constants';

export const styles = {
  style: {
    paddingBottom: IS_IOS ? 132 : 155
  },
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Bold',
    fontSize: 36,
    marginTop: HEIGHT / 3,
    color: 'white'
  }
};
