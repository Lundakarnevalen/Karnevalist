import React, { Component } from 'react';
import { Constants, Location, Permissions } from 'expo';
import { View, Text, Platform } from 'react-native';
import * as Vibration from 'react-native/Libraries/Vibration/Vibration';

class GameScreen extends Component {
  state = {
    myLocation: {
      longitude: 0,
      latitude: 0
    },
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

  distance(lat1, lng1, lat2, lng2) {
    const earthRadius = 6371000;
    const distLat = this.toRadians(lat2 - lat1);
    const distLng = this.toRadians(lng2 - lng1);

    const tmp1 = Math.sin(distLat / 2) * Math.sin(distLat / 2);
    const tmp2 =
      Math.cos(this.toRadians(lat1)) *
      Math.cos(this.toRadians(lat2)) *
      Math.sin(distLng / 2) *
      Math.sin(distLng / 2);

    const a = tmp1 + tmp2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
  }

  bearing(myLng, myLat, dstLng, dstLat) {
    const myLatRad = this.toRadians(myLat);
    const dstLatRad = this.toRadians(dstLat);

    const lngDiff = this.toRadians(dstLng - myLng);

    const y = Math.sin(lngDiff) * Math.cos(dstLatRad);
    const tmp1 = Math.cos(myLatRad) * Math.sin(dstLatRad);
    const tmp2 = Math.sin(myLatRad) * Math.cos(dstLatRad) * Math.cos(lngDiff);
    const x = tmp1 - tmp2;

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
        timeInterval: 200,
        distanceInterval: 1
      },
      location => {
        this.setState({ myLocation: location.coords });
      }
    );
  };

  render() {
    const { myLocation, dstLocation, myBearing } = this.state;

    const dstBearing = this.bearing(
      myLocation.longitude,
      myLocation.latitude,
      dstLocation.longitude,
      dstLocation.latitude
    );

    const dstDistance = this.distance(
      myLocation.latitude,
      myLocation.longitude,
      dstLocation.latitude,
      dstLocation.longitude
    );

    if (Math.abs(dstBearing - myBearing) < 30) {
      Vibration.vibrate(500);
    }

    return (
      <View style={{ flex: 1 }}>
        <Text>{JSON.stringify(myLocation)}</Text>
        <Text>dstBearing = {dstBearing}</Text>
        <Text>myBearing = {myBearing}</Text>
        <Text>
          dstBearing - myBearing =
          {Math.abs(dstBearing - myBearing)}
        </Text>
        <Text>Dist = {dstDistance}</Text>
      </View>
    );
  }
}

export default GameScreen;
