import React, { Component } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import CustomButton from '../common/CustomButton';
import Header from '../common/Header';
import ExpandeblePanel from '../common/ExpandeblePanel';
import BackgroundImage from '../common/BackgroundImage';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class RegistrationInfoScreen extends Component {
  render() {
    const {
      titelTextStyle,
      containerStyle,
      imageStyle1,
      imageStyle2,
      imageStyle3,
      textStyle
    } = styles;
    const image1 = (
      <MaterialCommunityIcons name="numeric-1-box-outline" style={imageStyle1} size={90} />
    );
    const image2 = (
      <MaterialCommunityIcons name="numeric-2-box-outline" style={imageStyle2} size={90} />
    );
    const image3 = (
      <MaterialCommunityIcons name="numeric-3-box-outline" style={imageStyle3} size={90} />
    );

    return (
      <View>
        <BackgroundImage pictureNumber={4} />
        <Header
          textStyle={{ color: '#f4376d' }}
          style={{ backgroundColor: 'white' }}
          title="Om registreringen"
          navigation={this.props.navigation}
        />
        <ScrollView style={{ height: HEIGHT - 64 }}>
          <View style={containerStyle}>
            <Text style={titelTextStyle}>3 enkla steg för att bli</Text>
            <Text style={titelTextStyle}>Karnevalist</Text>
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
                this.props.navigation.goBack(null);
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  imageStyle1: {
    color: '#f4376d',
    backgroundColor: 'transparent'
  },
  imageStyle2: {
    color: '#f4376d',
    backgroundColor: 'transparent'
  },
  imageStyle3: {
    color: '#f4376d',
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

export default RegistrationInfoScreen;
