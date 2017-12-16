import React, { Component } from 'react';
import { View, TouchableOpacity, Alert, Image, Dimensions, FlatList, Platform } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
import Header from '../../common/Header';
import SectionListItem from '../../common/SectionListItem';
import BackgroundImage from '../../common/BackgroundImage';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class SectionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      data: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.sections })
  }

  render() {
    const { navigation, screenProps } = this.props;
    return (
      <View>
        <BackgroundImage imagePath={require('../../../../res/background1.png')} />
        <View>
          <Header
            rightIcon={
              <TouchableOpacity onPress={() => screenProps.navigate('ConfirmPage')}>
                <FontAwesome name="list-alt" size={30} color={'#f4376d'} />
              </TouchableOpacity>
            }
            textStyle={{ color: '#f4376d' }}
            style={{ backgroundColor: '#FFFFFF' }}
            title="Sektioner"
            leftIcon={null}
            navigation={navigation}
          />
        </View>
        <View style={styles.style}>
          <FlatList
            data={this.state.data}
            contentContainerStyle={{ alignItems: 'center' }}
            renderItem={({ item }) => (
              <SectionListItem
                sectionTitle={item.title}
                sectionInfoText={item.info}
                onPress={() =>
                  screenProps.navigate('SectionItemScreen', {
                    id: item.id,
                    title: item.title,
                    description: item.info,
                    image: item.image
                  })
                }
              />
            )}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({ sections }) => {
  return { sections: sections.sections }
}

const styles = {
  style: {
    paddingBottom: Platform.OS === 'ios' ? 132 : 148
  }
};
export default connect(mapStateToProps, {})(SectionScreen);
