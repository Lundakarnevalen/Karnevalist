import React, { Component } from 'react';
import { View, WebView, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Header } from '../../common';
import { HEIGHT, WIDTH } from '../../../helpers/LanguageStrings';

class NewsScreen extends Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }

  render() {
    const { navigation } = this.props;
    const { title, url } = navigation.state.params.info;
    return (
      <View
        style={{ height: HEIGHT, width: WIDTH }}
      >
        <Header title={title} navigation={navigation} />
        <WebView source={{ uri: url }} />
      </View>
    );
  }
}

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, null)(NewsScreen);
