import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  img_view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 150,
    height: 150,
  },

  login_view: {
    paddingTop: 80,
    paddingBottom: 80,
    width: '100%',
  },
  login_text: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    fontWeight: '900',
    color: '#0A7E8B',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
  },
  icon: {
    width: 20,
    height: 20,
    // resizeMode: "contain",
  },

  ForgotPasswordBtn: {
    paddingVertical: 10,
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginTop: 30,
    borderRadius: 30,
  },
});
export {styles};
