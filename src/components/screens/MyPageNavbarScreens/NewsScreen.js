import React, { Component } from 'react';
import { View, ListView, Dimensions } from 'react-native';
import Header from '../../common/Header';
import SectionListItem from '../../common/SectionListItem';
import BackgroundImage from '../../common/BackgroundImage';
import { getNews } from '../../../helpers/ApiManager';

const height = Dimensions.get('window').height;

class NewsScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    getNews().then(response => {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.setState({
        dataSource: ds.cloneWithRows(response)
      });
    });
  }

  render() {
    console.log(this.state.dataSource);
    return (
      <View>
        <BackgroundImage imagePath={require('../../../../assets/images/background4.png')} />
        <Header
          textStyle={{ color: '#f4376d' }}
          style={{ backgroundColor: 'white' }}
          title="Nyheter"
          leftIcon={null}
          navigation={this.props.navigation}
        />
        <ListView
          style={{ height: height - 64 }}
          dataSource={this.state.dataSource}
          contentContainerStyle={{ alignItems: 'center' }}
          renderRow={rowData => (
            <SectionListItem
              sectionTitle={rowData.title.rendered}
              sectionDate={rowData.date}
              onPress={() =>
                this.props.screenProps.navigate('SingleNewsScreen', {
                  info: { title: rowData.title.rendered, url: rowData.content.rendered }
                })
              }
            />
          )}
        />
      </View>
    );
  }
}

export default NewsScreen;
