import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import axios from 'axios';
import SortableList from 'react-native-sortable-list';
import { Row, Header, BackgroundImage, CustomButton, SuperAgileAlert } from '../common';
import {
  getFavoriteSections,
  saveFavoriteSections,
  removeFavoriteSection
} from '../../helpers/LocalSave';
import { logout } from '../../helpers/functions';
import { SECTION_PRIORITY_URL, PROGRESS } from '../../helpers/Constants';
import { setSectionPriorities, setProgress } from '../../actions';
import { CONFIRM_PAGE_STRINGS } from '../../helpers/LanguageStrings';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

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
    const { contentContainer, list, textStyle, listContainerView } = styles;
    const { navigation } = this.props;
    const { strings, data, order } = this.state;
    if (Object.keys(data).length === 0) {
      return (
        <View style={listContainerView}>
          <Text style={textStyle}>{strings.sectionSelection}</Text>
          <CustomButton
            style={'standardButton'}
            text={strings.toSections}
            onPress={() => navigation.goBack()}
          />
        </View>
      );
    }
    return (
      <View style={listContainerView}>
        <SortableList
          style={list}
          contentContainerStyle={contentContainer}
          data={data}
          order={order}
          renderRow={this.renderRow.bind(this)}
          onChangeOrder={nextOrder => {
            this.setState({ order: nextOrder })
            saveFavoriteSections(nextOrder, () => {});
          }}
        />
        <View style={{ width: WIDTH, paddingLeft: 8 }}>
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

  getConfirmButtonStyle() {
    return {
      height: HEIGHT / 9,
      backgroundColor: Object.keys(this.state.data).length >= 5 ? '#F7A021' : '#a9a9a9',
      borderColor: '#ffffff',
      borderRadius: 0,
      margin: 0,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 0,
      width: WIDTH
    };
  }

  deleteRow(key) {
    removeFavoriteSection(key, result => {
      if (result)
        this.updateData();
    });
    this.props.navigation.state.params.setSectionStatus(key);
  }

  renderRow(item) {
    const { data, index, active } = item;
    return (
      <Row
        data={data}
        index={index + 1}
        iconName={this.state.editMode ? 'trash' : 'navicon'}
        active={active}
        deleteRow={() => this.deleteRow(data.id)}
      />
    );
  }

  onPressConfirmButton() {
    const { data, strings } = this.state;
    if (Object.keys(data).length < 5) {
      this.setState({
        alertVisible: true,
        message: strings.sectionSelection,
        alertHeader: strings.alertErrorHeader
       })
    } else {
      this.setState({
        alertVisible: true,
        message: strings.confirmMessage,
        alertHeader: strings.confirmHeader
      })
    }
  }

  postSectionPriorities() {
    getFavoriteSections(sections => {
      const strings = this.getStrings();
      const headers = {
        Authorization: 'Bearer ' + this.props.token,
        'content-type': 'application/json'
      };
      axios
        .post(SECTION_PRIORITY_URL, { sectionPriorities: sections }, { headers })
        .then(response => {
          if (response.data.success) {
            this.props.setProgress(PROGRESS.SENT_SECTIONS);
            this.props.setSectionPriorities(sections)
            this.setState({
              message: strings.selectionOK,
              alertHeader: strings.alertSuccessHeader
             })
          }
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
    })
  }


  getRightIcon() {
    if (Object.keys(this.state.data).length > 0) {
      return (
        <TouchableOpacity
          style={{ width: 50, alignItems: 'center' }}
          onPress={() => this.setState({ editMode: !this.state.editMode })}
        >
          <MaterialIcons
            name={this.state.editMode ? 'done' : 'edit'}
            style={{ color: 'white', right: 0 }}
            size={30}
          />
        </TouchableOpacity>
      );
    }
  }

  renderAlertButtons(message) {
    const strings = this.getStrings()
    switch (message) {
      case strings.selectionOK:
        return ([
          {
            text: strings.ok,
            onPress: () => {
              this.setState({ alertVisible: false })
              this.props.navigation.goBack(null);
            }
          }
        ])
      case strings.confirmMessage:
        return (
          [{
            text: strings.cancel,
            onPress: () => this.setState({ alertVisible: false })
          },
            { text: strings.yes, onPress: () => this.postSectionPriorities() }
        ])
      default: return [{ text: strings.ok, onPress: () => this.setState({ alertVisible: false }) }]
    }
  }
  updateData() {
    const data = {};
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
      }
      this.setState({ data, order: sections });
    });
  }

  setAlertVisible(visible, message) {
    const strings = this.getStrings();
    this.setState({ alertVisible: visible })
    if (message === strings.selectionOK) // This makes sure you can't stay on ConfirmPage
      this.props.navigation.goBack();
  }

  render() {
    const { message, alertVisible, alertHeader } = this.state
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
        <SuperAgileAlert
          alertVisible={alertVisible}
          setAlertVisible={visible => this.setAlertVisible(visible, message)}
          buttonsIn={this.renderAlertButtons(message)}
          header={alertHeader || ''}
          info={message || ''}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    width: WIDTH,
    height: HEIGHT,
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
    width: WIDTH
  },
  textStyle: {
    fontSize: 24,
    fontFamily: 'Avenir Next Bold',
    backgroundColor: 'transparent',
    color: 'white'
  },
  listContainerView: {
    height: HEIGHT - 64,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

const mapStateToProps = ({ sections, currentLanguage, userInformation }) => {
  const { language } = currentLanguage;
  const { token } = userInformation;
  return { sections: sections.sections, language, token };
};

export default connect(mapStateToProps, { setSectionPriorities, setProgress })(ConfirmPage);
