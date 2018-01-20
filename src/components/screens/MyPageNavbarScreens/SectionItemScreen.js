import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  Platform,
  BackHandler
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import { Header, Toast } from '../../common';
import { PROGRESS } from '../../../helpers/Constants';
import { saveItem, removeItem, getItem } from '../../../helpers/LocalSave';
import { SECTION_ITEM_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
class SectionItemScreen extends Component {
  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
    getItem('sektion' + id, result => {
      if (result) {
        this.setState({ added: true });
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      added: false
    };
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = SECTION_ITEM_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = SECTION_ITEM_SCREEN_STRINGS[field][language]));
    return strings;
  }

  renderRightIcon(id, title) {
    if (this.props.progress === PROGRESS.SENT_SECTIONS) return;
    if (!this.state.added) {
      return (
        <TouchableOpacity
          style={{ padding: 1, backgroundColor: 'transparent' }}
          onPress={() => {
            saveItem('sektion' + id, title);
            this.setState({ showToast: true, added: true });
          }}
        >
          <MaterialIcons name="favorite" size={30} color={'white'} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={{ padding: 1, backgroundColor: 'transparent' }}
        onPress={() => {
          removeItem('sektion' + id);
          this.setState({ showToast: true, added: false });
        }}
      >
        <MaterialIcons name="delete" size={30} color={'white'} />
      </TouchableOpacity>
    );
  }

  renderToastMessage(title) {
    const strings = this.getStrings();
    if (!this.state.added) {
      return strings.messageStart + title + strings.messageEndRemove;
    }
    return strings.messageStart + title + strings.messageEndAdd;
  }

  render() {
    const { navigation } = this.props;
    const { title, description, image, id } = navigation.state.params;
    const { containerStyle, headerStyle, textStyle } = styles;
    return (
      <View style={containerStyle}>
        <Header title={title} navigation={navigation} rightIcon={this.renderRightIcon(id, title)} />
        <ScrollView>
          {image}
          <Text style={[headerStyle, { color: '#F7A021' }]}>{title}</Text>
          <Text style={textStyle}>{description}</Text>
        </ScrollView>
        <Toast
          showToast={this.state.showToast}
          onClose={() => this.setState({ showToast: false })}
          message={this.renderToastMessage(title)}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    height: HEIGHT,
    width: WIDTH,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  imageStyle: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH - 5,
    height: WIDTH - 5,
    resizeMode: 'contain'
  },
  headerStyle: {
    fontSize: 26,
    margin: 10,
    fontFamily: 'Avenir Next Bold',
    backgroundColor: 'transparent'
  },
  textStyle: {
    fontSize: 16,
    margin: 10,
    fontFamily: 'Avenir Next Medium',
    backgroundColor: 'transparent',
    color: '#333'
  }
};

const mapStateToProps = ({ userInformation, currentLanguage }) => {
  const { language } = currentLanguage;
  const { progress } = userInformation;
  return { language, progress };
};

export default connect(mapStateToProps, null)(SectionItemScreen);
