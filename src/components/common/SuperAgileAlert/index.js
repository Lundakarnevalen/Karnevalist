import React from 'react';
import { BlurView } from 'expo';
import PropTypes from 'prop-types';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const getBorderLeftRadius = index => (index === 0 ? 5 : null);
const getBorderRightRadius = index => (index === 1 ? 5 : null);

const createButtons = buttonsIn => {
  const { buttonStyle, buttonTextStyle } = styles;
  const toReturn = [];
  for (let i = 0; i < buttonsIn.length; i++) {
    toReturn.push(
      <TouchableOpacity
        key={i}
        onPress={() => buttonsIn[i].onPress()}
        style={[
          buttonStyle,
          {
            borderBottomLeftRadius:
              buttonsIn.length === 1 ? 5 : getBorderLeftRadius(i),
            borderBottomRightRadius:
              buttonsIn.length === 1 ? 5 : getBorderRightRadius(i),
            backgroundColor: '#F7A021',
            borderLeftWidth: i > 0 ? 1 : 0
          }
        ]}
      >
        <Text style={buttonTextStyle}>{buttonsIn[i].text}</Text>
      </TouchableOpacity>
    );
  }
  return toReturn;
};

const getRightMargin = index => (index === 1 ? 1 : 0);

const SuperAgileAlert = ({
  alertVisible,
  header,
  info,
  setAlertVisible,
  children,
  buttonsIn
}) => (
  <Modal
    transparent
    visible={alertVisible}
    onRequestClose={() => setAlertVisible(false)}
  >
    <BlurView tint="dark" intensity={70} style={styles.outerViewStyle}>
      <View style={styles.containerStyle}>
        <View style={styles.alertBoxStyle}>
          <Text style={styles.headerTextStyle}>{header}</Text>
          <Text style={styles.infoTextStyle}>{info}</Text>
          {children}
        </View>
        <View style={styles.buttonContainerStyle}>
          {createButtons(buttonsIn)}
        </View>
      </View>
    </BlurView>
  </Modal>
);

SuperAgileAlert.defaultProps = {
  header: '',
  info: '',
  children: null
};

SuperAgileAlert.propTypes = {
  alertVisible: PropTypes.bool.isRequired,
  header: PropTypes.string,
  info: PropTypes.string,
  setAlertVisible: PropTypes.func.isRequired,
  children: PropTypes.shape(),
  buttonsIn: PropTypes.arrayOf(
    PropTypes.shape({ text: PropTypes.string, onPress: PropTypes.func })
  ).isRequired
};

export { SuperAgileAlert };
