import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import CustomTextInput from '../../hooks/CustomTestInput';
import GlobalCss from '../../assets/css/GlobalCss';
import {styles} from '../../assets/css/AuthScreens';
import axios from 'axios';
import {BASE_URL} from '../../hooks/HandleApis';
import {useRef} from 'react';
import Icon from '../../ui/components/icon';
import AppSnackbar from '../../hooks/SnackBar';
import {useNavigation} from '@react-navigation/native';
const ForgotPassword = () => {
  const navigation = useNavigation();
  const appSnackbarRef = useRef();
  const [email, setEmail] = useState('');
  const forgotPassword = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/resetcodegen`, {
        email: email,
      });
      console.log(response);
      if (response && response.status === 200) {
        appSnackbarRef.current.showSnackbar(
          'Password reset code sent successfully',
          'success',
        );
        navigation.navigate('Resetpasswordcode');
      } else if (response && response.status === 500) {
        appSnackbarRef.current.showSnackbar(
          'Error sending the reset code',
          'warning',
        );
      } else {
        appSnackbarRef.current.showSnackbar(
          'Failed to initiate password reset. Please try again.',
          'error',
        );
      }
    } catch (error) {
      console.error(error.message);

      appSnackbarRef.current.showSnackbar(
        'Failed to initiate password reset. Please try again.',
        'error',
      );
    }
  };

  return (
    <View style={GlobalCss.container}>
      <ScrollView>
        <Text style={{...styles.login_text, fontSize: 16, textAlign: 'center'}}>
          Enter the email address associated with your account to receive a
          reset code.
        </Text>
        <CustomTextInput
          iconName="mail"
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TouchableOpacity onPress={forgotPassword} style={styles.signin_btn}>
          <Text style={styles.auth_btn_text}>Get Reset Code</Text>
        </TouchableOpacity>
        <AppSnackbar ref={appSnackbarRef} />
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;
