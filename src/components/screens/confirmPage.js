import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Alert
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import Row from '../common/Row'
import SuperAgileAlert from '../common/SuperAgileAlert'
import CustomButton from '../common/CustomButton'

const window = Dimensions.get('window');

const data = {
  1: {
    image: 'https://placekitten.com/200/201',
    text: 'Jasper',
    infoText: 'testfoTexfror irr ceocc ced ihinhd nubueei ubt1'
  },
  2: {
    image: 'https://placekitten.com/200/202',
    text: 'Pepper',
    infoText: 'testaoText2'
  },
  3: {
    image: 'https://placekitten.com/200/203',
    text: 'Oscar',
    infoText: 'testaInfoText3'
  },
  4: {
    image: 'https://placekitten.com/200/204',
    text: 'Dusty',
    infoText: 'testaInfoText'
  },
  5: {
    image: 'https://placekitten.com/200/205',
    text: 'Spooky',
    infoText: 'testaInfoText'
  },
};

export default class ConfirmPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alertVisible: true
    }
  }
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Confirmation List</Text>
        {this.createIndexes()}
        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={data}
          onPressRow={() => this.onPressRow()}
          renderRow={this._renderRow}
        />
          <CustomButton
          buttonStyle={styles.confimButtonStyle}
          textStyle={styles.confimTextStyle}
          text={'Confim'}
          onPress={() => Alert.alert('Gör något kul efter confirm')}
          />
      </View>
    );
  }

  createIndexes() {
    const listOfIndexes = [];
    let i;
    for (i = 1; i < 6; i++) {
      listOfIndexes.push(
        <View
        style={{
          position: 'absolute',
          top: 5,
          left: 11,
          marginTop: ((window.height / 9) * 1.5) + (((window.height / 9) + 14) * (i - 1))
        }}
        >
        <Text>i</Text>    //vill få värdet av i , inte stängen "i"!!
        </View>
      )
    }
    return listOfIndexes
  }

  _renderRow = ({ data, active }) => {
    return <Row data={data} active={active} />
  }

  onPressRow() {
    Alert.alert('Navigera till ' + data.text + '-sektionen')
  }

  addAlert() {
    return (
      <SuperAgileAlert
      header={'OBS!'}
      info={'Håll in och flytta sektionerna i önskad ordning'}
      alertVisible={this.state.alertVisible}
      buttonsIn={[{ text: 'Ok', onPress: () => this.setState({ alertVisible: false }) }]}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },
  confimTextStyle: {
    fontSize: 15
  },
  confimButtonStyle: {
    height: window.height / 9,
    backgroundColor: '#F4376D',
    borderRadius: 0,
    margin: 0,
    width: window.width
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },

  text: {
    fontSize: 24,
    color: '#222222',
  },
});
