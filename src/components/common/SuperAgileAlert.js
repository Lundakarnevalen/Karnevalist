import React, { Component } from 'react';
import { BlurView } from 'expo';
import {
  View,
  Text,
  Modal,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';

class SuperAgileAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonWidth: 0,
      emailAddress: ''
    };
  }

  componentDidMount() {
    this.setState({
      buttonWidth: Dimensions.get('window').width / this.props.buttonsIn.length
    });
  }

  getColor() {
    return '#F7A021';
  }

  getBorderLeftRadius(index) {
    if (index === 0) {
      return 5;
    }
  }

  getBorderRightRadius(index) {
    if (index === 1) {
      return 5;
    }
  }
  getRightMargin(index) {
    if (index === 0) {
      return 1;
    }
    return 0;
  }

  createButtons() {
    const { buttonsIn } = this.props;
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
              borderBottomLeftRadius: this.getBorderLeftRadius(i),
              borderBottomRightRadius: this.getBorderRightRadius(i),
              marginRight: this.getRightMargin(i),
              backgroundColor: this.getColor()
            }
          ]}
        >
          <Text style={buttonTextStyle}>{buttonsIn[i].text}</Text>
        </TouchableOpacity>
      );
    }
    return toReturn;
  }
  renderInfo(info, infoTextStyle) {
    if (info)
      return (<View style={{ height: 15, top: 10, width: Dimensions.get('window').width / 1.2 }}>
          <Text style={[infoTextStyle, { color: this.getColor() }]}>{info}</Text>
        </View>)
    return <View />
  }
  render() {
    const {
      outerViewStyle,
      innerViewStyle,
      headerTextStyle,
      infoTextStyle,
      buttonViewStyle,
      alertBoxStyle
    } = styles;
    const { alertVisible, header, info, setAlertVisible, children, boxStyle } = this.props;
    return (
      <Modal transparent visible={alertVisible} onRequestClose={() => setAlertVisible(false)}>
        <BlurView tint="dark" intensity={70} style={StyleSheet.absoluteFill}>
          <View style={outerViewStyle} transparent={false}>
            <View style={[alertBoxStyle, boxStyle, { borderColor: this.getColor() }]}>
              <View style={innerViewStyle}>
                <Text style={[headerTextStyle, { color: this.getColor() }]}>{header}</Text>
                {this.renderInfo(info, infoTextStyle)}
                <View
                  style={{
                    position: 'absolute',
                    bottom: Platform.OS === 'ios' ? 68 : 73,
                    width: Dimensions.get('window').width / 1.2
                  }}
                >
                  {children}
                </View>
                <View style={buttonViewStyle}>{this.createButtons()}</View>
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
  alertBoxStyle: {
    alignItems: 'center',
    flexDirection: 'column',
    width: Dimensions.get('window').width / 1.1,
    height: 220,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: 'white'
  },
  innerViewStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    marginTop: 17,
    marginBottom: 0
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderColor: 'white',
    width: Dimensions.get('window').width / (1.1 * 2)
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Avenir Next Medium'
  },
  headerTextStyle: {
    textAlign: 'center',
    fontFamily: 'Avenir Next Bold'
  },
  infoTextStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Avenir Next Medium'
  },
  buttonViewStyle: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 50
  }
};

const mapStateToProps = ({ currentTheme }) => {
  const { theme } = currentTheme;
  return { theme };
};

export default connect(mapStateToProps, null)(SuperAgileAlert);
