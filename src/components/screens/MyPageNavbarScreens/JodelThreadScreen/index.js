import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Header, JodelItem, Input } from '~/src/components/common';
import { JODEL_SCREEN_STRINGS } from '~/src/helpers/LanguageStrings';
import { setPopover, setProgress } from '~/src/actions';
import { getStrings } from '~/src/helpers/functions';
import { HEIGHT, IS_IOS } from '~/src/helpers/Constants';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';

const tempData = [
  { time: '47', place: 'Lundagård', grade: '12', nbr: '1' },
  { time: '2', place: 'Delphi', grade: '22', nbr: '2' },
  { time: '45', place: 'Delphi', grade: '22', nbr: '3' },
  { time: '2', place: 'Delphi', grade: '22', nbr: '4' }
];
class JodelThread extends Component {
  constructor(props) {
    super(props);
    const strings = this.getLanguageStrings();
    this.state = {
      data: tempData.map((d, i) => ({
        key: i,
        onPress: () => {},
        text: strings.Placeholder,
        disabled: true,
        ...d
      })),
      commentedText: ''
    };
  }

  getLanguageStrings() {
    return getStrings(this.props.language, JODEL_SCREEN_STRINGS);
  }
  handleAddBookmark() {}

  render() {
    const { navigation } = this.props;
    const strings = this.getLanguageStrings();
    const { commentedText } = this.state;
    const { textStyle, CommentStyle } = styles;
    const TSJodel = {
      time: '23',
      place: 'KC',
      grade: '0',
      disabled: true,
      onPress: () => navigation.navigate('JodelThread'),
      text: strings.Placeholder,
      nbr: 'TS',
      color: '#F7A021'
    };
    return (
      <View style={{ height: HEIGHT }}>
        <TouchableOpacity
          style={CommentStyle}
          onPress={() => navigation.navigate('JodelThread')}
        >
          <Text style={textStyle}>Karnejodla du med...</Text>
        </TouchableOpacity>
        <Header
          title=" "
          leftIcon={
            <MaterialIcons
              name="arrow-back"
              style={{ color: '#474747', right: 0 }}
              size={30}
            />
          }
          rightIcon={
            <TouchableOpacity onPress={() => this.handleAddBookmark()}>
              <MaterialIcons
                name="bookmark-border"
                style={{ color: '#474747', right: 0 }}
                size={30}
              />
            </TouchableOpacity>
          }
          backColor="white"
        />
        <View
          style={{ flexDirection: 'column', marginBottom: 15, marginTop: -10 }}
        >
          <JodelItem {...TSJodel} />
        </View>
        <View>
          <FlatList
            style={{ height: HEIGHT - (IS_IOS ? 235 : 240) }}
            data={this.state.data}
            contentContainerStyle={{ alignItems: 'center' }}
            renderItem={({ item }) => <JodelItem {...item} />}
          />
        </View>
      </View>
    );
  }
}

JodelThread.propTypes = {
  language: PropTypes.string.isRequired,
  navigation: PropTypes.shape().isRequired
};

const mapStateToProps = ({
  currentLanguage,
  popoverStatus,
  userInformation,
  sections
}) => {
  const { language } = currentLanguage;
  const { progress, token, email } = userInformation;
  return {
    language,
    popover: popoverStatus.homeScreenPopover,
    progress,
    token,
    email,
    sectionPriorities: sections.sectionPriorities
  };
};

export default connect(mapStateToProps, { setProgress, setPopover })(
  JodelThread
);
