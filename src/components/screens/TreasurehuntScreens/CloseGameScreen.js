import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';

import { View, Text } from 'react-native';

class CloseGameScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> SHOW THIS TO STURE</Text>
        <QRCode
          value={this.props.email}
          size={200}
          bgColor="black"
          fgColor="white"
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

const mapStateToProps = ({ userInformation }) => {
  const { email } = userInformation;
  return { email };
};

export default connect(mapStateToProps, null)(CloseGameScreen);
