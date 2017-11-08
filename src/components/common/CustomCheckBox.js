import React from 'react';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements';

class CustomCheckBox extends React.Component {

    render() {
      const { title, checkedColor, uncheckedColor, checked, textColor } = this.props;
      const { background } = styles;

        return (
            <View>
              <CheckBox
              title={title}
              containerStyle={background}
              textStyle={{ color: textColor }}
              checkedColor={checkedColor}
              uncheckedColor={uncheckedColor}
              checked={checked}
              onIconPress={() => this.props.onPress()}
              />
            </View>
        );
    }
}

const styles = {
  background: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
};

export default CustomCheckBox;
