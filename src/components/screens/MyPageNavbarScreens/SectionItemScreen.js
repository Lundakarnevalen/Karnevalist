import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions, ScrollView, BackHandler } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Header, Toast } from '../../common';
import { PROGRESS } from '../../../helpers/Constants';
import { removeSectionPriority, addSectionPriority, setProgress } from '../../../actions';
import { SECTION_ITEM_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
class SectionItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = SECTION_ITEM_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = SECTION_ITEM_SCREEN_STRINGS[field][language]));
    return strings;
  }

  renderRightIcon() {
    const { rightIconStyle } = styles;
    const { sectionPriorities, navigation } = this.props;
    const { id } = navigation.state.params;
    if (this.props.progress === PROGRESS.SENT_SECTIONS) return;
    if (sectionPriorities.indexOf(id) === -1) {
      return (
        <TouchableOpacity
          style={rightIconStyle}
          onPress={() => {
            if (sectionPriorities.length > 3 && this.props.progress > PROGRESS.CREATE_PROFILE)
              this.props.setProgress(PROGRESS.CHOOSE_SECTIONS);
            this.props.addSectionPriority(id);
            this.setState({ showToast: true, favorite: true });
          }}
        >
          <MaterialIcons name="favorite-border" size={30} color={'white'} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={rightIconStyle}
        onPress={() => {
          if (
            this.props.sectionPriorities.length < 6 &&
            this.props.progress > PROGRESS.CREATE_PROFILE
          )
            this.props.setProgress(PROGRESS.CHECK_IN);
          this.props.removeSectionPriority(id);
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
    const { headerTitle, title, description, image, id } = navigation.state.params;
    const { containerStyle, headerStyle, textStyle } = styles;
    return (
      <View style={containerStyle}>
        <Header
          title={headerTitle || title}
          navigation={navigation}
          rightIcon={this.renderRightIcon(id)}
        />
        <View>
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    height: HEIGHT,
    width: WIDTH,
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
  },
  rightIconStyle: {
    alignItems: 'center',
    padding: 1,
    backgroundColor: 'transparent',
    width: 60
  }
};

const mapStateToProps = ({ userInformation, currentLanguage, sections }) => {
  const { language } = currentLanguage;
  const { progress } = userInformation;
  const { sectionPriorities } = sections;
  return {
    language,
    progress,
    sectionPriorities
  };
};

export default connect(mapStateToProps, { removeSectionPriority, addSectionPriority, setProgress })(
  SectionItemScreen
);
