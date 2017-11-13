import React, { Component } from 'react';
import { View, } from 'react-native';
import RadioAndCheckButton from './RadioAndCheckButton'

class ButtonChoiceManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            markedButtons: []
        };
    }

    createButton(name, id) {
        return (
            <RadioAndCheckButton
            name={name}
            size={this.props.size}
            multipleChoice={this.props.multipleChoice}
            isPressed={this.contains(this.state.markedButtons, id)}
            onPress={() => this.whenPressed(id)}
            />);
        }

        whenPressed(id) {
            if (this.props.multipleChoice) {  //checkBox
                if (!this.contains(this.state.markedButtons, id)) {
                    this.state.markedButtons.push(id);
                    this.setState({ newMarkedButtons: this.state.markedButtons });
                } else {
                    const index = this.state.markedButtons.indexOf(id);
                    this.state.markedButtons.splice(index, 1);
                    this.setState({ newMarkedButtons: this.state.markedButtons });
                }
            }
            if (!this.props.multipleChoice) {    //radioButton
                if (!this.contains(this.state.markedButtons, id)
                && this.state.markedButtons.length === 0) {
                    this.state.markedButtons.push(id);
                    this.setState({ newMarkedButtons: this.state.markedButtons });
                } else {
                    const index = this.state.markedButtons.indexOf(id);
                    this.state.markedButtons.splice(index, 1);
                    this.setState({ newMarkedButtons: this.state.markedButtons });
                    this.state.markedButtons.push(id);
                    this.setState({ newMarkedButtons: this.state.markedButtons });
                }
            }
        }


        addButtons() {
            const { buttonInputVector } = this.props;
            const buttons = [];
            for (let i = 0; i < buttonInputVector.length; i++) {
                buttons.push(this.createButton(buttonInputVector[i], i));
            }
            return buttons;
        }

        contains(a, obj) {
            let i = a.length;
            while (i--) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }

        render() {
            return (
                <View
                style={{ flexDirection: this.props.alignment }}
                >
                {this.addButtons()}

                </View>

            );
        }
    }

    export default ButtonChoiceManager;
