import React, { Component } from 'react';
import { BlurView } from 'expo';
import { View, Text, Modal, Dimensions, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';

class SuperAgileAlert extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalNbrOfButtons: this.props.buttonsIn.length
    }
  }

  onPressYes() {

  }
  onPressNo() {

  }
  onPressClose() {

  }
  createButtons() {
    const { buttonsIn } = this.props;
    let i = 0
    const buttonsToReturn = [];
    for (i; i < buttonsIn.length; i++) {
      const item = this.createSingleButton(i, buttonsIn.length)
      buttonsToReturn.push(item)
    }
    return buttonsToReturn;
  }
  createSingleButton(i) {
    const { buttonsIn } = this.props;
    const buttonWidth = { width: ((Dimensions.get('window').width / (this.state.totalNbrOfButtons * 1.1)) - ((0.4 * (buttonsIn.length - 1)) / buttonsIn.length)) };
    if (buttonsIn.length === 1) {
      return (
        <CustomButton
        onPress={buttonsIn[i].onPress}
        text={buttonsIn[i].text}
        buttonStyle={[styles.buttonStyle, buttonWidth,
          { borderBottomLeftRadius: 5,
           borderBottomRightRadius: 5 }]}
        textStyle={styles.buttonTextStyle}
        />
      )
    }
    if (i === 0) {
      return (
        <CustomButton
        onPress={buttonsIn[i].onPress}
        text={buttonsIn[i].text}
        buttonStyle={[styles.buttonStyle, buttonWidth,
           { borderBottomLeftRadius: 5 }]}
        textStyle={styles.buttonTextStyle}
        />
      )
    } if (i === buttonsIn.length - 1) {
      return (
        <CustomButton
        onPress={buttonsIn[i].onPress}
        text={buttonsIn[i].text}
        buttonStyle={[styles.buttonStyle, buttonWidth,
           { borderBottomRightRadius: 5 }]}
        textStyle={styles.buttonTextStyle}
        />
      )
    }
    return (
      <CustomButton
      onPress={buttonsIn[i].onPress}
      text={buttonsIn[i].text}
      buttonStyle={[styles.buttonStyle, buttonWidth]}
      textStyle={styles.buttonTextStyle}
      />
    )
  }
  render() {
    return (
      <Modal
      transparent
      visible={this.props.alertVisible}
      >
      <BlurView tint='dark' intensity={70} style={StyleSheet.absoluteFill}>
      <View
      style={styles.outerViewStyle}
      transparent={false}
      >
      <View
      style={{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width / 1.1,
        height: Dimensions.get('window').height / 3.5,
        borderRadius: 5,
        backgroundColor: '#ffbbcc' }}
      >
      <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      }}
      >
      <View
      style={{
        justifyContent: 'flex-top',
        margin: 10,
        flex: 1
      }}
      >
        <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold'
        }}
        >
        {this.props.header}</Text>
        </View>
        <View style={{ flex: 5 }}>
        <Text
        style={{
            textAlign: 'center',
            margin: 7
        }}
        >
        {this.props.info}</Text>
        </View>
      </View>
        <View
        style={{
          flexDirection: 'row',

        }}
        >
        {this.createButtons()}
        </View>
        </View>
        </View>
        </BlurView>
        </Modal>
      );
    }
  }

  const styles = {
    outerViewStyle: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonStyle: {
        height: Dimensions.get('window').height / (4 * 4),
        backgroundColor: '#f4376d',
        borderRadius: 0,
        margin: 0,
        marginLeft: 0.4,
        marginRight: 0.4,
    },
    buttonTextStyle: {
      color: 'white',
      fontSize: 16,
    }
  }

  export default SuperAgileAlert;
