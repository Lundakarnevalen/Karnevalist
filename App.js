import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Font, ScreenOrientation } from 'expo';
import Router from './src/components/Router';
import reducers from './src/reducers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false
    };
  }

  componentWillMount() {
    console.log(new Date().getHours());
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP);
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
    if (this.state.fontsLoaded) {
      return (
        <Provider store={createStore(reducers)}>
          <Router />
        </Provider>
      );
    }
    return null;
  }
}

export default App;
