import React, { Component } from 'react';
import { View, } from 'react-native';
import RadioButton from './RadioButton';

class RadioManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentlyPressedButtons: null
        };
        this.buttonInputVector = this.props.buttonInputVector;
        this.length = this.buttonInputVector.length;
        this.markedButtons = [];
    }

    createButton(name, id) {
        return (
            <RadioButton
            name={name}
            key={name}
            multipleChoice={this.props.multipleChoice}  //TODO
            unCheckable={this.props.unCheckable}
            isPressed={this.contains(this.markedButtons, id)}
            onPress={() => this.whenPressed(id)}
            />);
        }

        whenPressed(id) {
            if (this.props.unCheckable && this.props.multipleChoice) {  //checkBox
                if (!this.contains(this.markedButtons, id)) {
                    this.markedButtons.push(id);
                    this.setState({ currentlyPressed: id });
                    console.log(this.markedButtons.length);
                } else {
                    const index = this.markedButtons.indexOf(id);
                    this.markedButtons.splice(index, 1);
                    this.setState({ currentlyPressed: null });
                    console.log(this.markedButtons.length);
                }
            }
            if (this.props.unCheckable && !this.props.multipleChoice) {    //radio
                if (!this.contains(this.markedButtons, id) && this.markedButtons.length === 0) {
                    this.markedButtons.push(id);
                    this.setState({ currentlyPressed: id });
                } else {
                    const index = this.markedButtons.indexOf(id);
                    this.markedButtons.splice(index, 1);
                    this.setState({ currentlyPressed: null });
                    this.markedButtons.push(id);
                    this.setState({ currentlyPressed: id });
                }
            }
            if (!this.props.unCheckable && !this.props.multipleChoice) {
                if (this.markedButtons.length === 0) {
                this.markedButtons.push(id);
                this.setState({ currentlyPressed: id });
            }
        }
    }


        addButtons() {
            const buttons = [];
            for (let i = 0; i < this.length; i++) {
                buttons.push(this.createButton(this.buttonInputVector[i], i));
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
                style={{ flexDirection: 'column' }}
                >
                {this.addButtons()}

                </View>

            );
        }
    }

    export default RadioManager;
