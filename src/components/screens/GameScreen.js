import React, { Component } from 'react';
import { Constants, Location, Permissions } from 'expo';
import { View, Text, Platform } from 'react-native';
import * as Vibration from 'react-native/Libraries/Vibration/Vibration';

class GameScreen extends Component {
  state = {
    myLocation: null,
    dstLocation: {
      longitude: 13.215544,
      latitude: 55.721063
    },
    myBearing: 0
  };

  toRadians(deg) {
    return deg * (Math.PI / 180);
  }

  toDegrees(rad) {
    return rad * (180 / Math.PI);
  }

  bearing(myLng, myLat, dstLng, dstLat) {
    const myLatRad = this.toRadians(myLat);
    const dstLatRad = this.toRadians(dstLat);

    const lngDiff = this.toRadians(dstLng - myLng);

    const y = Math.sin(lngDiff) * Math.cos(dstLatRad);
    const tmp1 = Math.cos(myLatRad) * Math.sin(dstLatRad);
    const tmp2 = Math.sin(myLatRad) * Math.cos(dstLatRad) * Math.cos(lngDiff);
    const x = tmp1 - tmp2;

    console.log(Math.atan2(y, x));

    return (this.toDegrees(Math.atan2(y, x)) + 360) % 360;
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    Location.watchHeadingAsync(heading => {
      this.setState({ myBearing: heading.trueHeading });
    });

    Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 200
      },
      location => {
        this.setState({ myLocation: location.coords });
      }
    );
  };

  render() {
    const dstBearing = this.state.location
      ? this.bearing(
          this.state.myLocation.longitude,
          this.state.myLocation.latitude,
          this.state.dstLocation.longitude,
          this.state.dstLocation.latitude
        )
      : 0;

    if (Math.abs(dstBearing - this.state.myBearing) < 30) {
      Vibration.vibrate(500);
    }

    return (
      <View style={{ flex: 1 }}>
        <Text>{JSON.stringify(this.state.myLocation)}</Text>
        <Text>dstBearing = {dstBearing}</Text>
        <Text>myBearing = {this.state.myBearing}</Text>
        <Text>
          dstBearing - myBearing =
          {this.state.myLocation ? Math.abs(dstBearing - this.state.myBearing) : ''}
        </Text>
      </View>
    );
  }
}

export default GameScreen;
