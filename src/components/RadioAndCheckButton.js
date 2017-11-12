import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

class RadioAndCheckButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPressed: true
        };
    }

    colorCheck() {
        if (!this.props.multipleChoice) {
            if (this.props.isPressed === true) {
                return styles.isPressedStyle;
            }
            return styles.notPressedStyle;
        }
        if (this.props.isPressed === true) {
            return styles.multipleChoiceStyle.isPressedStyle;
        }
        return styles.multipleChoiceStyle.notPressedStyle;
    }

    renderCheckbox() {
        if (!this.props.isPressed) {
            return (
                <TouchableOpacity
                style={[styles.notPressedStyle, { height: this.props.size, width: this.props.size }]}
                onPress={this.props.onPress}
                />
            )
        }
        return (
            <TouchableOpacity
            style={[styles.notPressedStyle, { height: this.props.size, width: this.props.size }]}
            onPress={this.props.onPress}
            >
                <Entypo
                    name={['check']}
                    size={20}
                    color={'#000'}
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
    multipleChoiceStyle: {
        isPressedStyle: {
            backgroundColor: '#FF00FF',
            borderRadius: 5
        },
        notPressedStyle: {
            backgroundColor: 'blue',
            borderRadius: 5
        }
    },
    isPressedStyle: {
        backgroundColor: '#FF00FF',
        borderRadius: 20
    },
    notPressedStyle: {
        backgroundColor: 'blue',
        borderRadius: 20
    },
};

export default RadioAndCheckButton;
