import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import axios from 'axios';
import SortableList from 'react-native-sortable-list';
import { Row, Header, BackgroundImage, CustomButton, SuperAgileAlert } from '../common';
import { removeItem } from '../../helpers/LocalSave';
import { fetchCheckInStatus } from '../../helpers/ApiManager';
import { SECTION_PRIORITY_URL, PROGRESS, LOGOUT_RESET_ACTION } from '../../helpers/Constants';
import { removeSectionPriority, setSectionPriorities, setProgress } from '../../actions';
import { CONFIRM_PAGE_STRINGS } from '../../helpers/LanguageStrings';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class ConfirmPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      editMode: false,
      alertVisible: false,
      message: '',
      alertHeader: '',
      strings: this.getStrings()
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
    this.updateData();
  }

  updateData() {
    const data = {};
    const { sections, sectionPriorities, language } = this.props;
    sectionPriorities.forEach(key => {
      const section = sections.filter(item => item.key + '' === key + '');
      if (section.length !== 0) {
        data[key] = {
          id: key,
          text: section[0].title[language],
          rowImage: section[0].rowImage
        };
      }
    });
    this.setState({ data });
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
    const { navigation, sectionPriorities } = this.props;
    const { strings, data } = this.state;
    if (sectionPriorities.length === 0) {
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
          order={sectionPriorities}
          renderRow={this.renderRow.bind(this)}
          onChangeOrder={nextOrder => this.props.setSectionPriorities(nextOrder)}
        />
        <View style={{ width: WIDTH, paddingLeft: 8 }}>
          <CustomButton
            style={sectionPriorities.length >= 5 ? 'standardButton' : 'tintStandardButton'}
            text={strings.send}
            width={WIDTH - 16}
            onPress={() => this.onPressConfirmButton()}
          />
        </View>
      </View>
    );
  }

  getConfirmButtonStyle() {
    const { sectionPriorities } = this.props;
    return {
      height: HEIGHT / 9,
      backgroundColor: sectionPriorities.length >= 5 ? '#F7A021' : '#a9a9a9',
      borderColor: '#ffffff',
      borderRadius: 0,
      margin: 0,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 0,
      width: WIDTH
    };
  }

  renderRow(item) {
    const { data, index, active } = item;
    return (
      <Row
        data={data}
        index={index + 1}
        iconName={this.state.editMode ? 'trash' : 'navicon'}
        active={active}
        deleteRow={() => this.props.removeSectionPriority(data.id)}
      />
    );
  }

  handleSend() {
    const { strings } = this.state;
    const { sectionPriorities } = this.props;
    if (sectionPriorities.length < 5) {
      this.setState({
        alertVisible: true,
        message: strings.sectionSelection,
        alertHeader: strings.alertErrorHeader
      });
    } else {
      this.setState({
        alertVisible: true,
        message: strings.confirmMessage,
        alertHeader: strings.confirmHeader
      });
    }
  }

  handleLogout() {
    const strings = this.getStrings();
    removeItem('email');
    removeItem('accessToken');
    this.setState({
      alertVisible: true,
      message: strings.expiredTokenMessage,
      alertHeader: strings.expiredTokenTitle
    });
  }

  onPressConfirmButton() {
    const strings = this.getStrings();
    const { progress, email, token } = this.props;
    if (progress === PROGRESS.CHECK_IN) {
      fetchCheckInStatus(email, token, checkedIn => {
        if (checkedIn === true) { // Detta för att fetchCheckInStatus
          this.props.setProgress(PROGRESS.CHOOSE_SECTIONS); //avänder callback vid error också
          this.handleSend();
        } else {
          this.setState({
            alertVisible: true,
            message: strings.checkinMessage,
            alertHeader: strings.alertErrorHeader
          });
        }
      });
    } else if (progress > PROGRESS.CHECK_IN)
      this.handleSend()
  }

  postSectionPriorities() {
    const { sectionPriorities } = this.props;
    const strings = this.getStrings();
    const headers = {
      Authorization: 'Bearer ' + this.props.token,
      'content-type': 'application/json'
    };
    axios
      .post(SECTION_PRIORITY_URL, { sectionPriorities }, { headers })
      .then(response => {
        if (response.data.success) {
          this.props.setProgress(PROGRESS.SENT_SECTIONS);
          this.setState({
            message: strings.selectionOK,
            alertHeader: strings.alertSuccessHeader
          });
        }
      })
      .catch(error => {
        if (error.response.status === 401) this.handleLogout();
      });
  }

  getRightIcon() {
    const { sectionPriorities } = this.props;
    if (sectionPriorities.length > 0) {
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
    const strings = this.getStrings();
    switch (message) {
      case strings.selectionOK:
        return [
          {
            text: strings.ok,
            onPress: () => {
              this.setState({ alertVisible: false });
              this.props.navigation.goBack();
            }
          }
        ];
      case strings.confirmMessage:
        return [
          { text: strings.cancel, onPress: () => this.setState({ alertVisible: false }) },
          { text: strings.yes, onPress: () => this.postSectionPriorities() }
        ];
      case strings.expiredTokenMessage:
        return [
          { text: strings.ok, onPress: () => this.props.navigation.dispatch(LOGOUT_RESET_ACTION) }
        ];
      default:
        return [{ text: strings.ok, onPress: () => this.setState({ alertVisible: false }) }];
    }
  }

  setAlertVisible(visible, message) {
    const strings = this.getStrings();
    this.setState({ alertVisible: visible });
    if (message === strings.selectionOK)
      // This makes sure you can't stay on ConfirmPage
      this.props.navigation.goBack();
    if (message === strings.expiredTokenMessage)
      this.props.navigation.dispatch(LOGOUT_RESET_ACTION);
  }

  render() {
    const { message, alertVisible, alertHeader } = this.state;
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
  const { token, email, progress } = userInformation;
  const { sectionPriorities } = sections;
  return { sections: sections.sections, progress, email, language, token, sectionPriorities };
};

export default connect(mapStateToProps, {
  removeSectionPriority,
  setSectionPriorities,
  setProgress
})(ConfirmPage);
