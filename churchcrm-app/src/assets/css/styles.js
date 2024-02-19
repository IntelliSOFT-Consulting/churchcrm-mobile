import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'col',
    alignItems: 'start',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  notestouchableOpacity: {
    display: 'flex',
  },
  notesModal: {
    width: '40%',
    height: '20%',
    backgroundColor: '#fff',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: 50,
  },
  textarea: {
    flex: 1,
    marginLeft: 10,
    color: '#000000',
    minHeight: 200,
  },
  inputfield: {
    minHeight: 200,
    backgroundColor: '#fff',
  },
  // Notes Page Styling
  notesTitle: {
    fontSize: 18,
    fontWeight: '900',
    paddingLeft: 10,
    textAlign: 'right',
    color: '#087E8B',
  },
  colContainer: {
    flexDirection: 'col',
    padding: 10,
    resizeMode: 'cover',
    paddingBottom: 20,
  },

  notesPageTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    padding: 10,
  },

  loadingText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#087E8B',
  },

  // Styling NewNotes Page
  newNotesContainer: {
    flexDirection: 'col',
    alignItems: 'start',
    padding: 10,
    borderTopWidth: 3,
    borderTopColor: '#E53436',
  },

  notesInput: {
    flex: 1,
    height: 40,
    borderWidth: 2,
    borderColor: '#707070',
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'white',
    color: 'black',
  },
  notesLabel: {
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 15,
    paddingBottom: 5,
    color: '#414141',
  },
  notesTextArea: {
    height: 200,
    flex: 1,
    textAlign: 'left',
    borderWidth: 2,
    borderColor: '#707070',
    borderRadius: 8,
    padding: 15,
    backgroundColor: 'white',
    color: 'black',
  },
  submitNotes: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  submitNotesButton: {
    marginTop: 20,
    backgroundColor: '#087E8B',
    width: 130,
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 10,
    borderRadius: 8,
  },

  // SermonNotes Page
  takeNotesLabel: {
    display: 'flex',
  },

  takeNotes: {
    alignSelf: 'flex-start',
    color: '#087E8B',
    fontSize: 14,
    fontWeight: '900',
    paddingBottom: 10,
  },
  sermonNotes: {
    alignSelf: 'flex-end',
    color: '#087E8B',
    fontSize: 14,
    fontWeight: '900',
    paddingBottom: 10,
  },

  sermonTextArea: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'white',
    textAlign: 'left',
    width: '100%',
  },
});
export {styles};
