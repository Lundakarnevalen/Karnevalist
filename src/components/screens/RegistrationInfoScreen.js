import React, { Component } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import CustomButton from '../common/CustomButton';
import Header from '../common/Header';
import ExpandeblePanel from '../common/ExpandeblePanel';
import BackgroundImage from '../common/BackgroundImage';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class RegistrationInfoScreen extends Component {
  getColor() {
    return this.props.theme === 'day' ? '#f4376d' : '#F7A021';
  }

  render() {
    const { titelTextStyle, containerStyle, imageStyle, textStyle } = styles;
    const { theme, navigation } = this.props;
    const image1 = (
      <MaterialCommunityIcons
        name="numeric-1-box-outline"
        color={this.getColor()}
        style={imageStyle}
        size={90}
      />
    );
    const image2 = (
      <MaterialCommunityIcons
        name="numeric-2-box-outline"
        color={this.getColor()}
        style={imageStyle}
        size={90}
      />
    );
    const image3 = (
      <MaterialCommunityIcons
        name="numeric-3-box-outline"
        color={this.getColor()}
        style={imageStyle}
        size={90}
      />
    );

    return (
      <View>
        <BackgroundImage pictureNumber={4} />
        <Header title="Om registreringen" navigation={navigation} />
        <ScrollView style={{ height: HEIGHT - 64 }}>
          <View style={containerStyle}>
            <Text style={[titelTextStyle, { color: theme === 'night' ? 'white' : 'black' }]}>
              3 enkla steg för att bli
            </Text>
            <Text style={[titelTextStyle, { color: theme === 'night' ? 'white' : 'black' }]}>
              Karnevalist
            </Text>
            <ScrollView>
              <ExpandeblePanel title="Skapa profil" image={image1}>
                <Text style={textStyle}>
                  Första steget är att skapa en profil, antingen här eller på Karnevalist.se. När du
                  skapat en profil tilldelas du ett profil-ID som du använder vid incheckning under
                  uppropsdagen.
                </Text>
              </ExpandeblePanel>
            </ScrollView>
            <ScrollView>
              <ExpandeblePanel title="Kom på uppropet och välj sektion" image={image2}>
                <Text style={textStyle}>
                  Välj vilken sektion du vill vara delaktig i under karnevalen.{' '}
                </Text>
              </ExpandeblePanel>
            </ScrollView>
            <ScrollView>
              <ExpandeblePanel title="Skicka din ansökan" image={image3}>
                <Text style={textStyle}> Skicka in din ansökan och vänta på svar. </Text>
              </ExpandeblePanel>
            </ScrollView>
            <CustomButton
              style="standardButton"
              text="Jag förstår"
              width={WIDTH - 50}
              onPress={() => {
                navigation.goBack(null);
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  imageStyle: {
    backgroundColor: 'transparent'
  },
  containerStyle: {
    alignItems: 'center',
    paddingTop: 15
  },
  titelTextStyle: {
    fontSize: 25,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: 'Avenir Next Bold'
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Medium'
  }
};

const mapStateToProps = ({ currentTheme }) => {
  const { theme } = currentTheme;
  return { theme };
};

export default connect(mapStateToProps, null)(RegistrationInfoScreen);
