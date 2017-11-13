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
                return styles.radioStyle;
            }
            return styles.radioStyle;
        }
        if (this.props.isPressed === true) {
            return styles.multipleChoiceStyle;
        }
        return styles.multipleChoiceStyle;
    }

    renderCheckbox() {
        if (!this.props.multipleChoice) {
        if (!this.props.isPressed) {
            return (
                <TouchableOpacity
                style={[styles.radioStyle, { height: this.props.size, width: this.props.size }]}
                onPress={this.props.onPress}
                />
            )
        }
        return (
            <TouchableOpacity
            style={[styles.radioStyle, { height: this.props.size, width: this.props.size }]}
            onPress={this.props.onPress}
            >
                <Entypo
                    name={['check']}
                    size={15}
                    borderRadius={20}
                    color={'#000'}
                />
            </TouchableOpacity>
        );
        }
            if (!this.props.isPressed) {
                return (
                    <TouchableOpacity
                    style={[styles.multipleChoiceStyle, { height: this.props.size, width: this.props.size }]}
                    onPress={this.props.onPress}
                    />
                )
            }
            return (
                <TouchableOpacity
                style={[styles.multipleChoiceStyle, { height: this.props.size, width: this.props.size }]}
                onPress={this.props.onPress}
                >
                    <Entypo
                        name={['check']}
                        size={15}
                        backgroundColor={'blue'}
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
            backgroundColor: '#FF00FF',
            borderRadius: 3
    },
    radioStyle: {
        backgroundColor: '#FF00FF',
        borderRadius: 20
    }
};

export default RadioAndCheckButton;
