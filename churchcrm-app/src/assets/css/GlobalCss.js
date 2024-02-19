import {StyleSheet} from 'react-native';

const GlobalCss = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  ForgotPasswordTxt: {fontSize: 20, color: 'white'},
  title: {
    margin: 0,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#344953',
  },
  noteTitle: {
    marginBottom: 10,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'left',
    color: '#344953',
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#344953'
  },
  editNotesButton: {
    borderRadius: 7,
    width: '20%',
    alignSelf: 'flex-end',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#087E8B'
  },
  editNotesText: {
    color: '#fff',
    fontWeight: '800',
  },
  viewNoteContainer: {
    padding: 10
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#344953',
  },
  usernotetext: {
    fontSize: 20,
    color: '#344953',
    backgroundColor: 'transparent',
  },
  // Sermon Screen Styles

});

export default GlobalCss;
