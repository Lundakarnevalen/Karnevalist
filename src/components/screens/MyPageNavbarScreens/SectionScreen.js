import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions, FlatList, Platform } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../../common/Header';
import SectionListItem from '../../common/SectionListItem';
import BackgroundImage from '../../common/BackgroundImage';

const WIDTH = Dimensions.get('window').width;

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

  getColor() {
   switch (this.props.theme) {
     case 'morning':
       return '#F7A021';
     case 'day':
       return '#f4376d';
     default:
       return 'white';
   }
 }

  render() {
    const { navigation, screenProps } = this.props;
    return (
      <View>
        <BackgroundImage pictureNumber={1} />
        <View>
          <Header
            rightIcon={
              <TouchableOpacity onPress={() => screenProps.navigate('ConfirmPage')}>
                <FontAwesome name="list-alt" size={30} color={this.getColor()} />
              </TouchableOpacity>
            }
            title="Sections"
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


const styles = {
  style: {
    paddingBottom: Platform.OS === 'ios' ? 132 : 148
  }
};

const mapStateToProps = ({ currentTheme, sections }) => {
  const { theme } = currentTheme;
  return { theme, sections: sections.sections };
};

export default connect(mapStateToProps, null)(SectionScreen);
