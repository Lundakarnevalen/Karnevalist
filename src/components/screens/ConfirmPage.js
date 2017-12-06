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
import { EvilIcons } from '@expo/vector-icons'

const window = Dimensions.get('window');

const data = [
  {
    image: 'https://placekitten.com/200/201',
    text: 'OMRÅDESSEKTIONOMRÅDESSEKTIONERNAOMRÅDESSEKTIONERNAERNA',
    infoText: 'Hej jag heter OscarHej jag hlllter OscarHej jag he'
  },
  {
    image: 'https://placekitten.com/200/202',
    text: 'Pepper',
    infoText: 'testaoText2'
  },
  {
    image: 'https://placekitten.com/200/203',
    text: 'Oscar',
    infoText: 'testaInfoText3'
  },
  {
    image: 'https://placekitten.com/200/204',
    text: 'Dusty',
    infoText: 'testaInfoText'
  },
  {
    image: 'https://placekitten.com/200/204',
    text: 'Dusty',
    infoText: 'testaInfoText'
  },
  {
    image: 'https://placekitten.com/200/204',
    text: 'Dusty',
    infoText: 'testaInfoText'
  },

];

export default class ConfirmPage extends Component {

  constructor(props) {
    super(props);
    this.state = { data }
  }
  render() {
    return (
      <View style={styles.container}>
      <Header
        textStyle={{ color: '#ffffff' }}
        style={{ backgroundColor: '#8A4797', marginBottom: 5 }}
        title='Confirmation page'
        leftIcon={null}
        rightIcon={
          <EvilIcons
            name='trash'
            style={{
              color: '#ffffff',
              right: 0,
              top: 0
            }}
            size={35}
          />
        }
        navigation={this.props.navigation}
      />

      <SortableList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        data={data}
        onPressRow={(key) => this.onPressRow(data[key])}
        renderRow={this._renderRow}
      />
      <View
      style={{
        flexDirection: 'column',
      }}
      >
      <CustomButton
        buttonStyle={styles.confimButtonStyle}
        textStyle={styles.confimTextStyle}
        text={'Confim'}
        onPress={() => this.onPressConfirmButton()}
      />
      </View>
      </View>
    );
  }

  createIndexes() {
    const listOfIndexes = [];
    for (let i = 0; i < data.length + 1; i++) {
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
  onPressConfirmButton() {
    if (data.length < 5) {
      Alert.alert('Vänligen välj minst 5 sektioner')
    } else {
      Alert.alert('Tack för dina val, vi ska göra allt vi kan för att upfylla dina önskningar!')
}
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
    width: window.width,
    height: window.height,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0)',
    paddingTop: 0,
  },
  innerView: {
    width: window.width,
    height: window.height - 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0)',
    padding: 10,
    paddingTop: 0
  },
  confimTextStyle: {
    fontSize: 15,
    color: '#F4376D'
  },
  confimButtonStyle: {
    height: window.height / 9,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#F4376D',
    borderRadius: 0,
    margin: 0,
    alignSelf: 'flex-start',
    bottom: 0,
    width: window.width
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    width: window.width,
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
