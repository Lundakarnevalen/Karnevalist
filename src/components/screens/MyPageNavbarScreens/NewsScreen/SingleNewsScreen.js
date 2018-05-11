import React, { Component } from 'react';
import { View, WebView, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'src/components/common';
import { HEIGHT, WIDTH } from 'src/helpers/LanguageStrings';

class NewsScreen extends Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.props.navigation.goBack()
    );
  }

  render() {
    const { navigation } = this.props;
    const { title, url } = navigation.state.params.info;
    return (
      <View style={{ height: HEIGHT, width: WIDTH }}>
        <Header title={title} navigation={navigation} />
        <WebView source={{ uri: url }} />
      </View>
    );
  }
}
NewsScreen.propTypes = {
  navigation: PropTypes.shape().isRequired
};

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, null)(NewsScreen);
