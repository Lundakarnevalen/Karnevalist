import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions, ScrollView, BackHandler } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Header, Toast } from '../../common';
import { PROGRESS } from '../../../helpers/Constants';
import { setProgress } from '../../../actions';
import {
  getFavoriteSection,
  getFavoriteSections,
  saveFavoriteSection,
  removeFavoriteSection
} from '../../../helpers/LocalSave';
import { SECTION_ITEM_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
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
    const { rightIconStyle } = styles;
    if (this.props.progress === PROGRESS.SENT_SECTIONS) return;
    if (!this.state.favorite) {
      return (
        <TouchableOpacity
          style={rightIconStyle}
          onPress={() => {
            getFavoriteSections(sections => {
              if (sections.length >= 4) {
                this.props.setProgress(3);
              } else {
                this.props.setProgress(2);
              }
            });
            saveFavoriteSection(id);
            this.props.navigation.state.params.setSectionStatus(true);
            this.setState({ showToast: true, favorite: true });
            getFavoriteSections(sections => {
              if (sections.length >= 4) this.props.setProgress(PROGRESS.CHOOSE_SECTIONS);
            });
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
          removeFavoriteSection(id, () => {
            getFavoriteSections(sections => {
              if (sections.length >= 5) {
                this.props.setProgress(3);
              } else {
                this.props.setProgress(2);
              }
            });
          });
          this.props.navigation.state.params.setSectionStatus(false);
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
    const { containerStyle, headerStyle, textStyle } = styles;
    return (
      <View style={containerStyle}>
        <Header title={title} navigation={navigation} rightIcon={this.renderRightIcon(id)} />
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
  },
  rightIconStyle: {
    alignItems: 'center',
    padding: 1,
    backgroundColor: 'transparent',
    width: 60
  }
};

const mapStateToProps = ({ userInformation, currentLanguage }) => {
  const { language } = currentLanguage;
  const { progress } = userInformation;
  return { language, progress };
};

export default connect(mapStateToProps, { setProgress })(SectionItemScreen);
