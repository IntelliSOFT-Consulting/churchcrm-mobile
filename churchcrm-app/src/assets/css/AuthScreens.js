import {StyleSheet} from 'react-native';
import colors from './Color';
const styles = StyleSheet.create({
  // Landing Page styles
  text: {
    color: '#000000',
    marginTop: 20,
    fontSize: 18,
  },
  landing_screen_container: {
    paddingVertical: 60,
    marginTop: 50,
  },
  signin_btn: {
    paddingVertical: 10,
    backgroundColor: colors.btn_color,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  signup_btn: {
    paddingVertical: 12,
    marginTop: 10,
    backgroundColor: colors.btn_color,
    borderRadius: 20,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  img_view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    marginTop: 20,
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  verse_view: {
    paddingTop: 10,
    paddingBottom: 40,
    alignItems: 'center',
  },
  verse_text: {
    fontSize: 16,
    fontFamily: 'sans-serif',
    marginBottom: 10,
    marginHorizontal: 10,
    color: '#0b0b0b',
    paddingLeft: 20,
    paddingRight: 20,
  },
  verse: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '900',
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    color: '#0b0b0b',
  },
  auth_btn: {
    alignItems: 'center',
    paddingTop: 40,
  },
  authentication_buttons: {
    paddingVertical: 10,
    backgroundColor: '#0A7E8B',
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  auth_btn_text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  forgot_password: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  signin: {
    paddingVertical: 8,
    marginTop: 10,
    backgroundColor: 'transparent',
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    borderColor: '#0A7E8B',
    borderWidth: 3,
  },

  // Login page styles
  login_form: {
    paddingTop: 20,
    paddingBottom: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  login_text: {
    fontSize: 18,
    fontFamily: 'sans-serif',
    fontWeight: '700',
    color: '#0A7E8B',
  },
  login_input: {
    height: 50,
    width: '100%',
    backgroundColor: 'transparent',
    marginLeft: 0,
    color: '#000',
    borderRadius: 5,
    borderWidth: 0,
    marginBottom: 10,
    marginTop: 10,
  },

  icon: {
    width: 20,
    height: 20,
  },

  // Signup Page styles
  login_view: {
    display: 'flex',
    justifyContent: 'center',
  },
  account_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  account: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 18,
  },
  login_link: {
    color: '#0A7E8B',
    fontWeight: '800',
    paddingTop: 1,
    fontSize: 17,
    paddingLeft: 1,
    textDecorationLine: 'underline',
  },
  signup_img: {
    width: 150,
    height: 150,
    marginTop: 20,
    paddingBottom: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: colors.input_color,
    paddingLeft: 10,
    color: colors.input_text_color,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: colors.input_bg,
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
  },

  pickerStyles: {
    width: '100%',
    color: 'black',
  },
  touchButton: {
    paddingVertical: 10,
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#163c94',
    marginTop: 30,
    borderRadius: 30,
  },
  eyeIconContainer: {
    padding: 10,
  },
  eye_icon: {
    marginRight: 10,
  },
  rowContainer: {
    flexDirection: 'row', // Display items in a row
    alignItems: 'center', // Align items vertically in the center
  },

  showPasswordText: {
    marginLeft: 5,
    fontSize: 16,
  },
  check_icon: {
    marginRight: 10,
    marginLeft: 10,
  },
});
export {styles};
