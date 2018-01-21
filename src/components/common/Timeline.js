import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import TimelineItem from './TimelineItem';
import { HOME_SCREEN_STRINGS } from '../../helpers/LanguageStrings';
import { dynamicSort } from '../../helpers/functions';
import { getFavoriteSections } from '../../helpers/LocalSave';

const WIDTH = Dimensions.get('window').width;

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overFiveSections: false
    };
  }

  componentWillMount() {
    getFavoriteSections(sections => {
      if (sections.length < 5) {
       this.setState({ overFiveSections: false })
     } else
      this.setState({ overFiveSections: true })
    });
  }
  getStrings() {
    const { language } = this.props;
    const { fields } = HOME_SCREEN_STRINGS;
    const strings = {};
    fields.forEach(field => (strings[field] = HOME_SCREEN_STRINGS[field][language]));
    return strings;
  }

  render() {
    const { navigation, screenProps } = this.props;
    const strings = this.getStrings();
    return (
      <View>
        <TimelineItem
          style={'done'}
          width={WIDTH - 50}
          text={strings.CheckIn}
          onPress={() => navigation.navigate('HomeScreen')}
        />
        <View style={styles.barView1} />
        <TimelineItem
          style={this.props.progress >= 2 ? 'done' : 'notDone'}
          width={WIDTH - 50}
          text={strings.ChooseSections}
          onPress={this.props.progress >= 2 ?
            () => navigation.navigate('HomeScreen')
            : () => navigation.navigate('Sections')}
        />
        <View style={styles.barView4} />
        <TimelineItem
          style={this.props.progress >= 3 ? 'done' : 'notDone'}
          width={WIDTH - 50}
          text={strings.SendIn}
          onPress={this.props.progress >= 3 ?
            () => screenProps.navigation.navigate('HomeScreen')
            : () => screenProps.navigation.navigate('ConfirmPage', {
            navigation,
            setSectionStatus: id => {
              let tmpData = this.state.data;
              const tmpItem = tmpData.filter(section => section.id + '' === id + '')[0];
              tmpData = tmpData.filter(section => section.id + '' !== id + '');
              delete tmpItem.favorite;
              tmpData.push(tmpItem);
              tmpData.sort(dynamicSort('title'));
              this.setState({ data: tmpData });
            }
          })
        }
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 32,
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Avenir Next Medium'
  },
  barView1: {
    width: Dimensions.get('window').width / 9 / 5,
    height: Dimensions.get('window').width / 8,
    backgroundColor: '#F7A021',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -29,
    marginBottom: -40,
    marginLeft: 22
  },
  barView23: {
    width: Dimensions.get('window').width / 9 / 5,
    height: Dimensions.get('window').width / 8,
    backgroundColor: '#F7A021',
    justifyContent: 'center',
    alignItems: 'center',
    margin: -40,
    marginLeft: 22
  },
  barView4: {
    width: Dimensions.get('window').width / 9 / 5,
    height: Dimensions.get('window').width / 8,
    backgroundColor: '#F7A021',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
    marginBottom: -29,
    marginLeft: 22
  },
};

const mapStateToProps = ({ currentLanguage, userInformation }) => {
  const { language } = currentLanguage;
  const { progress } = userInformation;
  return { language, progress };
};
export default connect(mapStateToProps, null)(Timeline);
