import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ITEM_WIDTH, styles } from './styles';

const JodelItem = ({ onPress, text, place, time, grade, nbr, backColor, color, disable }) => {
  const { containerStyle, innerContainerStyle, timeAndPlaceStyle, textStyle, textViewStyle, pointStyle, timeStyle } = styles;
  return (
    <TouchableOpacity onPress={() => onPress()} style={containerStyle} disabled={'true'}>
        <View style={innerContainerStyle}>
          <View style={timeAndPlaceStyle}>
            <MaterialIcons name="free-breakfast" size={15} color={color}/>
            <Text style= {timeStyle}>
              {nbr}
            </Text>
            <MaterialIcons name="location-on" size={15} color="white"/>
            <Text style= {timeStyle}>
              {place} * {time} min
            </Text>
          </View>
          <View style={textViewStyle}>
            <Text style= {textStyle}>
              {text}
            </Text>
            <View>
              <TouchableOpacity onPress={() => onPress()}>
                <MaterialIcons name="keyboard-arrow-up" size={25} color="white"/>
              </TouchableOpacity>
              <Text style={{color: 'white', textAlign: 'center',}}>
                {grade}
              </Text>
              <TouchableOpacity onPress={() => onPress()}>
                <MaterialIcons name="keyboard-arrow-down" size={25} color="white"/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={pointStyle}>
            <TouchableOpacity onPress={() => onPress()}>
              <MaterialIcons name="more-horiz" size={20} color="white"/>
            </TouchableOpacity>
          </View>
        </View>
    </TouchableOpacity>
  );
};

JodelItem.defaultProps = {
  time: '',
  place: '',
  text: '',
  grade: '',
  nbr: '',
  backColor: 'transparent',
  color: 'white',
  disable: false
};

JodelItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  time: PropTypes.string,
  place: PropTypes.string,
  text: PropTypes.string,
  grade: PropTypes.string,
  nbr: PropTypes.string,
  backColor: PropTypes.string,
  color: PropTypes.string,
  disable: PropTypes.bool
};

export { JodelItem };
