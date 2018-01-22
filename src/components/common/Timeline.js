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
        this.setState({ overFiveSections: false });
      } else this.setState({ overFiveSections: true });
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
    /*Problemet är nu om man kan välja sektioner innna man checkat in.
    Om om man kan det så behöver vi kunna se till att den man är på inte
    flyttas till Skicka in förrän efter att man både har valt 5 och checkat in*/
    return (
      <View>
        <TimelineItem
          style={'done'}
          width={WIDTH - 50}
          text={strings.Register}
          onPress={() => navigation.navigate('HomeScreen')}
        />
        <View style={styles.barView1} />
        <TimelineItem
          style={this.props.progress >= 1 ? 'done' : 'notDone'} //Ändra så progress ändras när man checkat in
          width={WIDTH - 50}
          focus={this.props.progress === 0}
          text={strings.CheckIn}
          onPress={
            this.props.progress >= 1
              ? () => navigation.navigate('HomeScreen')
              : () => navigation.navigate('HomeScreen')
          } //Ändra till var man kan checka in.
        />
        <View style={styles.barView23} />
        <TimelineItem
          style={this.props.progress >= 2 ? 'done' : 'notDone'}
          width={WIDTH - 50}
          focus={this.props.progress === 1}
          text={strings.ChooseSections}
          onPress={
            this.props.progress >= 2
              ? () => navigation.navigate('HomeScreen')
              : () => navigation.navigate('Sections')
          }
        />
        <View style={styles.barView4} />
        <TimelineItem
          style={this.props.progress >= 3 ? 'done' : 'notDone'}
          focus={this.props.progress === 2}
          width={WIDTH - 50}
          text={strings.SendIn}
          onPress={
            this.props.progress >= 3
              ? () => screenProps.navigation.navigate('HomeScreen')
              : () =>
                  screenProps.navigation.navigate('ConfirmPage', {
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
    marginTop: -25,
    marginBottom: -22,
    marginLeft: 24
  },
  barView23: {
    width: Dimensions.get('window').width / 9 / 5,
    height: Dimensions.get('window').width / 8,
    backgroundColor: '#F7A021',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -22,
    marginBottom: -38,
    marginLeft: 24
  },
  barView4: {
    width: Dimensions.get('window').width / 9 / 5,
    height: Dimensions.get('window').width / 8,
    backgroundColor: '#F7A021',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -38,
    marginBottom: -25,
    marginLeft: 24
  }
};

const mapStateToProps = ({ currentLanguage, userInformation }) => {
  const { language } = currentLanguage;
  const { progress } = userInformation;
  return { language, progress };
};
export default connect(mapStateToProps, null)(Timeline);
