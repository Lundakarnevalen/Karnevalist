import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  getItem,
  getPopoverStatus,
  getFavoriteSections
} from '~/src/helpers/LocalSave';
import { dynamicSort } from '~/src/helpers/functions';
import { BackgroundImage, Loading } from '~/src/components/common';
import {
  setSections,
  setToken,
  setEmail,
  setSectionPriorities,
  setUserinfo,
  setPopover
} from '~/src/actions';
import { fetchSections, fetchUserinfo } from '~/src/helpers/ApiManager';

class SplashScreen extends Component {
  componentWillMount() {
    const { language } = this.props;
    StatusBar.setBarStyle('light-content', true);
    this.authorize();
    getFavoriteSections(result => this.props.setSectionPriorities(result));
    ['homeScreenPopover', 'sectionScreenPopover'].forEach(popover => {
      getPopoverStatus(popover, bool => this.props.setPopover(popover, bool));
    });
    fetchSections(sections => {
      sections.sort(dynamicSort('title', language));
      this.props.setSections(sections);
    });
  }

  authorize() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
      key: null
    });
    setTimeout(
      () =>
        getItem('email', email => {
          if (email !== null) {
            getItem('accessToken', token => {
              fetchUserinfo(email, token, (response, error = false) => {
                if (error) {
                  this.props.navigation.dispatch(resetAction);
                } else {
                  resetAction.actions = [
                    NavigationActions.navigate({
                      routeName: 'MyPageNavRouter'
                    })
                  ];
                  this.props.setToken(token);
                  this.props.setEmail(email);
                  this.props.setUserinfo(response);
                  this.props.navigation.dispatch(resetAction);
                }
              });
            });
          } else {
            this.props.navigation.dispatch(resetAction);
          }
        }),
      2000
    );
  }

  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <BackgroundImage pictureNumber={4} />
        <Loading loadingComplete={false} redirect={null} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 227,
    height: 200,
    resizeMode: 'contain'
  },
  text: {
    marginTop: 50,
    fontSize: 30,
    color: 'white',
    fontFamily: 'Avenir Next Medium',
    backgroundColor: 'transparent'
  },
  rowImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8
  }
};

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

SplashScreen.propTypes = {
  language: PropTypes.string.isRequired,
  navigation: PropTypes.shape().isRequired,
  setSectionPriorities: PropTypes.func.isRequired,
  setSections: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPopover: PropTypes.func.isRequired,
  setUserinfo: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  setSections,
  setToken,
  setEmail,
  setSectionPriorities,
  setUserinfo,
  setPopover
})(SplashScreen);
