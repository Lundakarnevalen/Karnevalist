import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

let size = 0;

class RadioButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPressed: true
        };
    }

    componentWillMount() {
        size = this.props.size;
        console.log(size);
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
            style={[this.colorCheck(), { height: this.props.size, width: this.props.size }]}
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
    multipleChoiceStyle: {
        isPressedStyle: {
            backgroundColor: '#FF00FF',
            borderRadius: 5
        },
        notPressedStyle: {
            backgroundColor: '#FFB6C1',
            borderRadius: 5
        }
    },
    isPressedStyle: {
        backgroundColor: '#FF00FF',
        borderRadius: 20
    },
    notPressedStyle: {
        backgroundColor: '#FFB6C1',
        borderRadius: 20
    },
};

export default RadioButton;
