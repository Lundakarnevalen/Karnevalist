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
import Header from '../../common/Header';
import Toast from '../../common/Toast';
import { saveItem } from '../../../helpers/LocalSave';
import { SECTION_ITEM_SCREEN_STRINGS } from '../../../helpers/LanguageStrings'

const HEIGHT = Dimensions.get('window').height;

class SectionItemScreen extends Component {

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }

  constructor(props) {
    super(props);
    this.state = {
      showToast: false
    };
  }

  getColor() {
    return this.props.theme === 'day' ? '#f4376d' : '#F7A021';
  }

  getIconColor() {
    switch (this.props.theme) {
      case 'morning':
        return '#F7A021';
      case 'day':
        return '#f4376d';
      default:
        return 'white';
    }
  }

  getStrings() {
    const { language } = this.props
    const { fields } = SECTION_ITEM_SCREEN_STRINGS
    const strings = {}
    fields.forEach(field => (strings[field] = SECTION_ITEM_SCREEN_STRINGS[field][language]))
    return strings
  }

  render() {
    const { navigation, color } = this.props;
    const { title, description, image, id } = navigation.state.params;
    const { container, scrollStyle, headerStyle, textStyle } = styles;
    const strings = this.getStrings()
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          title={title}
          navigation={navigation}
          rightIcon={
            <TouchableOpacity
              style={{ padding: 1, backgroundColor: 'transparent' }}
              onPress={() => {
                saveItem('sektion' + id, title);
                this.setState({ showToast: true });
              }}
            >
              <MaterialIcons name="favorite" size={30} color={color} />
            </TouchableOpacity>
          }
        />
        <Toast
          color={'#f4376d'}
          showToast={this.state.showToast}
          onClose={() => this.setState({ showToast: false })}
          message={strings.messageStart + title + strings.messageEnd}
        />
        <ScrollView style={scrollStyle}>
          <View style={container}>{image}</View>
          <View style={{ height: 10, backgroundColor: 'white' }} />
          <Text style={[headerStyle, { color: this.getColor() }]}>{title}</Text>
          <Text style={textStyle}>{description}</Text>
        </ScrollView>
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

const mapStateToProps = ({ currentTheme, currentLanguage }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  return { theme, language };
};

export default connect(mapStateToProps, null)(SectionItemScreen);
