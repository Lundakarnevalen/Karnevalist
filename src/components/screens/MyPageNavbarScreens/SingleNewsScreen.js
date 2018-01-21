import React, { Component } from 'react';
import { View, WebView, Dimensions, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Header } from '../../common';

class NewsScreen extends Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }

  render() {
    const { navigation } = this.props;
    const { title, url } = navigation.state.params.info;
    return (
      <View
        style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}
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
