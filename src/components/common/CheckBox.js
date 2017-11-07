import React from 'react';
import { View } from 'react-native';
import CheckBox from 'react-native-elements';

class Checkbox extends React.Component {

    render() {
        return (
            <View>
              <CheckBox
              title={this.props.title}
              />
            </View>
        );
    }
}

export default Checkbox;
