import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BackgroundImage, Header, ListItem } from '~/src/components/common';
import { saveItem } from '~/src/helpers/LocalSave';
import { LANGUAGES } from '~/src/helpers/Constants';
import { getStrings } from '~/src/helpers/functions';
import { setLanguage } from '~/src/actions';
import { CHANGE_LANGUAGE_SCREEN_STRINGS } from '~/src/helpers/LanguageStrings';

const ChangeLanguageScreen = ({ language, navigation, setLanguage }) => {
  const strings = getStrings(language, CHANGE_LANGUAGE_SCREEN_STRINGS);
  return (
    <View>
      <BackgroundImage pictureNumber={4} />
      <Header title={strings.title} navigation={navigation} />
      <FlatList
        data={LANGUAGES.map(l => {
          l.key = l.val;
          return l;
        })}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 60 }}
        renderItem={({ item }) => (
          <ListItem
            key={item.val}
            title={item.title}
            rightIcon={
              item.val === language
                ? 'radio-button-checked'
                : 'radio-button-unchecked'
            }
            onPress={() => {
              saveItem('language', item.val);
              setLanguage(item.val);
            }}
          />
        )}
      />
    </View>
  );
};

ChangeLanguageScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired
};

const mapStateToProps = ({ currentLanguage }) => {
  const { language } = currentLanguage;
  return { language };
};

export default connect(mapStateToProps, { setLanguage })(ChangeLanguageScreen);
