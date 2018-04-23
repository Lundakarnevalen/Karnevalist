import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Font, ScreenOrientation, Asset, AppLoading } from 'expo';
import { getItem, saveItem } from './src/helpers/LocalSave';
import Router from './src/components/Router';
import reducers from './src/reducers';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      imagesLoaded: false
    };
  }

  componentWillMount() {
    getItem('language', language => {
      if (language === null) {
        this.setState({ language: 'SE' });
        saveItem('language', 'SE');
      } else {
        this.setState({ language });
      }
    });
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP);
    Asset.loadAsync([
      require('./assets/images/night1.png'),
      require('./assets/images/night2.png'),
      require('./assets/images/night3.png'),
      require('./assets/images/night4.png'),
      require('./assets/images/night5.png'),
      require('./assets/images/skattjakt.png'),
      require('./assets/images/Monstergubbe.png'),
      require('./assets/images/background-login-screen.png')
    ]).then(() => this.setState({ imagesLoaded: true }));
    Font.loadAsync({
      'Avenir Next Bold': require('./assets/fonts/AvenirNext-Bold-01.ttf'),
      'Avenir Next Bold Italic': require('./assets/fonts/AvenirNext-BoldItalic-02.ttf'),
      'Avenir Next Demi Bold': require('./assets/fonts/AvenirNext-DemiBold-03.ttf'),
      'Avenir Next Demi Bold Italic': require('./assets/fonts/AvenirNext-DemiBoldItalic-04.ttf'),
      'Avenir Next Italic': require('./assets/fonts/AvenirNext-Italic-05.ttf'),
      'Avenir Next Medium': require('./assets/fonts/AvenirNext-Medium-06.ttf'),
      'Avenir Next Medium Italic': require('./assets/fonts/AvenirNext-MediumItalic-07.ttf'),
      'Avenir Next Regular': require('./assets/fonts/AvenirNext-Regular-08.ttf'),
      'Avenir Next Heavy': require('./assets/fonts/AvenirNext-Heavy-09.ttf'),
      'Avenir Next Heavy Italic': require('./assets/fonts/AvenirNext-HeavyItalic-10.ttf'),
      'AvenirNext-UltraLight': require('./assets/fonts/AvenirNext-UltraLight-11.ttf'),
      'Avenir Next Ultra Light Italic': require('./assets/fonts/AvenirNext-UltraLightItalic-12.ttf')
    }).then(() => this.setState({ fontsLoaded: true }));
  }

  render() {
    const { imagesLoaded, fontsLoaded, language } = this.state;
    if (fontsLoaded && language && imagesLoaded) {
      const INITIAL_STATE = { currentLanguage: { language } };
      return (
        <Provider store={createStore(reducers, INITIAL_STATE)}>
          <Router />
        </Provider>
      );
    }
    return (
      <AppLoading
        startAsync={this._loadAssetsAsync}
        onFinish={() => this.setState({ isReady: true })}
        onError={console.warn}
      />
    );
  }
}

export default App;
