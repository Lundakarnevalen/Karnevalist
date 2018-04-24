import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Constants, Location, Permissions } from 'expo'
import { View, Text, Platform } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import * as Vibration from 'react-native/Libraries/Vibration/Vibration'
import PropTypes from 'prop-types'
import { getStrings } from '../assets/languageStrings/TREASURE_HUNT_STRINGS'
import { BackgroundImage } from '../StolenComponents/BackgroundImage'
import { styles } from './GameStyles'
import { treasureLatitidue, treasureLongitude, WIDTH } from '../assets/Constants'
import { endDate } from '../assets/Constants'
import {CountDownContainer} from '../StolenComponents/CountDown/CountdownContainer'

class GameScreen extends Component {
  constructor (props) {
    super(props)
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
        longitude: treasureLongitude,
        latitude: treasureLatitidue
      },
      myBearing: 0
    }
    this.updateLocation = this.updateLocation.bind(this)

    this.infoIntervalId = -1
  }

  updateLocation = location => {
    this.setState({myLocation: location.coords})
  }

  toRadians (deg) {
    return deg * (Math.PI / 180)
  }

  toDegrees (rad) {
    return rad * (180 / Math.PI)
  }

  distance (lat1, lng1, lat2, lng2) {
    const earthRadius = 6371000
    const distLat = this.toRadians(lat2 - lat1)
    const distLng = this.toRadians(lng2 - lng1)

    const tmp1 = Math.sin(distLat / 2) * Math.sin(distLat / 2)
    const tmp2 =
      Math.cos(this.toRadians(lat1)) *
      Math.cos(this.toRadians(lat2)) *
      Math.sin(distLng / 2) *
      Math.sin(distLng / 2)

    const a = tmp1 + tmp2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return earthRadius * c
  }

  bearing (myLng, myLat, dstLng, dstLat) {
    const myLatRad = this.toRadians(myLat)
    const dstLatRad = this.toRadians(dstLat)

    const lngDiff = this.toRadians(dstLng - myLng)

    const y = Math.sin(lngDiff) * Math.cos(dstLatRad)
    const tmp1 = Math.cos(myLatRad) * Math.sin(dstLatRad)
    const tmp2 = Math.sin(myLatRad) * Math.cos(dstLatRad) * Math.cos(lngDiff)
    const x = tmp1 - tmp2

    return (this.toDegrees(Math.atan2(y, x)) + 360) % 360
  }

  componentWillMount () {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      })
    } else {
      this._getLocationAsync()
    }

    //Authorization: `Bearer ${this.props.user.token}`,
    this.infoIntervalId = setInterval(() => {
      const headers = {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9za2FyLmRhbWtqYWVyQGdtYWlsLmNvbSIsImlhdCI6MTUyNDUwNDE4Nn0.q55W6dNa01qgtw7EZlOi_VMBsMIZzeqBwo8PvHsMzvM`,
        'content-type': 'application/json'
      }
      axios
        .get('https://api.10av10.com/api/treasurehunt/info', {headers})
        .then(res => this.setState({treasureInfo: res.data}))
        .catch(err => console.error(err))
    }, 1000)
  }

  componentDidMount () {
    const headers = {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9za2FyLmRhbWtqYWVyQGdtYWlsLmNvbSIsImlhdCI6MTUyNDUwNDE4Nn0.q55W6dNa01qgtw7EZlOi_VMBsMIZzeqBwo8PvHsMzvM`,
      'content-type': 'application/json'
    }
    axios
      .post('https://api.10av10.com/api/treasurehunt/start', {}, {headers})
      .then(res => this.setState({treasureInfo: res.data}))
      .catch(err => console.error(err))
  }

  componentWillUnmount () {
    clearInterval(this.infoIntervalId)
  }

  _getLocationAsync = async () => {
    const {status} = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      })
    }

    Location.watchHeadingAsync(heading => {
      this.setState({myBearing: heading.trueHeading})
    })

    Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 200,
        distanceInterval: 1
      },
      this.updateLocation
    )
  }

  render () {
    const strings = getStrings(this.props.language)
    const {myLocation, dstLocation, myBearing} = this.state

    const dstBearing = this.bearing(
      myLocation.longitude,
      myLocation.latitude,
      dstLocation.longitude,
      dstLocation.latitude
    )

    const dstDistance = this.distance(
      myLocation.latitude,
      myLocation.longitude,
      dstLocation.latitude,
      dstLocation.longitude
    )

    if (Math.abs(dstBearing - myBearing) < 30) {
      Vibration.vibrate(500)
    }

    return (
      <View style={styles.textContainer}>
        <BackgroundImage pictureNumber={5}/>
        <View style={styles.opacity}>
          <CountDownContainer
            strings={strings}
            endDate={endDate}
          />

          <Text style={styles.bodyText}>{strings.instructions}</Text>
          <MaterialIcons style={{marginLeft: WIDTH / 2 - 75}} size={150} name="screen-rotation" color="black"/>
          <Distance distance={dstDistance} navigation={this.props.navigation} strings={strings}/>
          <Text style={styles.bodyText}>Players: {this.state.treasureInfo.players}</Text>
          <Text style={styles.bodyText}>Prices left: {this.state.treasureInfo.winnersLeft}</Text>
        </View>
      </View>
    )
  }
}

const Distance = props => {
  if (props.distance > 3000) {
    return <Text style={styles.bodyText}>{props.strings.far}</Text>
  }
  if (props.distance > 1000) {
    return <Text style={styles.bodyText}>{props.strings.medium}</Text>
  }
  if (props.distance > 250) {
    return <Text style={styles.bodyText}>{props.strings.close}</Text>
  }
  return (
    <View>
      <Text style={styles.bodyText}> {props.strings.veryClose}</Text>
      <Text
        style={styles.headerText}
        onPress={() => props.navigation.navigate('CloseGameScreen')}
      >
        {props.strings.getQR}
      </Text>
    </View>
  )
}

Distance.protoTypes = {
  distance: PropTypes.number.isRequired
}

const mapStateToProps = ({userInformation, currentLanguage}) => {
  const {language} = currentLanguage
  return {language, user: userInformation}
}

export default connect(mapStateToProps, null)(GameScreen)