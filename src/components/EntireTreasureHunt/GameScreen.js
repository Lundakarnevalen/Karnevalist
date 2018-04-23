import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { Constants, Location, Permissions } from "expo";
import { View, Text, Platform } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import * as Vibration from "react-native/Libraries/Vibration/Vibration";
import PropTypes from "prop-types";
import { GAME_SCREEN_STRINGS } from "~/src/helpers/LanguageStrings";
import {  CountDown} from "~/src/components/common";
import { BackgroundImage } from "~/src/components/common";
import { WIDTH } from '../../helpers/Constants'


const CountDownContainer = ({ screenProps, strings }) => {
  if (screenProps.endDate - new Date() < 0) {
    return (
      <View style={styles.countDownContainer}>
        <Text style={styles.countDown}>{strings.finishedText}</Text>
      </View>
    );
  }
  return (
    <View style={styles.countDownContainer}>
      <Text style={styles.countDown}>{`${strings.timeLeft}: `}</Text>
      <CountDown endDate={screenProps.endDate} />
    </View>
  );
};

class GameScreen extends Component {
  getStrings() {
    const { language } = this.props;
    const fields = Object.keys(GAME_SCREEN_STRINGS);
    const strings = {};
    fields.forEach(
      field => (strings[field] = GAME_SCREEN_STRINGS[field][language])
    );
    return strings;
  }

  constructor(props) {
    super(props);
    this.state = {
      treasureInfo: {
        players: -1,
        winnersLeft: -1
      },
      myLocation: {
        longitude: 0,
        latitude: 0
      },
      dstLocation: {
        longitude: 13.210288,
        latitude: 55.716491
      },
      myBearing: 0
    };
    this.updateLocation = this.updateLocation.bind(this)

    this.infoIntervalId = -1
  }

  updateLocation = location => {
    this.setState({ myLocation: location.coords })
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
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }

    this.infoIntervalId = setInterval(() => {
      const headers = {
        Authorization: `Bearer ${this.props.user.token}`,
        'content-type': 'application/json'
      }
      axios
        .get('https://api.10av10.com/api/treasurehunt/info', { headers })
        .then(res => this.setState({ treasureInfo: res.data }))
        .catch(err => console.error(err))
    }, 1000)
  }

  componentDidMount() {
    //  https://api.10av10.com/api/treasurehunt/start
    const headers = {
      Authorization: `Bearer ${this.props.user.token}`,
      'content-type': 'application/json'
    }
    axios
      .post('https://api.10av10.com/api/treasurehunt/start', {}, { headers })
      .then(res => this.setState({ treasureInfo: res.data }))
      .catch(err => console.error(err))
  }

  componentWillUnmount() {
    clearInterval(this.infoIntervalId)
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
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
      this.updateLocation
    );
  };

  render() {
    const strings = this.getStrings();
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
      <View style={styles.textContainer}>
        <BackgroundImage pictureNumber={5} />
        <View style={styles.opacity}>
          <CountDownContainer
          screenProps={this.props.screenProps}
          strings={strings}
        />

          <Text style={styles.bodyText}>{strings.instructions}</Text>
          <MaterialIcons style={{marginLeft: WIDTH/2 - 75}} size={150} name="screen-rotation" color="black" />
          <Distance distance={dstDistance} navigation={this.props.navigation} strings={strings} />
          <Text style={styles.bodyText}>Players: {this.state.treasureInfo.players}</Text>
          <Text style={styles.bodyText}>Prices left: {this.state.treasureInfo.winnersLeft}</Text>
        </View>
      </View>
    );
  }
}

const Distance = props => {
  if (props.distance > 3000) {
    return <Text style={styles.bodyText}>{props.strings.far}</Text>;
  }
  if (props.distance > 1000) {
    return <Text style={styles.bodyText}>{props.strings.medium}</Text>;
  }
  if (props.distance > 250) {
    return <Text style={styles.bodyText}>{props.strings.close}</Text>;
  }
  return (
    <View>
      <Text style={styles.bodyText}> {props.strings.veryClose}</Text>
      <Text
        style={styles.headerText}
        onPress={() => props.navigation.navigate("CloseGameScreen")}
      >
        {props.strings.getQR}
      </Text>
    </View>
  );
};

Distance.protoTypes = {
  distance: PropTypes.number.isRequired
};

const styles = {
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 40,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Avenir Next Medium",
    backgroundColor: "transparent"
  },
  bodyText: {
    fontSize: 22,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Avenir Next Medium",
    backgroundColor: "transparent"
  },
  opacity: {
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    margin: 10,
  },
  countDown: {
    fontSize: 22,
    color: "white"
  },
  countDownContainer: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "center"
  }
};

const mapStateToProps = ({ userInformation, currentLanguage }) => {
  const { language } = currentLanguage;
  return { language, user: userInformation };
};

export default connect(mapStateToProps, null)(GameScreen);
