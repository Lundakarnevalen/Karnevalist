import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SortableList from 'react-native-sortable-list';
import Row from '../common/Row';
import Header from '../common/Header';
import { getSections, removeItem } from '../../helpers/LocalSave';
import BackgroundImage from '../common/BackgroundImage';

const window = Dimensions.get('window');

class ConfirmPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ key: '', id: '', text: '', infoText: '', image: '' }],
      editMode: false,
      alertVisible: false,
      rows: []
    };
  }

  componentWillMount() {
    const tempData = [];
    getSections(sections => {
      sections.forEach((section, i) => {
        tempData.push({
          key: section.key,
          id: i,
          text: section.value,
          infoText: 'PLACEHOLDER',
          image: 'https://placekitten.com/200/204'
        });
      });
      this.setState({ data: tempData });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage imagePath={require('../../../assets/images/background2.png')} />
        <Header
          textStyle={{ color: '#f4376d' }}
          style={{ backgroundColor: '#ffffff', marginBottom: 5 }}
          title="Confirmation page"
          navigation={this.props.navigation}
          rightIcon={
            <TouchableOpacity
              style={{ width: 50, alignItems: 'center' }}
              onPress={() => this.onPressHeaderButton()}
            >
              <MaterialIcons
                name={this.getHeaderIconName()}
                style={{
                  color: '#f4376d',
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
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity
            style={styles.confimButtonStyle}
            onPress={() => this.onPressConfirmButton()}
          >
            <Text style={styles.confimTextStyle}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  deleteRow(id) {
    const newData = this.state.data.filter(dataItem => dataItem.id !== id);
    const toRemove = this.state.data.filter(dataItem => dataItem.id === id);
    removeItem(toRemove[0].key);
    this.setState({ data: newData });
  }

  renderRow(item) {
    if (this.state.rows.length > this.state.data.length) {
      this.setState({ rows: [] });
    } else {
      this.state.rows.push(item);
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
      return 'done';
    }
    return 'edit';
  }

  getRowIconName() {
    if (this.state.editMode) {
      return 'trash';
    }
    return 'navicon';
  }

  onPressTrash(key) {
    Alert.alert('Navigera till ' + key + '-sektionen');
  }

  onPressConfirmButton() {
    const { rows } = this.state;
    if (rows.length < 5) {
      Alert.alert('Vänligen välj minst 5 stycken sektioner');
    } else {
      Alert.alert('Tack för dina val');
    }
  }

  onPressHeaderButton() {
    if (this.state.editMode) {
      this.setState({ editMode: false });
    } else {
      this.setState({ editMode: true });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: window.width,
    height: window.height,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0)',
    paddingTop: 0
  },
  innerView: {
    width: window.width,
    height: window.height - 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0)',
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
    flex: 1
  },
  contentContainer: {
    width: window.width
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25
  },
  text: {
    fontSize: 24,
    color: '#222222'
  }
});
export default ConfirmPage;
