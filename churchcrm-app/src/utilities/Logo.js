import React from 'react';
import {Image} from 'react-native';
import {styles} from '../assets/css/styles';
import {ImageConstant} from '../hooks/ImageConstants';
export default function Logo({styles}) {
  return <Image style={styles} source={ImageConstant.Logo} />;
}
