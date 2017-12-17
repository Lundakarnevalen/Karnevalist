import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import SortableList from 'react-native-sortable-list';
import Row from '../common/Row';
import Header from '../common/Header';
import { getSections, removeItem } from '../../helpers/LocalSave';
import BackgroundImage from '../common/BackgroundImage';
import CustomButton from '../common/CustomButton';

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
    const allSections = this.props.sections;
    getSections(sections => {
      sections.forEach((section, i) => {
        const key = section.key.substring(7);
        const s = allSections.filter(item => item.key + '' === key)[0];
        tempData.push({
          key,
          localKey: section.key,
          id: i,
          text: s.title,
          infoText: s.content,
          imguri: s.imguri
        });
      });
      this.setState({ data: tempData });
    });
  }

  getColor() {
    switch (this.props.theme) {
      case 'morning':
        return '#F7A021';
      case 'day':
        return '#f4376d';
      default:
        return 'white';
    }
  }

  renderSortableListOrMessage() {
    const { contentContainer, list, confimTextStyle, textStyle } = styles;
    const { navigation } = this.props;
    if (this.state.data.length === 0) {
      return (
        <View
          style={{ height: window.height - 64, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text
            style={[
              textStyle,
              { color: this.props.theme === 'night' ? 'white' : 'black', textAlign: 'center' }
            ]}
          >
            Please select at least 5 sections
          </Text>
          <CustomButton
            style={'standardButton'}
            text={'To section selection'}
            onPress={() => navigation.goBack()}
          />
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
        <TouchableOpacity
          style={this.getConfirmButtonStyle()}
          onPress={() => this.onPressConfirmButton()}
        >
          <Text style={confimTextStyle}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }

  getBackgroundColor() {
    const { data } = this.state;
    const { theme } = this.props;
    if (data.length >= 5) {
      if (theme === 'day') {
        return '#F4376D';
      }
      return '#F7A021';
    }
    return '#a9a9a9';
  }

  getConfirmButtonStyle() {
    return {
      height: window.height / 9,
      backgroundColor: this.getBackgroundColor(),
      borderColor: '#ffffff',
      borderRadius: 0,
      margin: 0,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 0,
      width: window.width
    };
  }

  deleteRow(id) {
    const newData = this.state.data.filter(dataItem => dataItem.id !== id);
    const toRemove = this.state.data.filter(dataItem => dataItem.id === id);
    removeItem(toRemove[0].localKey);
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
          title="Confirmation page"
          navigation={this.props.navigation}
          rightIcon={
            <TouchableOpacity
              style={{ width: 50, alignItems: 'center' }}
              onPress={() => this.onPressHeaderButton()}
            >
              <MaterialIcons
                name={this.getHeaderIconName()}
                style={{ color: this.getColor(), right: 0 }}
                size={35}
              />
            </TouchableOpacity>
          }
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
  textStyle: {
    fontSize: 24,
    fontFamily: 'Avenir Next Bold',
    backgroundColor: 'transparent'
  }
};

const mapStateToProps = ({ currentTheme, sections }) => {
  const { theme } = currentTheme;
  return { theme, sections: sections.sections };
};

export default connect(mapStateToProps, null)(ConfirmPage);
