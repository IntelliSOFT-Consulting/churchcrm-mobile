import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {moderateScale} from 'react-native-size-matters';

/**
 * A re usable Icon Component.
 * @param type
 * @param name
 * @param color
 * @param size
 * @param style
 * @param onPress
 * @returns {JSX.Element}
 * @constructor
 */
class Icon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      type = 'AntDesign',
      name = 'user',
      color = 'black',
      size = moderateScale(16),
      style = {},
      onPress = null,
    } = this.props;
    let view = <View />;
    switch (type) {
      case 'AntDesign':
      default:
        view = (
          <AntDesign name={name} size={size} style={style} color={color} />
        );
        break;
      case 'Entypo':
        view = <Entypo name={name} size={size} style={style} color={color} />;
        break;
      case 'EvilIcons':
        view = (
          <EvilIcons name={name} size={size} style={style} color={color} />
        );
        break;
      case 'Feather':
        view = <Feather name={name} size={size} style={style} color={color} />;
        break;
      case 'FontAwesome':
        view = (
          <FontAwesome name={name} size={size} style={style} color={color} />
        );
        break;
      case 'FontAwesome5':
        view = (
          <FontAwesome5 name={name} size={size} style={style} color={color} />
        );
        break;
      case 'FontAwesome5Pro':
        view = (
          <FontAwesome5Pro
            name={name}
            size={size}
            style={style}
            color={color}
          />
        );
        break;
      case 'Fontisto':
        view = <Fontisto name={name} size={size} style={style} color={color} />;
        break;
      case 'Foundation':
        view = (
          <Foundation name={name} size={size} style={style} color={color} />
        );
        break;
      case 'Ionicons':
        view = <Ionicons name={name} size={size} style={style} color={color} />;
        break;
      case 'MaterialIcons':
        view = (
          <MaterialIcons name={name} size={size} style={style} color={color} />
        );
        break;
      case 'Octicons':
        view = <Octicons name={name} size={size} style={style} color={color} />;
        break;
      case 'MaterialCommunityIcons':
        view = (
          <MaterialCommunityIcons
            name={name}
            size={size}
            style={style}
            color={color}
          />
        );
        break;
    }
    if (onPress) {
      return (
        <TouchableOpacity
          enabled={onPress}
          onPress={() => {
            if (onPress) {
              onPress();
            }
          }}>
          {view}
        </TouchableOpacity>
      );
    }
    return <View>{view}</View>;
  }
}
Icon.propTypes = {
  type: PropTypes.oneOf([
    'AntDesign',
    'Octicons',
    'MaterialIcons',
    'MaterialCommunityIcons',
    'Ionicons',
    'Foundation',
    'Fontisto',
    'FontAwesome5Pro',
    'FontAwesome',
    'FontAwesome5',
    'Entypo',
    'EvilIcons',
    'Feather',
    'SimpleLineIcons',
  ]),
  name: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  color: PropTypes.string,
};

export default Icon;
