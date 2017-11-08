import React, { Component } from 'react';
import { View, } from 'react-native';
import RadioButton from './RadioButton';

class RadioManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentlyPressed: null
        };
        this.buttonInputVector = this.props.buttonInputVector;
        this.length = this.buttonInputVector.length;
    }

    createButton(name, id) {
        return (
            <RadioButton
            name={name}
            key={name}
            multipleChoice={this.props.multipleChoice}  //TODO
            unCheckable={this.props.unCheckable}
            isPressed={id === this.state.currentlyPressed}
            onPress={() => this.whenPressed(id)}
            />);
        }

        whenPressed(id) {
            if (this.props.unCheckable) {
                if (this.state.currentlyPressed !== id) {
                    this.setState({ currentlyPressed: id });
                } else {
                    this.setState({ currentlyPressed: null });
                }
            } else {
                this.setState({ currentlyPressed: id });
            }
        }

        addButtons() {
            const buttons = [];
            for (let i = 0; i < this.length; i++) {
                buttons.push(this.createButton(this.buttonInputVector[i], i));
            }
            return buttons;
        }

        render() {
            return (
                <View
                style={{ flexDirection: 'column' }}
                >
                {this.addButtons()}

                </View>

            );
        }
    }

    export default RadioManager;
