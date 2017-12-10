import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import SortableList from 'react-native-sortable-list'
import Row from '../common/Row'
import SuperAgileAlert from '../common/SuperAgileAlert'
import Header from '../common/Header'

const window = Dimensions.get('window');

const inputJSON = [
  {
    image: 'https://placekitten.com/200/201',
    text: 'OMRÅDESSEKTIONOMRÅDESSEKTIONERNAOMRÅDESSEKTIONERNAERNA',
    infoText: 'Hej jag heter OscarHej jag hlllter OscarHej jag he',
    id: 0
  },
  {
    image: 'https://placekitten.com/200/202',
    text: 'Pepper',
    infoText: 'testaoText2',
    id: 1
  },
  {
    image: 'https://placekitten.com/200/203',
    text: 'Oscar',
    infoText: 'testaInfoText3',
    id: 2
  },
  {
    image: 'https://placekitten.com/200/204',
    text: 'Dusty1',
    infoText: 'testaInfoText',
    id: 3
  },
  {
    image: 'https://placekitten.com/200/204',
    text: 'Dusty2',
    infoText: 'testaInfoText',
    id: 4
  },
  {
    image: 'https://placekitten.com/200/204',
    text: 'Dusty3',
    infoText: 'testaInfoText',
    id: 5
  },
  {
    image: 'https://placekitten.com/200/204',
    text: 'Dusty4',
    infoText: 'testaInfoText',
    id: 3
  },
  {
    image: 'https://placekitten.com/200/204',
    text: 'Dusty5',
    infoText: 'testaInfoText',
    id: 4
  },
  {
    image: 'https://placekitten.com/200/204',
    text: 'Dusty6',
    infoText: 'testaInfoText',
    id: 5
  },

];

export default class ConfirmPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editMode: false,
      alertVisible: false,
      rows: []
    }
  }

  componentWillMount() {
    this.setState({ data: inputJSON })
  }
  render() {
    return (
      <View style={styles.container}>
      <Header
        textStyle={{ color: '#ffffff' }}
        style={{ backgroundColor: '#8A4797', marginBottom: 5 }}
        title='Confirmation page'
        navigation={this.props.navigation}
        rightIcon={
          <TouchableOpacity
          style={{
            width: 50,
            alignItems: 'center'
          }}
          onPress={() => this.onPressHeaderButton()}
          >
          <MaterialIcons
            name={this.getHeaderIconName()}
            style={{
              color: '#ffffff',
              right: 0
            }}
            size={35}
          />
          </TouchableOpacity>
        }
        navigation={this.props.navigation}
      />

      <SortableList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        data={this.state.data}
        renderRow={this.renderRow.bind(this)}
      />
      <SuperAgileAlert
      header={'Header'}
      info={'Här skriver du in din info...'}
      alertVisible={this.state.alertVisible}
      buttonsIn={[{ text: 'Yes', onPress: () => console.log('Yes was pressed') },
                    { text: 'No', onPress: () => console.log('No was pressed') }]}
      />
      <View
      style={{
        flexDirection: 'column',
      }}
      >
      <TouchableOpacity
        style={styles.confimButtonStyle}

        onPress={() => this.onPressConfirmButton()}
      >
        <Text style={styles.confimTextStyle}> Send </Text>
      </TouchableOpacity>
      </View>
      </View>
    );
  }


  deleteRow(id) {
    const newData = this.state.data.filter(dataItem => dataItem.id !== id)
    this.setState({ data: newData });
  }

  renderRow(item) {
    if (this.state.rows.length > this.state.data.length) {
      this.setState({ rows: [] })
    } else {
      this.state.rows.push(item)
    }
    return (
      <Row
        data={item.data}
        index={item.index + 1}
        iconName={this.getRowIconName()}
        active={item.active}
        deleteRow={() => this.deleteRow(item.data.id)}
      />
    );
  }

  getHeaderIconName() {
    if (this.state.editMode) {
      return 'done'
    }
    return 'edit'
  }

  getRowIconName() {
    if (this.state.editMode) {
      return 'trash'
    }
    return 'navicon'
  }

  onPressTrash(key) {
    Alert.alert('Navigera till ' + key.text + '-sektionen')
  }
  onPressConfirmButton() {
    const { rows } = this.state;
    const toReturn = []
    for (let i = 0; i < 5; i++) {
      toReturn.push(rows[i])
    }
    console.log(toReturn)
}

  onPressHeaderButton() {
    if (this.state.editMode) {
        this.setState({ editMode: false });
    } else {
        this.setState({ editMode: true });
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
    fontSize: 20,
    color: '#ffffff'
  },
  confimButtonStyle: {
    height: window.height / 9,
    backgroundColor: '#F4376D',
    borderColor: '#ffffff',
    borderRadius: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
