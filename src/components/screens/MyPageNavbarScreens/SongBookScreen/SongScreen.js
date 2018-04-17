import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Header } from '~/src/components/common';
import { songScreenStyles } from './styles';

const SongScreen = ({ navigation }) => {
  const { name, melody, text, headerTitle } = navigation.state.params;
  const {
    containerStyle,
    headerStyle,
    subHeaderStyle,
    textStyle
  } = songScreenStyles;
  return (
    <View style={containerStyle}>
      <Header title={headerTitle || name} navigation={navigation} />
      <View>
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
          <Text style={headerStyle}>{name}</Text>
          <Text style={subHeaderStyle}>{melody}</Text>
          <Text style={textStyle}>{text}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

SongScreen.propTypes = {
  navigation: PropTypes.shape().isRequired
};

export default SongScreen;
