import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import CustomTextInput from '../../hooks/CustomTestInput';
import GlobalCss from '../../assets/css/GlobalCss';
import {styles} from '../../assets/css/AuthScreens';
import axios from 'axios';
import {BASE_URL} from '../../hooks/HandleApis';
import {useRef} from 'react';
import AppSnackbar from '../../hooks/SnackBar';
import useAuth from '../../hooks/HandleAuth';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResetCode = () => {
  //
  const {getStoredUserData} = useAuth();
  const [userId, setUserId] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserData = await getStoredUserData();
      if (storedUserData && storedUserData.retrieved_userId) {
        setUserId(storedUserData.retrieved_userId);
        console.log('userId', userId);
      } else {
        setUserId(null);
      }
    };

    fetchUserId();
  }, [getStoredUserData]);

  //

  const appSnackbarRef = useRef();
  const [code, setCode] = useState('');
  const resetCode = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/resetcode`, {
        code: code,
      });
      console.log(response);
      if (response && response.status === 200) {
        appSnackbarRef.current.showSnackbar(
          'Password reset successfully',
          'success',
        );
        try {
          await AsyncStorage.setItem('resetCode', code);
          navigation.navigate('NewPassword');
        } catch (error) {
          console.error('Error storing user data:', error);
        }
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
          Enter The Reset Code Received Via Email
        </Text>
        <CustomTextInput
          iconName="home"
          placeholder="Enter Reset Code"
          value={code}
          onChangeText={text => setCode(text)}
        />
        <TouchableOpacity onPress={resetCode} style={styles.signin_btn}>
          <Text style={styles.auth_btn_text}>Reset Password</Text>
        </TouchableOpacity>
        <AppSnackbar ref={appSnackbarRef} />
      </ScrollView>
    </View>
  );
};

export default ResetCode;
