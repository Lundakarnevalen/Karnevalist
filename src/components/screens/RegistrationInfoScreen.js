import React, { Component } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import CustomButton from '../common/CustomButton';
import Header from '../common/Header';
import ExpandeblePanel from '../common/ExpandeblePanel';
import BackgroundImage from '../common/BackgroundImage';

const HEIGHT = Dimensions.get('window').height;

class RegistrationInfoScreen extends Component {
  render() {
    const {
      titelTextStyle,
      containerStyle,
      imageStyle1,
      imageStyle2,
      imageStyle3,
      textStyle1,
      textStyle2,
      textStyle3
    } = styles;
    const image1 = (
      <MaterialCommunityIcons name="numeric-1-box-outline" style={imageStyle1} size={140} />
    );
    const image2 = (
      <MaterialCommunityIcons name="numeric-2-box-outline" style={imageStyle2} size={140} />
    );
    const image3 = (
      <MaterialCommunityIcons name="numeric-3-box-outline" style={imageStyle3} size={140} />
    );

    return (
      <View>
        <BackgroundImage imagePath={require('../../../assets/images/background4.png')} />
        <Header
          textStyle={{ color: '#f4376d' }}
          style={{ backgroundColor: 'white' }}
          title="Om registreringen"
          navigation={this.props.navigation}
        />
        <ScrollView>
          <View style={containerStyle}>
            <Text style={titelTextStyle}>3 enkla steg för att bli</Text>
            <Text style={titelTextStyle}>Karnevalist</Text>

            <ScrollView>
              <ExpandeblePanel title="Skapa profil" image={image1} style={textStyle1}>
                <Text>
                  Första steget är att skapa en profil, antingen här eller på Karnevalist.se. När du
                  skapat en profil tilldelas du ett profil-ID som du använder vid incheckning under
                  uppropsdagen.
                </Text>
              </ExpandeblePanel>
            </ScrollView>

            <ScrollView>
              <ExpandeblePanel
                title="Kom på uppropet och välj sektion"
                image={image2}
                style={textStyle2}
              >
                <Text>Välj vilken sektion du vill vara delaktig i under karnevalen. </Text>
              </ExpandeblePanel>
            </ScrollView>

            <ScrollView>
              <ExpandeblePanel title="Skicka din ansökan" image={image3} style={textStyle3}>
                <Text> Skicka in din ansökan och vänta på svar. </Text>
              </ExpandeblePanel>
            </ScrollView>

            <CustomButton
              style="standardButton"
              text="Jag förstår"
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
    marginRight: 0,
    color: 'brown',
    flex: 4,
    backgroundColor: 'transparent'
  },
  imageStyle2: {
    marginRight: 0,
    color: 'grey',
    flex: 4,
    backgroundColor: 'transparent'
  },
  imageStyle3: {
    marginRight: 0,
    color: 'orange',
    flex: 4,
    backgroundColor: 'transparent'
  },
  textStyle1: {
    color: 'brown',
    fontSize: 20,
    textAlign: 'center',
    flex: 3
  },
  textStyle2: {
    color: 'grey',
    fontSize: 20,
    textAlign: 'center',
    flex: 3
  },
  textStyle3: {
    color: 'orange',
    fontSize: 20,
    textAlign: 'center',
    flex: 3
  },
  containerStyle: {
    alignItems: 'center',
    marginTop: 15
  },
  titelTextStyle: {
    fontSize: 25,
    backgroundColor: 'transparent'
  }
};

export default RegistrationInfoScreen;
