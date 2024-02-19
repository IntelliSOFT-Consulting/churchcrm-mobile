import React, {useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';

import useAuth from '../../hooks/HandleAuth';
import AppSnackbar from '../../hooks/SnackBar';
import {useRef} from 'react';
import {styles} from '../../assets/css/AuthScreens';
import Logo from '../../utilities/Logo';
import useForgotPassword from '../../hooks/HandleForgotPassword';
import CustomTextInput from '../../hooks/CustomTestInput';
import GlobalCss from '../../assets/css/GlobalCss';

export default function LoginScreen({setUserId}) {
  const {handleLogin} = useAuth();
  const {handleForgotPassword} = useForgotPassword();

  const [showPassword, setShowPassword] = useState(false);
  const appSnackbarRef = useRef();

  let loggedUser = null;

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const myLoginFunc = async () => {
    try {
      loggedUser = await handleLogin(userData.email, userData.password);

      setUserId(loggedUser.my_id);
      console.log('Saved user ID: ', loggedUser.my_id);

      appSnackbarRef.current.showSnackbar('Logged in successfully', 'success');
      setTimeout(() => {
        // navigation.navigate('Home');
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        appSnackbarRef.current.showSnackbar(
          'Wrong email or password',
          'warning',
        );
      } else if (error.response === 502) {
        appSnackbarRef.current.showSnackbar('404', 'error');
      }
    }
  };

  return (
    <View style={GlobalCss.container}>
      <ScrollView>
        <View style={styles.signup_img}>
          <Logo styles={styles.signup_img} />
        </View>

        <View style={styles.login_view}>
          <SafeAreaView style={styles.login_form}>
            <Text style={styles.login_text}>Enter Email & Password</Text>
            <View>
              <CustomTextInput
                iconName="mail"
                placeholder="Email"
                value={userData.email}
                onChangeText={text =>
                  setUserData(data => ({...data, email: text}))
                }
              />
              <CustomTextInput
                iconName="lock"
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={userData.password}
                onChangeText={text =>
                  setUserData(data => ({...data, password: text}))
                }
                right={
                  <TextInput.Icon
                    style={styles.eye_icon}
                    name={showPassword ? 'eye' : 'eye-off'}
                    onPress={togglePasswordVisibility}
                    color="black"
                  />
                }
              />
            </View>
            <TouchableOpacity style={styles.signin_btn} onPress={myLoginFunc}>
              <Text style={styles.auth_btn_text}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgot_password}>Forgot password?</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        <AppSnackbar ref={appSnackbarRef} />
      </ScrollView>
    </View>
  );
}
