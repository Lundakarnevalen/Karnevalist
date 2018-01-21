import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class HomeScreenTimeline extends Component {
  getIconColor(nbr) {
    if (nbr < this.props.timelineProgress) {
      return 'black';
    }
    return 'transparent';
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            // backgroundColor: 'transparent',
            backgroundColor: '#F7A021',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 20,
          }}
        >
          <View style={[styles.roundView, { marginBottom: -5 }]}>
            <Ionicons
              name="md-checkmark"
              size={Dimensions.get('window').width / 7}
              color={this.getIconColor(0)}
              style={{ backgroundColor: 'transparent' }}
            />
          </View>
          <View style={styles.barView} />
          <View style={[styles.roundView, { marginBottom: -5, marginTop: -5 }]}>
            <Ionicons
              name="md-checkmark"
              size={Dimensions.get('window').width / 7}
              color={this.getIconColor(1)}
              style={{ backgroundColor: 'transparent' }}
            />
          </View>
          <View style={styles.barView} />
          <View style={[styles.roundView, { marginBottom: -5, marginTop: -5 }]}>
            <Ionicons
              name="md-checkmark"
              size={Dimensions.get('window').width / 7}
              color={this.getIconColor(2)}
              style={{ backgroundColor: 'transparent' }}
            />
          </View>
          <View style={styles.barView} />
          <View style={[styles.roundView, { marginTop: -5 }]}>
            <Ionicons
              name="md-checkmark"
              size={Dimensions.get('window').width / 7}
              color={this.getIconColor(3)}
              style={{ backgroundColor: 'transparent' }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={styles.textView}>
            <Text style={styles.textStyle}>Create a profile</Text>
          </View>
          <View style={styles.bufferView} />
          <View style={styles.textView}>
            <Text style={styles.textStyle}>Attend the registration</Text>
          </View>
          <View style={styles.bufferView} />
          <View style={styles.textView}>
            <Text style={styles.textStyle}>Choose your sections</Text>
          </View>
          <View style={styles.bufferView} />
          <View style={styles.textView}>
            <Text style={styles.textStyle}>Send your application</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  roundView: {
    backgroundColor: '#F7A021',
    height: Dimensions.get('window').width / 7,
    width: Dimensions.get('window').width / 7,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barView: {
    width: Dimensions.get('window').width / 9 / 4,
    height: Dimensions.get('window').width / 8,
    backgroundColor: '#F7A021'
  },
  bufferView: {
    height: Dimensions.get('window').width / 9 / 4,
    width: Dimensions.get('window').width / 8,
    backgroundColor: 'transparent',
    margin: -10
  },
  textView: {
    backgroundColor: 'white',
    justifyContent: 'left',
    alignItems: 'left',
    margin: Dimensions.get('window').width / 7 - 10,
    width: Dimensions.get('window').width / 2
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 11
  }
};

export { HomeScreenTimeline };
