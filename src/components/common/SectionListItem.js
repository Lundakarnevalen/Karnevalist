import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';

class SectionListItem extends Component {

  render() {
    return (
    <TouchableOpacity style={styles.containerStyle}>
      <Text>
        {this.props.sectionTitle}
      </Text>
      <Text>
        {this.props.sectionInfoText}
      </Text>
    </TouchableOpacity>
  )
  }
}

const styles = {
  containerStyle: {
    height: 60
  },
  titleStyle: {
    fontSize: 20
  },
  infoStyle: {
    fontSize: 10
  }
};
