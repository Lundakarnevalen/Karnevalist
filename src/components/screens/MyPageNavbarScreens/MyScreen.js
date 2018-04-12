 import React, { Component } from 'react';
import { View, FlatList, Dimensions, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Header, BackgroundImage, SectionListItem } from '../../common';
import { MaterialIcons } from '@expo/vector-icons';

const HEIGHT = Dimensions.get('window').height;
const SIZE = Dimensions.get('window').width / 11;

class MyScreen extends Component {
  constructor(props) {
    super(props);
    const data = [];

    const buttonArray = ['Mina jodels', 'Mina svar', 'Mina votes', 'Mina fastnålade']

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

  render() {
    const { navigation, screenProps } = this.props;
    return (
      <View>
        <BackgroundImage pictureNumber={3} />
        <View>
          <Header
          rightIcon={<View style={{ marginRight: 15 }}>
          <MaterialIcons name="settings" size={SIZE} color={'#ffffff'} />
          </View>}
          title={'Jag'}
          navigation={navigation}
          />
        </View>
        <FlatList
          style={{ height: HEIGHT - (Platform.OS === 'ios' ? 113 : 135) }}
          data={this.state.data}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 60 }}
          renderItem={({ item }) => (
            <SectionListItem
              sectionTitle={item.name}
              onPress={() => {}}
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
