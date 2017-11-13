import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


class CheckBox extends Component {


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
                style={[styles.multipleChoiceStyle, { height: this.props.size, width: this.props.size }]}
                onPress={this.props.onPress}
                >
                <MaterialIcons
                name={['check-box-outline-blank']}
                size={20}
                color={'#FF00FF'}
                style={{ backgroundColor: 'transparent' }}
                
                />
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity
            style={[styles.multipleChoiceStyle, { height: this.props.size, width: this.props.size }]}
            onPress={this.props.onPress}
            >
                <Entypo
                    name={['check']}
                    size={20}
                    backgroundColor={'blue'}
                    color={'#fff'}
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

    multipleChoiceStyle: {
        backgroundColor: '#FF00FF',
        borderRadius: 5
    }
};

export default CheckBox;
