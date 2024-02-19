import React, {useState} from 'react';
import {useRef} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
} from 'react-native';
import CustomTextInput from '../../hooks/CustomTestInput';
import Icon from '../../ui/components/icon';
import {styles} from '../../assets/css/AuthScreens';
import useAuth from '../../hooks/HandleAuth';
import GlobalCss from '../../assets/css/GlobalCss';
import AppSnackbar from '../../hooks/SnackBar';

export default function ChangePassword() {
  const {handleChangePassword} = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const appSnackbarRef = useRef();

  const [userData, setUserData] = useState({
    currentpassword: '',
    newpassword: '',
    confirmpassword: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const PasswordChange = async () => {
    try {
      const response = await handleChangePassword(
        userData.currentpassword,
        userData.newpassword,
        userData.confirmpassword,
      );
      if (response.status === 200) {
        appSnackbarRef.current.showSnackbar(
          'Password changed successfully',
          'success',
        );
      } else {
        appSnackbarRef.current.showSnackbar('Password change failed', 'error');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        appSnackbarRef.current.showSnackbar('Wrong password', 'warning');
      } else if (error.response === 502) {
        appSnackbarRef.current.showSnackbar('404', 'error');
      } else {
        appSnackbarRef.current.showSnackbar('404', 'error');
      }
    }
  };
  return (
    <View style={GlobalCss.container}>
      <ScrollView>
        <View style={styles.login_view}>
          <SafeAreaView style={styles.login_form}>
            <View>
              <Text style={styles.text}>Currrent Password</Text>
              <CustomTextInput
                iconName="lock"
                placeholder="Current Password"
                secureTextEntry={!showPassword}
                value={userData.currentpassword}
                onChangeText={text =>
                  setUserData(data => ({...data, currentpassword: text}))
                }
              />
              <Text style={styles.text}>New Password</Text>

              <CustomTextInput
                iconName="lock"
                placeholder="New Password"
                secureTextEntry={!showPassword}
                value={userData.newpassword}
                onChangeText={text =>
                  setUserData(data => ({...data, newpassword: text}))
                }
              />
              <Text style={styles.text}>Confirm Password</Text>

              <CustomTextInput
                iconName="lock"
                placeholder="Confirm Password"
                secureTextEntry={!showPassword}
                value={userData.confirmpassword}
                onChangeText={text =>
                  setUserData(data => ({...data, confirmpassword: text}))
                }
              />
              <View style={styles.rowContainer}>
                <Icon
                  style={styles.check_icon}
                  name={showPassword ? 'checksquare' : 'checksquareo'}
                  onPress={togglePasswordVisibility}
                  color="black"
                />
                <Text style={styles.showPasswordText}>Show Password</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.signin_btn}
              onPress={PasswordChange}>
              <Text style={styles.auth_btn_text}>Change Password</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        <AppSnackbar ref={appSnackbarRef} />
      </ScrollView>
    </View>
  );
}
