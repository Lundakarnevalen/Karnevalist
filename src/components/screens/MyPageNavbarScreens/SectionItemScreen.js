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
import {
  getFavoriteSection,
  saveFavoriteSection,
  removeFavoriteSection
} from '../../../helpers/LocalSave';
import { SECTION_ITEM_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';

const HEIGHT = Dimensions.get('window').height;

class SectionItemScreen extends Component {
  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
    getFavoriteSection(id, result => {
      if (result) {
        this.setState({ favorite: true });
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      favorite: false
    };
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = SECTION_ITEM_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = SECTION_ITEM_SCREEN_STRINGS[field][language]));
    return strings;
  }

  renderRightIcon(id) {
    if (this.props.progress === PROGRESS.SENT_SECTIONS) return;
    if (!this.state.favorite) {
      return (
        <TouchableOpacity
          style={{ padding: 1, backgroundColor: 'transparent' }}
          onPress={() => {
            saveFavoriteSection(id);
            this.setState({ showToast: true, favorite: true });
          }}
        >
          <MaterialIcons name="favorite-border" size={30} color={'white'} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={{ padding: 1, backgroundColor: 'transparent' }}
        onPress={() => {
          removeFavoriteSection(id);
          this.setState({ showToast: true, favorite: false });
        }}
      >
        <MaterialIcons name="favorite" size={30} color={'white'} />
      </TouchableOpacity>
    );
  }

  renderToastMessage(title) {
    const strings = this.getStrings();
    if (!this.state.favorite) {
      return strings.messageStart + title + strings.messageEndRemove;
    }
    return strings.messageStart + title + strings.messageEndAdd;
  }

  render() {
    const { navigation } = this.props;
    const { title, description, image, id } = navigation.state.params;
    const { container, scrollStyle, headerStyle, textStyle } = styles;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header title={title} navigation={navigation} rightIcon={this.renderRightIcon(id)} />
        <View>
          <ScrollView style={scrollStyle}>
            <View style={container}>{image}</View>
            <View style={{ height: 10, backgroundColor: 'white' }} />
            <Text style={[headerStyle, { color: '#F7A021' }]}>{title}</Text>
            <Text style={textStyle}>{description}</Text>
          </ScrollView>
          <Toast
            showToast={this.state.showToast}
            onClose={() => this.setState({ showToast: false })}
            message={this.renderToastMessage(title)}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width
  },
  scrollStyle: {
    maxHeight: Platform.OS === 'ios' ? HEIGHT : HEIGHT - Constants.statusBarHeight
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
    backgroundColor: 'transparent'
  }
};

const mapStateToProps = ({ userInformation, currentLanguage }) => {
  const { language } = currentLanguage;
  const { progress } = userInformation;
  return { language, progress };
};

export default connect(mapStateToProps, null)(SectionItemScreen);
