import { WIDTH, HEIGHT } from 'src/helpers/Constants';

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
  pickerStyle: {
    backgroundColor: 'white',
    position: 'absolute',
    alignItems: 'center',
    width: WIDTH
  },
  modalBackground: {
    position: 'absolute',
    width: WIDTH + 32,
    height: HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
};
