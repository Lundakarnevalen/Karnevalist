import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class RadioButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPressed: true
        };
    }

    colorCheck() {
        if (this.props.isPressed === true) {
            return styles.isPressedStyle;
        }
        return styles.notPressedStyle;
    }


    render() {
        return (
            <View
            style={{
                flexDirection: 'row',
                margin: 4,
                alignItems: 'center'
            }}
            >
            <TouchableOpacity
            style={this.colorCheck()}
            onPress={this.props.onPress}
            />
            <Text
            style={{ fontSize: 15 }}
            >
            {this.props.name}
            </Text>
            </View>
        );
    }
}

const styles = {
    isPressedStyle: {
        height: 20,
        width: 20,
        backgroundColor: 'green',
        borderRadius: 10
    },
    notPressedStyle: {
        height: 20,
        width: 20,
        backgroundColor: 'red',
        borderRadius: 10
    },
};

export default RadioButton;
