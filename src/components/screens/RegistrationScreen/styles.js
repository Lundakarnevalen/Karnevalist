import { WIDTH } from 'src/helpers/Constants';

export const styles = {
  flexHorizontal: {
    flexDirection: 'row'
  },
  contentContainer: {
    paddingTop: 32,
    paddingRight: 16,
    paddingBottom: 64,
    paddingLeft: 16
  },
  androidPicker: {
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'black',
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderWidth: 1
  },
  rightIconStyle: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: 60,
    paddingRight: 0
  },
  checkBoxHeaderStyle: {
    backgroundColor: 'transparent',
    width: WIDTH,
    fontSize: 18,
    color: 'white'
  }
};
