import React, { Component } from 'react';
import { Dimensions, Text } from 'react-native';
import { BlurView } from 'expo';
import { connect } from 'react-redux';
import { LOADING_STRINGS } from '../../helpers/LanguageStrings';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
let interval;
/**
 * Loading class with redirect.
 * If redirect isn't needed redirect should be set to null.
 */
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedPercent: 0
    };
  }

  componentWillMount() {
    interval = setInterval(() => this.countTo99(), 15);
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  getStrings() {
    const { language } = this.props;
    const { fields } = LOADING_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = LOADING_STRINGS[field][language]));
    return strings;
  }

  countTo99() {
    if (this.props.loadingComplete && this.state.loadedPercent === 99) {
      this.props.redirect();
      clearInterval(interval);
    } else if (this.state.loadedPercent < 99) {
      this.setState({ loadedPercent: ++this.state.loadedPercent });
    }
  }

  render() {
    const { containerStyle, headerStyle } = styles;
    const strings = this.getStrings();
    return (
      <BlurView style={containerStyle}>
        <Text style={[headerStyle, { color: 'white' }]}>
          {strings.loading + this.state.loadedPercent.toString()}%
        </Text>
      </BlurView>
    );
  }
}

const styles = {
  containerStyle: {
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    position: 'absolute',
    padding: 20,
    height: HEIGHT
  },
  headerStyle: {
    fontFamily: 'Avenir Next Medium',
    fontSize: 36,
    color: 'rgb(138, 71, 151)',
    backgroundColor: 'transparent'
  }
};

const mapStateToProps = ({ currentTheme, currentLanguage }) => {
  const { theme } = currentTheme;
  const { language } = currentLanguage;
  return { theme, language };
};

export default connect(mapStateToProps, null)(Loading);
