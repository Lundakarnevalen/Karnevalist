import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import axios from 'axios'
import SortableList from 'react-native-sortable-list';
import Row from '../common/Row';
import Header from '../common/Header';
import { getSections, removeItem } from '../../helpers/LocalSave';
import BackgroundImage from '../common/BackgroundImage';
import {  setSectionPriorities } from '../../actions'
import CustomButton from '../common/CustomButton';
import { CONFIRM_PAGE_STRINGS } from '../../helpers/LanguageStrings'

const window = Dimensions.get('window');

class ConfirmPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editMode: false,
      alertVisible: false,
      strings: this.getStrings()
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
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
          infoText: s.info,
          imguri: s.imguri
        });
      });
      const order = tempData.map(x => x.id)
      this.setState({ data: tempData, order });
    });
  }

  getStrings() {
    const { language } = this.props
    const { fields } = CONFIRM_PAGE_STRINGS
    const strings = {}
    fields.forEach(field => (strings[field] = CONFIRM_PAGE_STRINGS[field][language]))
    return strings
  }

  renderSortableListOrMessage() {
    const { contentContainer, list, confimTextStyle, textStyle } = styles;
    const { navigation } = this.props;
    const { strings } = this.state
    if (this.state.data.length === 0) {
      return (
        <View
          style={{ height: window.height - 64, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text
            style={[
              textStyle,
              { color: 'white' }
            ]}
          >
            {strings.sectionSelection}
          </Text>
          <CustomButton
            style={'standardButton'}
            text={strings.toSections}
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
          onChangeOrder={(nextOrder) => this.setState({ order: nextOrder })}
        />
        <TouchableOpacity
          style={this.getConfirmButtonStyle()}
          onPress={() => this.onPressConfirmButton()}
        >
          <Text style={confimTextStyle}>{strings.send}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  getBackgroundColor() {
    const { data } = this.state;
    if (data.length >= 5) {
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
    const newOrder = this.state.order.filter(i => i !== id);
    removeItem(toRemove[0].localKey);
    this.setState({ data: newData, order: newOrder });
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
    const { data, strings, order } = this.state;
    if (data.length < 5) {
      Alert.alert(strings.sectionSelection);
    } else {
      const sectionPriorities = order.map(i => {
        const index = data.findIndex(d => d.id + '' === i + '')
        return data[index].key
      })
      this.postSectionPriorities(sectionPriorities)
      this.props.setSectionPriorities(sectionPriorities)
      Alert.alert(strings.selectionOK);
    }
  }

  postSectionPriorities(sectionPriorities) {
    const url = 'https://api.10av10.com/api/section/'
    const headers = {
      Authorization: 'Bearer ' + this.props.token,
      'content-type': 'application/json'
    }
    axios.post(url, { sectionPriorities }, { headers })
    .then((response) => {
      //TODO TOAST??
    })
    .catch((error) => {
      // const msg = handleErrorMsg(error.message)
      console.log(error);
    });
  }

  onPressHeaderButton() {
    this.setState({ editMode: !this.state.editMode });
  }

  getRightIcon() {
    if (this.state.data.length > 0) {
      return (
        <TouchableOpacity
          style={{ width: 50, alignItems: 'center' }}
          onPress={() => this.onPressHeaderButton()}
        >
          <MaterialIcons
            name={this.getHeaderIconName()}
            style={{ color: 'white', right: 0 }}
            size={35}
          />
        </TouchableOpacity>
      );
    }
  }

  render() {
    const strings = this.getStrings()
    return (
      <View style={styles.container}>
        <BackgroundImage pictureNumber={2} />
        <Header
          title={strings.title}
          navigation={this.props.navigation}
          rightIcon={this.getRightIcon()}
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

const mapStateToProps = ({ currentTheme, sections, currentLanguage, userInformation }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  const { token } = userInformation
  return { theme, sections: sections.sections, language, token };
};

export default connect(mapStateToProps, { setSectionPriorities })(ConfirmPage);
