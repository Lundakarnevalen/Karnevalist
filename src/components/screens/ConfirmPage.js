import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
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
      data: [],
      editMode: false,
      alertVisible: false
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

  renderSortableListOrMessage() {
    const { contentContainer, list, confimButtonStyle, confimTextStyle, text } = styles;
    if (this.state.data.length === 0) {
      return (
        <View
          style={{ height: window.height - 64, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={text}>No selected sections</Text>
        </View>
      );
    }
    return (
      <View style={{ height: window.height - 64 }}>
        <SortableList
          style={list}
          contentContainerStyle={contentContainer}
          data={this.state.data}
          renderRow={this.renderRow.bind(this)}
        />
        <TouchableOpacity style={confimButtonStyle} onPress={() => this.onPressConfirmButton()}>
          <Text style={confimTextStyle}>Send</Text>
        </TouchableOpacity>
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
    const { data, index, active } = item;
    return (
      <Row
        data={data}
        index={index + 1}
        iconName={this.getRowIconName()}
        active={active}
        deleteRow={() => this.deleteRow(data.id)}
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
    const { data } = this.state;
    if (data.length < 5) {
      Alert.alert('Vänligen välj minst 5 stycken sektioner');
    } else {
      Alert.alert('Tack för dina val');
    }
  }

  onPressHeaderButton() {
    this.setState({ editMode: !this.state.editMode });
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage pictureNumber={2} />
        <Header
          textStyle={{ color: '#f4376d' }}
          style={{ backgroundColor: '#ffffff' }}
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
        {this.renderSortableListOrMessage()}
      </View>
    );
  }
}

const styles = {
  container: {
    width: window.width,
    height: window.height,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0)',
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
};

export default ConfirmPage;
