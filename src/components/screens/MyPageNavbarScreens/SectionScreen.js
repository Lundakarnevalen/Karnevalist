import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions, FlatList, Platform } from 'react-native';
import axios from 'axios';
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
      images: {}
    };
  }

  componentWillMount() {
    this.getSectionInfo();
  }

  getImage(url, section) {
    axios
      .get(url)
      .then(r => {
        const data = this.state.data;
        const image = (
          <Image
            style={{ width: WIDTH - 10, height: WIDTH - 50 }}
            source={{ uri: r.data.source_url }}
            //defaultSource={require('../../../../res/LK2018logga.png')}
          />
        );
        section.image = image;
        data.push(section);
        this.setState({ data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getSectionInfo() {
    const url = 'http://lundakarnevalen.se/wp-json/wp/v2/lksektion/';
    axios
      .get(url)
      .then(response => {
        response.data.forEach(item => {
          const strippedContent = item.content.rendered.replace(/(<([^>]+)>)/gi, '');
          const imgId = item.featured_media;
          const imgUrl = 'http://lundakarnevalen.se/wp-json/wp/v2/media/' + imgId;
          const section = {
            key: item.id,
            id: item.id,
            title: item.title.rendered,
            info: strippedContent
          };
          this.getImage(imgUrl, section);
        });
      })
      .catch(error => {
        console.error(error);
      });
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
                <FontAwesome name="list-alt" size={30} color={'#f4376d'} />
              </TouchableOpacity>
            }
            textStyle={{ color: '#f4376d' }}
            style={{ backgroundColor: 'white' }}
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

export default SectionScreen;
