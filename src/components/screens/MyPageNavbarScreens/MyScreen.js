 import React, { Component } from 'react';
import { View, FlatList, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Header, BackgroundImage, SectionListItem } from '../../common';
import { SONGBOOK_SCREEN_STRINGS } from '../../../helpers/LanguageStrings';
import { dynamicSort } from '../../../helpers/functions';
import songs2014 from '../../../../assets/songbook/songs2014.json';
import { StyleSheet, Text } from 'react-native';
import { AppRegistry, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
//import HeaderButtons from 'react-navigation-header-buttons'
//import Icon from 'react-native-vector-icons/Ionicons';

const HEIGHT = Dimensions.get('window').height;
const SIZE = Dimensions.get('window').width / 11;

class MyScreen extends Component {
  constructor(props) {
    super(props);
    const data = [];

    var buttonArray = ["Mina jodels", "Mina svar", "Mina votes", "Mina fastnålade"]

    buttonArray.forEach((song, i) => {
      const item = {};
      item.key = i;
      item.name = buttonArray[i];
      data.push(item);
    });

    this.state = {
      data
    };
  }

  /**getStrings() {
    const { language } = this.props;
    const { fields } = SONGBOOK_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = SONGBOOK_SCREEN_STRINGS[field][language]));
    return strings;
  }**/

  render() {
    const { navigation, screenProps } = this.props;
    //const strings = this.getStrings();
    return (
      <View>
        <BackgroundImage pictureNumber={3} />
        <View>
          <Header rightIcon={<View style={{ marginRight: 15 }}>
          <MaterialIcons name="settings" size={SIZE} color={'#A9A9A9'}/>
          </View>}
          leftIcon={<MaterialIcons name="arrow-back" size={SIZE} color={'#A9A9A9'}/>}
          title={"Jag"} navigation={navigation} />
          <View>
          </View>
        </View>
        <FlatList
          style={{ height: HEIGHT - (Platform.OS === 'ios' ? 113 : 135) }}
          data={this.state.data}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 60 }}
          renderItem={({ item }) => (
            <SectionListItem
              sectionTitle={item.name}
              onPress={() =>
                screenProps.navigation.navigate('MyScreen', {
                })
              }
            />
          )}
        />
      </View>
    );
  }
}


const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, null)(MyScreen);
