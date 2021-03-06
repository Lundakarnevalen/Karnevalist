import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { WIDTH } from '../../helpers/Constants';

class TimelineItem extends Component {
  getColor() {
    return '#F7A021';
  }

  renderStyle() {
    if (this.props.style) {
      return this.props.style;
    }
    return;
  }

  renderIcon() {
    if (this.props.rightIcon === 'none') {
      return;
    }
    if (this.props.rightIcon === 'done') {
      return (
        <MaterialIcons
          name={this.props.rightIcon}
          style={styles.continueIconIndicatorStyle}
          color={this.getColor()}
          size={40}
        />
      );
    }
    if (this.props.rightIcon === 'refresh') {
      return (
        <MaterialIcons
          name={this.props.rightIcon}
          style={styles.continueIconIndicatorStyle}
          color={this.getColor()}
          size={40}
        />
      );
    }
    if (this.props.rightIcon === 'keyboard-arrow-right') {
      return (
        <MaterialIcons
          name={'keyboard-arrow-right'}
          style={styles.continueIconIndicatorStyle}
          color={this.getColor()}
          size={50}
        />
      );
    }
    // This one is for the spinner <3
    return this.props.rightIcon;
  }

  render() {
    const { containerStyle, titleStyle, contentStyle } = styles;
    const {
      title = '',
      icon = '',
      infoText = '',
      itemDate = '',
      onPress,
      clickable
    } = this.props;
    if (!clickable) {
      return (
        <View style={[containerStyle, this.renderStyle(), { borderColor: this.getColor() }]}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: -7 }}>
              <Text
                numberOfLines={1}
                style={[
                  titleStyle,
                  {
                    width: itemDate === '' ? WIDTH * 0.85 : WIDTH * 0.7,
                    color: this.getColor()
                  }
                ]}
              >
                {icon === '' || icon === 'none' ? null : (
                  <MaterialIcons name={icon} size={15} color={this.getColor()} />
                )}
                {icon === '' ? title : ' ' + title}
              </Text>
              {infoText === '' ? null : (
                <Text
                  numberOfLines={1}
                  style={[contentStyle, { width: itemDate === '' ? WIDTH * 0.85 : WIDTH * 0.7 }]}
                >
                  {infoText}
                </Text>
              )}
            </View>
          </View>
          {this.renderIcon()}
        </View>
      );
    }
    if (this.props.refresh) {
      return (
        <TouchableOpacity onPress={() => onPress()}>
          <View style={[containerStyle, this.renderStyle(), { borderColor: this.getColor() }]}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: -7 }}>
                <Text
                  numberOfLines={1}
                  style={[
                    titleStyle,
                    {
                      width: itemDate === '' ? WIDTH * 0.85 : WIDTH * 0.7,
                      color: this.getColor()
                    }
                  ]}
                >
                  {icon === '' ? null : (
                    <MaterialIcons name={icon} size={15} color={this.getColor()} />
                  )}
                  {icon === '' ? title : ' ' + title}
                </Text>
                {infoText === '' ? null : (
                  <Text
                    numberOfLines={1}
                    style={[contentStyle, { width: itemDate === '' ? WIDTH * 0.85 : WIDTH * 0.7 }]}
                  >
                    {infoText}
                  </Text>
                )}
              </View>
            </View>
            {this.renderIcon()}
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={[containerStyle, this.renderStyle(), { borderColor: this.getColor() }]}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: -7 }}>
            <Text
              numberOfLines={1}
              style={[
                titleStyle,
                { width: itemDate === '' ? WIDTH * 0.85 : WIDTH * 0.7, color: this.getColor() }
              ]}
            >
              {icon === '' ? null : (
                <MaterialIcons name={icon} size={15} color={this.getColor()} />
              )}
              {icon === '' ? title : ' ' + title}
            </Text>
            {infoText === '' ? null : (
              <Text
                numberOfLines={1}
                style={[contentStyle, { width: itemDate === '' ? WIDTH * 0.85 : WIDTH * 0.7 }]}
              >
                {infoText}
              </Text>
            )}
          </View>
        </View>
        <View>{this.renderIcon()}</View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  containerStyle: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    width: WIDTH,
    borderWidth: 1,
    marginTop: 8
  },
  titleStyle: {
    fontSize: 20,
    marginLeft: 8,
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Medium'
  },
  contentStyle: {
    fontSize: WIDTH / 27,
    marginLeft: 8,
    backgroundColor: 'transparent',
    fontFamily: 'Avenir Next Medium',
    color: '#333'
  },
  continueIconIndicatorStyle: {
    backgroundColor: 'transparent',
    marginLeft: -2
  }
};

export { TimelineItem };
