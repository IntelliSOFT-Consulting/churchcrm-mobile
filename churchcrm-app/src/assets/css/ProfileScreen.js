import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#087E8B',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 30,
    paddingStart: 20,
    textAlign: 'right',
    color: 'white',
    padding: 10,
  },
  content: {
    flex: 4,
  },
  containerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  profiletxt: {
    color: '#000000',
    paddingLeft: 10,
    fontSize: 18,
  },
  icon: {
    color: '#000000',
    marginRight: 10,
    fontSize: 18,
  },

  image_logo: {
    borderWidth: 10,
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  footer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#087E8B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
  },
  text: {
    color: '#000000',
  },

  //The dropdown
  dropdown: {
    marginBottom: 10,
    marginTop: 10,
    height: 50,
    width: '100%',
    borderBottomWidth: 0.5,
    backgroundColor: '#ffffff',
    color: '#000000',
    borderRadius: 5,
    paddingLeft: 10,
  },

  placeholderStyle: {
    fontSize: 16,
    color: '#000000',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000000',
  },
  login_text: {
    color: '#ffffff',
    borderBottomColor: '#369DAE',
    borderBottomWidth: 2,
  },
  account_container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  modal: {
    paddingTop: 100,
  },
  modalView: {
    flex: 1,
  },
});
export {styles};
