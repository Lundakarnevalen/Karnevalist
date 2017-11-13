import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


class RadioButton extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isPressed: true
        };
    }

    renderCheckbox() {
        if (!this.props.isPressed) {
            return (
                <TouchableOpacity
                style={[styles.radioStyle, { height: this.props.size, width: this.props.size }]}
                onPress={this.props.onPress}
                >
                <Ionicons
                    name={['ios-radio-button-off']}
                    size={23}
                    color={'#FF00FF'}
                    style={{ backgroundColor: 'transparent' }}
                />
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity
            style={[styles.radioStyle, { height: this.props.size, width: this.props.size }]}
            onPress={this.props.onPress}
            >
                <Ionicons
                    name={['ios-radio-button-on']}
                    size={23}
                    color={'#FF00FF'}
                    style={{ backgroundColor: 'transparent' }}
                />
            </TouchableOpacity>
        );
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
            {this.renderCheckbox()}

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

    radioStyle: {
        borderRadius: 20
    }
};

export default RadioButton;
