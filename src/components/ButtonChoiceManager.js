import React, { Component } from 'react';
import { View, } from 'react-native';
import RadioButton from './RadioButton'
import CheckBox from './CheckBox'

class ButtonChoiceManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markedButtons: []
    };
  }

  componentWillMount() {
    const { multipleChoice, buttonInputVector } = this.props;
    if (!multipleChoice && buttonInputVector.length >= 1) {
      this.whenPressedRadio(0);
    }
  }

  createButton(name, id) {
    const { multipleChoice, size } = this.props;
    const { markedButtons } = this.state;
    if (this.props.multipleChoice) {
      return (
        <CheckBox
        name={name}
        size={size}
        multipleChoice={multipleChoice}
        key={id}
        isPressed={this.contains(markedButtons, id)}
        onPress={() => this.whenPressedCheckBox(id)}
        />);
      }
      return (
        <RadioButton
        name={name}
        size={size}
        multipleChoice={multipleChoice}
        key={id}
        id={id}
        isPressed={this.contains(markedButtons, id)}
        onPress={() => this.whenPressedRadio(id)}
        />);
      }

      whenPressedCheckBox(id) {
        const { markedButtons } = this.state;

        if (!this.contains(markedButtons, id)) {
          const newMarkedButtons = markedButtons;
          newMarkedButtons.push(id);
          this.setState({ markedButtons: newMarkedButtons });
        } else {
          this.setState({ markedButtons: markedButtons.filter(markedButtonID =>
             markedButtonID !== id) });
        }
      }

      whenPressedRadio(id) {
        const { markedButtons } = this.state;

        if (!this.contains(markedButtons, id)
        && markedButtons.length === 0) {
          const newMarkedButtons = markedButtons;
          newMarkedButtons.push(id);
          this.setState({ markedButtons: newMarkedButtons });
        } else if (id !== markedButtons[0]) {
            const newMarkedButtons = markedButtons;
            newMarkedButtons.shift();
            newMarkedButtons.push(id);
            this.setState({ markedButtons: newMarkedButtons });
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

      contains(list, toFind) {
          return list.indexOf(toFind) !== -1
      }

      render() {
        return (
          <View
          style={{ flexDirection: this.props.alignment || 'row' }}
          >
          {this.addButtons()}
          </View>
        );
      }
    }

    export default ButtonChoiceManager;
