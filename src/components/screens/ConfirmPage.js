import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Alert
} from 'react-native';
import SortableList from 'react-native-sortable-list'
import Row from '../common/Row'
import SuperAgileAlert from '../common/SuperAgileAlert'
import CustomButton from '../common/CustomButton'
import Header from '../common/Header'

const window = Dimensions.get('window');

const data = {
  test1: {
    image: 'https://placekitten.com/200/201',
    text: 'Jasper',
    infoText: 'Hej jag heter OscarHej jag hlllter OscarHej jag he'
  },
  test2: {
    image: 'https://placekitten.com/200/202',
    text: 'Pepper',
    infoText: 'testaoText2'
  },
  test3: {
    image: 'https://placekitten.com/200/203',
    text: 'Oscar',
    infoText: 'testaInfoText3'
  },
  test4: {
    image: 'https://placekitten.com/200/204',
    text: 'Dusty',
    infoText: 'testaInfoText'
  },
  test5: {
    image: 'https://placekitten.com/200/205',
    text: 'Spooky',
    infoText: 'testaInfoText'
  },
  test6: {
    image: 'https://placekitten.com/200/205',
    text: 'Oscar',
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

      <Header
        textStyle={{ color: '#FBBCC0' }}
        style={{ backgroundColor: '#8A4797', marginBottom: 30 }}
        title='Confirmation page'
        leftIcon={null}
        navigation={this.props.navigation}
      />
        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={data}
          onPressRow={(key) => this.onPressRow(data[key])}
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

    for (let i = 0; i < Object.keys(data).length + 1; i++) {
      listOfIndexes.push(
        <View
        style={{
          position: 'absolute',
          top: 5,
          left: 11,
          marginTop: ((window.height / 8) * 1.5) + (((window.height / 9) + 14) * (i - 1))
        }}
        >
        <Text>{i}</Text>
        </View>
      )
    }
    return listOfIndexes
  }

  _renderRow = ({ data, active, index }) => {
    return (
      <Row
      data={data}
      index={index + 1}
      onPress={(key) => this.onPressRow(key)}
      active={active}
      />
    )
  }

  onPressRow(key) {
    Alert.alert('Navigera till ' + key.text + '-sektionen')
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
  confimTextStyle: {
    fontSize: 15,
    color: '#ffffff'
  },
  confimButtonStyle: {
    height: window.height / 9,
    backgroundColor: '#F4376D',
    borderTopWidth: 1,
    borderColor: 'white',
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
