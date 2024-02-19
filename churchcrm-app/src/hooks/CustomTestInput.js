import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, TextInput} from 'react-native';
import {styles} from '../assets/css/AuthScreens';
import Icon from '../ui/components/icon';
const CustomTextInput = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={styles.inputContainer}>
      <Icon name={iconName} size={20} color="black" style={styles.icon} />
      <TextInput
        style={styles.login_input}
        placeholder={placeholder}
        placeholderTextColor={'#b7b7b7'}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !showPassword}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.eyeIconContainer}
          onPress={togglePasswordVisibility}>
          <Icon
            name={showPassword ? 'eye' : 'eyeo'}
            size={20}
            color="#555555"
          />
          {/* eye-slash */}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput;
