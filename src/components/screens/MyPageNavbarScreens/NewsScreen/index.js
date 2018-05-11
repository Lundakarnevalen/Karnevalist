import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, ListItem, BackgroundImage } from 'src/components/common';
import { getNews } from 'src/helpers/ApiManager';
import { NEWS_SCREEN_STRINGS } from 'src/helpers/LanguageStrings';
import { HEIGHT, IS_IOS } from 'src/helpers/Constants';
import { getStrings } from 'src/helpers/functions';

class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    getNews().then(response => this.setState({ data: response }));
  }

  getLanguageStrings() {
    return getStrings(this.props.language, NEWS_SCREEN_STRINGS);
  }

  render() {
    const { data } = this.state;
    const { navigation, screenProps } = this.props;
    const strings = this.getLanguageStrings();
    return (
      <View>
        <BackgroundImage pictureNumber={4} />
        <Header title={strings.title} leftIcon={null} navigation={navigation} />
        <FlatList
          enableEmptySections
          style={{ height: HEIGHT - (IS_IOS ? 113 : 135) }}
          data={data}
          contentContainerStyle={{ alignItems: 'center' }}
          renderItem={({ item }) => (
            <ListItem
              title={item.title.rendered}
              itemDate={item.date}
              onPress={() =>
                screenProps.navigation.navigate('SingleNewsScreen', {
                  info: { title: item.title.rendered, url: item.link }
                })
              }
            />
          )}
        />
      </View>
    );
  }
}

NewsScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  language: PropTypes.string.isRequired,
  screenProps: PropTypes.shape().isRequired
};

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, null)(NewsScreen);
