import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import PulsatingView from './PulsatingView';
import { styles } from './styles';

const zIndexWorkaround = val =>
  Platform.select({
    ios: { zIndex: val },
    android: { elevation: val }
  });

const Popover = ({ type, big, onPress, text }) => {
  const {
    talkBubbleSquareBig,
    talkBubbleSquareSmall,
    talkBubbleTopRight,
    talkBubbleBottomLeft,
    talkBubbleTriangleTopRight,
    talkBubbleTriangleBottomLeft,
    textStyle,
    talkBubbleTriangleTopLeft,
    talkBubbleTopLeft
  } = styles;
  if (type === 'bottomLeft')
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[talkBubbleBottomLeft, zIndexWorkaround(1000)]}
      >
        <PulsatingView animate>
          <View
            animate
            style={big ? talkBubbleSquareBig : talkBubbleSquareSmall}
          >
            <Text style={[textStyle, { marginLeft: 16 }]}>{text}</Text>
          </View>
          <View style={talkBubbleTriangleBottomLeft} />
        </PulsatingView>
      </TouchableOpacity>
    );
  if (type === 'topRight')
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[talkBubbleTopRight, zIndexWorkaround(1000)]}
      >
        <PulsatingView animate>
          <View style={talkBubbleTriangleTopRight} />
          <View
            animate
            style={big ? talkBubbleSquareBig : talkBubbleSquareSmall}
          >
            <Text style={textStyle}>{text}</Text>
          </View>
        </PulsatingView>
      </TouchableOpacity>
    );
  if (type === 'topLeft')
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[talkBubbleTopLeft, zIndexWorkaround(1000)]}
      >
        <PulsatingView animate>
          <View style={talkBubbleTriangleTopLeft} />
          <View
            animate
            style={big ? talkBubbleSquareBig : talkBubbleSquareSmall}
          >
            <Text style={textStyle}>{text}</Text>
          </View>
        </PulsatingView>
      </TouchableOpacity>
    );

  return <View />;
};

Popover.defaultProps = {
  big: null
};

Popover.propTypes = {
  big: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export { Popover };
