import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import axios from 'axios';
import SortableList from 'react-native-sortable-list';
import { Row, Header, BackgroundImage, CustomButton } from '../common';
import {
  getFavoriteSections,
  saveFavoriteSections,
  removeFavoriteSection
} from '../../helpers/LocalSave';
import { logout } from '../../helpers/functions';
import { SECTION_PRIORITY_URL, PROGRESS } from '../../helpers/Constants';
import { setSectionPriorities, setProgress } from '../../actions';
import { CONFIRM_PAGE_STRINGS } from '../../helpers/LanguageStrings';

const window = Dimensions.get('window');
const WIDTH = Dimensions.get('window').width;

class ConfirmPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      order: [],
      editMode: false,
      alertVisible: false,
      strings: this.getStrings()
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
    this.updateData();
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = CONFIRM_PAGE_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = CONFIRM_PAGE_STRINGS[field][language]));
    return strings;
  }

  renderSortableListOrMessage() {
    const { contentContainer, list, textStyle } = styles;
    const { navigation } = this.props;
    const { strings, data, order } = this.state;
    if (Object.keys(data).length === 0) {
      return (
        <View
          style={{
            height: window.height - 64,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={[textStyle, { color: 'white' }]}>{strings.sectionSelection}</Text>
          <CustomButton
            style={'standardButton'}
            text={strings.toSections}
            onPress={() => navigation.goBack()}
          />
        </View>
      );
    }
    return (
      <View
        style={{
          height: window.height - 64,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <SortableList
          style={list}
          contentContainerStyle={contentContainer}
          data={data}
          order={order}
          renderRow={this.renderRow.bind(this)}
          onChangeOrder={nextOrder => {
            saveFavoriteSections(nextOrder, () => {});
          }}
        />
        <View
          style={{
            width: WIDTH,
            paddingLeft: 8
          }}
        >
          <CustomButton
            style={Object.keys(data).length >= 5 ? 'standardButton' : 'tintStandardButton'}
            text={strings.send}
            width={WIDTH - 16}
            onPress={() => this.onPressConfirmButton()}
          />
        </View>
      </View>
    );
  }

  getBackgroundColor() {
    const { data } = this.state;
    if (Object.keys(data).length >= 5) {
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

  deleteRow(key) {
    removeFavoriteSection(key, result => {
      if (result) {
        this.updateData();
      }
    });
    this.props.navigation.state.params.setSectionStatus(key);
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
    const { data, strings } = this.state;
    if (Object.keys(data).length < 5) {
      Alert.alert(strings.sectionSelection);
    } else {
      getFavoriteSections(sections => {
        if (sections) {
          this.props.setSectionPriorities(sections);
          Alert.alert(strings.selectionOK);
        }
      });
    }
  }

  postSectionPriorities(sectionPriorities) {
    const strings = this.getStrings();
    const headers = {
      Authorization: 'Bearer ' + this.props.token,
      'content-type': 'application/json'
    };
    axios
      .post(SECTION_PRIORITY_URL, { sectionPriorities }, { headers })
      .then(response => {
        if (response.data.success) {
          this.props.setSectionPriorities(sectionPriorities);
          this.props.setProgress(PROGRESS.SENT_SECTIONS);
          Alert.alert(strings.selectionOK);
          this.props.navigation.goBack(null);
        }
        //TODO TOAST??
      })
      .catch(error => {
        if (error.response.status === 401)
          logout(
            this.props.navigation,
            true,
            strings.expiredTokenTitle,
            strings.expiredTokenMessage
          );
        console.log(error);
      });
  }

  onPressHeaderButton() {
    this.setState({ editMode: !this.state.editMode });
  }

  getRightIcon() {
    if (Object.keys(this.state.data).length > 0) {
      return (
        <TouchableOpacity
          style={{ width: 50, alignItems: 'center' }}
          onPress={() => this.onPressHeaderButton()}
        >
          <MaterialIcons
            name={this.getHeaderIconName()}
            style={{ color: 'white', right: 0 }}
            size={30}
          />
        </TouchableOpacity>
      );
    }
  }

  updateData() {
    const data = {};
    let order = [];
    const allSections = this.props.sections;
    getFavoriteSections(sections => {
      if (sections) {
        sections.forEach(key => {
          const s = allSections.filter(item => item.key + '' === key + '')[0];
          data[key] = {
            id: key,
            text: s.title,
            imguri: s.imguri
          };
        });
        order = sections;
      }
      this.setState({ data, order });
    });
  }

  render() {
    const strings = this.getStrings();
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
  textStyle: {
    fontSize: 24,
    fontFamily: 'Avenir Next Bold',
    backgroundColor: 'transparent'
  }
};

const mapStateToProps = ({ sections, currentLanguage, userInformation }) => {
  const { language } = currentLanguage;
  const { token } = userInformation;
  return { sections: sections.sections, language, token };
};

export default connect(mapStateToProps, { setSectionPriorities, setProgress })(ConfirmPage);
